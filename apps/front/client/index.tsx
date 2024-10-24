/* eslint-disable import/no-import-module-exports */
import React, { ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { HeadProvider } from 'react-head';
import { loadableReady } from '@loadable/component';
import Cookies from 'universal-cookie';
import { env } from '@make.org/assets/env';
import { authenticationState } from '@make.org/utils/helpers/auth';
import { DateHelper } from '@make.org/utils/helpers/date';
import { detected as adBlockerDetected } from 'adblockdetect';
import {
  TrackingService,
  track,
} from '@make.org/utils/services/TrackingService';
import {
  getAll,
  setDataFromQueryParams,
} from '@make.org/utils/helpers/customData';
import i18n from 'i18next';
import { createInitialState } from '@make.org/store/initialState';
import { getRouteNoCookies } from '@make.org/utils/routes';
import ContextState from '@make.org/store';
import { StateRoot } from '@make.org/types';
import { initTrackersFromPreferences } from '@make.org/utils/helpers/clientCookies';
import { COOKIE } from '@make.org/types/enums';
import { ENABLE_MIXPANEL } from '@make.org/utils/constants/cookies';
import { trackingParamsService } from '@make.org/utils/services/TrackingParamsService';
import { TRANSLATION_COMMON_NAMESPACE } from '@make.org/utils/i18n/constants';
import { ApiServiceClient } from '@make.org/api/ApiService/ApiService.client';
import { ClientLogger } from '@make.org/logger/clientLogger';
import { CountryListener } from './app/CountryListener';
import { AppContainer } from './app';
import { cookieIsEnabled, thirdCookieEnabled } from './helpers/cookieDetect';
import { NoCookies } from './pages/Static/NoCookies';
import { ErrorBoundary, ServiceErrorHandler } from './app/Error';
import { LanguageListener } from './app/LanguageListener';
import { initDevState } from './helpers/initDevState';
import { translationRessources, translationRessoucesLanguages } from '../i18n';
import { initApiService } from './apiServiceInit';
import { initTrackingParamsService } from './trackingParamsServiceInit';
import { told } from './app/Told/told';

declare global {
  interface Window {
    INITIAL_STATE?: StateRoot;
    TOLD_TOKEN?: string;
  }
}

window.onerror = (message, source, lineNumber, columnNumber, error) => {
  if (error && error.stack) {
    const { stack } = error;
    const formattedMessage = JSON.stringify(message);
    const formattedSource = JSON.stringify(source);
    const formattedLineNumber = JSON.stringify(lineNumber);
    const formattedColumnNumber = JSON.stringify(columnNumber);
    ClientLogger.getInstance().logError({
      name: 'global-client',
      message: formattedMessage,
      app_sourceError: formattedSource,
      app_lineError: formattedLineNumber,
      app_columnError: formattedColumnNumber,
      stack,
    });
  }

  return false;
};

const initialState = createInitialState();

if (env.isDev()) {
  window.INITIAL_STATE = initDevState(initialState);
}

const serverState = window.INITIAL_STATE || initialState;

const logAndTrackEvent = (eventName: string) => {
  ClientLogger.getInstance().logInfo({
    message: `Track event : ${eventName}`,
    name: 'log-and-track',
    app_trackingEvent: eventName,
    app_referrer: window.document.referrer,
    app_url: window.location.href,
  });
  track(eventName, {
    referrer: window.document.referrer,
    url: window.location.href,
  });
};

const initApp = async (state: StateRoot) => {
  const { language, country, source, queryParams } = state.appConfig;
  const { sessionId } = state.session;
  const cookies = new Cookies();
  // Set in session storage some keys from query params
  setDataFromQueryParams(queryParams);

  const sessionIdCookie = cookies.get(COOKIE.SESSION_ID);
  const apiServiceClient: ApiServiceClient = initApiService(
    sessionIdCookie || sessionId || '',
    source,
    country,
    language,
    getAll()
  );

  // init api service before authenticationState

  // Get demographics cookie to render demographics card if cookie is not there
  const demographicsCookie = cookies.get(COOKIE.DEMOGRAPHICS);
  const authenticationStateData = await authenticationState();

  TrackingService.setLogger(ClientLogger.getInstance());
  // Init trackers
  // tracking consent is stored in COOKIE.USER_PREFERENCES
  // this cookie is read on server side (apps/front/server/reactRender.tsx line 150) then added to the state
  initTrackersFromPreferences(
    state.user.trackingConsent,
    ClientLogger.getInstance(),
    trackingParamsService.visitorId,
    ENABLE_MIXPANEL
  );

  const store = {
    ...state,
    user: {
      ...state.user,
      authentication: {
        ...state.user.authentication,
        ...authenticationStateData,
      },
    },
    session: {
      ...state.session,
      sessionId,
    },
    sequence: {
      ...state.sequence,
      demographics: {
        ...state.sequence.demographics,
        demographicsCookie: !!demographicsCookie,
      },
    },
    appConfig: {
      ...state.appConfig,
      availableTranslations: translationRessoucesLanguages,
    },
    customData: getAll(), // custom_data already saved in session_storage
  };

  // i18n
  i18n.init({
    interpolation: {
      escapeValue: false,
    },
    debug: env.isDev(),
    lng: language,
    resources: translationRessources,
    defaultNS: TRANSLATION_COMMON_NAMESPACE,
  });

  // Load Told
  told.load(window?.TOLD_TOKEN ?? '');

  // Set date helper language
  DateHelper.language = language;

  const { currentQuestion, questions } = store;

  // Init tracking params service
  let question;
  if (currentQuestion && questions[currentQuestion]) {
    question = questions[currentQuestion].question;
  }
  initTrackingParamsService(source, country, language, question);
  ClientLogger.init({
    url: `${window.FRONT_URL}/api/logger`,
    method: 'POST',
  });

  // Track cookies availability and adBlockers
  if (adBlockerDetected()) {
    logAndTrackEvent('adblocker-detected');
  }
  if (!cookieIsEnabled()) {
    logAndTrackEvent('cookie-is-disabled');
  }
  const thirdCookieNameToCheck = 'make-session-id-expiration';
  if (!thirdCookieEnabled(thirdCookieNameToCheck)) {
    logAndTrackEvent('third-cookie-is-disabled');
  }

  loadableReady(() => {
    const appDom = document.getElementById('app');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const root = createRoot(appDom!);

    const renderMethod = (children: ReactNode, container: HTMLElement) => {
      if (module.hot) {
        return root.render(children);
      }

      return hydrateRoot(container, children);
    };

    if (!appDom) {
      return null;
    }

    if (!cookieIsEnabled()) {
      return renderMethod(
        <HeadProvider>
          <ContextState serverState={store}>
            <BrowserRouter>
              <React.StrictMode>
                <ServiceErrorHandler>
                  <ErrorBoundary>
                    <CountryListener />
                    <Switch>
                      <Route
                        path={getRouteNoCookies(country)}
                        component={NoCookies}
                      />
                      <Redirect from="/" to={getRouteNoCookies(country)} />
                    </Switch>
                  </ErrorBoundary>
                </ServiceErrorHandler>
              </React.StrictMode>
            </BrowserRouter>
          </ContextState>
        </HeadProvider>,
        appDom
      );
    }

    return renderMethod(
      <CookiesProvider>
        <HeadProvider>
          <ContextState serverState={store}>
            <BrowserRouter>
              <React.StrictMode>
                <LanguageListener />
                <CountryListener />
                <AppContainer apiServiceClient={apiServiceClient} />
              </React.StrictMode>
            </BrowserRouter>
          </ContextState>
        </HeadProvider>
      </CookiesProvider>,
      appDom
    );
  });
};

initApp(serverState);

if (module.hot) {
  module.hot.accept();
}
