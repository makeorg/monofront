/* eslint-disable import/no-import-module-exports */
import { hydrate, render } from 'react-dom';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { HeadProvider } from 'react-head';
import { loadableReady } from '@loadable/component';
import Cookies from 'universal-cookie';
import { env } from '@make.org/assets/env';
import { authenticationState } from '@make.org/utils/helpers/auth';
import { Logger } from '@make.org/utils/services/Logger';
import { DateHelper } from '@make.org/utils/helpers/date';
import { detected as adBlockerDetected } from 'adblockdetect';
import { track } from '@make.org/utils/services/TrackingService';
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
import { LogLevelType } from '@make.org/types/enums/logLevel';
import { TRANSLATION_COMMON_NAMESPACE } from '@make.org/utils/i18n/constants';
import { ApiServiceClient } from '@make.org/api/ApiService/ApiService.client';
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

declare global {
  interface Window {
    INITIAL_STATE?: StateRoot;
  }
}

window.onerror = (message, source, lineNumber, columnNumber, error) => {
  if (error && error.stack) {
    const { stack } = error;
    const formattedMessage = JSON.stringify(message);
    const formattedSource = JSON.stringify(source);
    const formattedLineNumber = JSON.stringify(lineNumber);
    const formattedColumnNumber = JSON.stringify(columnNumber);
    Logger.log(
      {
        name: 'global-client',
        message: formattedMessage,
        app_sourceError: formattedSource,
        app_lineError: formattedLineNumber,
        app_columnError: formattedColumnNumber,
        stack,
      },
      LogLevelType.error
    );
  }

  return false;
};

const initialState = createInitialState();

if (env.isDev()) {
  window.INITIAL_STATE = initDevState(initialState);
}

const serverState = window.INITIAL_STATE || initialState;

const logAndTrackEvent = (eventName: string) => {
  Logger.logInfo({
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

  // Set date helper language
  DateHelper.language = language;

  const { currentQuestion, questions } = store;

  // Init tracking params service
  let question;
  if (currentQuestion && questions[currentQuestion]) {
    question = questions[currentQuestion].question;
  }
  initTrackingParamsService(source, country, language, question);

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

  // Cookie preference
  const preferencesCookie = cookies.get(COOKIE.USER_PREFERENCES);
  initTrackersFromPreferences(
    preferencesCookie,
    trackingParamsService.visitorId,
    ENABLE_MIXPANEL
  );

  loadableReady(() => {
    const appDom = document.getElementById('app');
    const renderMethod = module.hot ? render : hydrate;

    if (!cookieIsEnabled()) {
      return hydrate(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: remove after upgrade to react18
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
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore: remove after upgrade to react18 */}
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
