import ReactDOM from 'react-dom';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { HeadProvider } from 'react-head';
import { loadableReady } from '@loadable/component';
import Cookies from 'universal-cookie';
import { env } from '@make.org/assets/env';
import { authenticationState } from '@make.org/utils/helpers/auth';
import { Logger } from '@make.org/utils/services/Logger';
import { ApiService } from '@make.org/api/ApiService';
import { apiClient } from '@make.org/api/ApiService/ApiService.client';
import { trackingParamsService } from '@make.org/utils/services/TrackingParamsService';
import { DateHelper } from '@make.org/utils/helpers/date';
import { detected as adBlockerDetected } from 'adblockdetect';
import { track } from '@make.org/utils/services/TrackingService';
import { updateRequestContextCustomData } from '@make.org/store/middleware/requestContext';
import { updateTrackingQuestionParam } from '@make.org/store/middleware/question';
import i18n from 'i18next';
import { initialState } from '@make.org/store/initialState';
import { USER_PREFERENCES_COOKIE } from '@make.org/utils/constants/cookies';
import { getRouteNoCookies } from '@make.org/utils/routes';
import ContextState from '@make.org/store';
import { DEFAULT_LANGUAGE } from '@make.org/utils/constants/config';
import {
  getAll,
  setDataFromQueryParams,
} from '@make.org/utils/helpers/customData';
import { StateRoot } from '@make.org/types';
import { CountryListener } from './app/CountryListener';
import { AppContainer } from './app';
import { cookieIsEnabled, thirdCookieEnabled } from './helper/cookieDetect';
import { NoCookies } from './pages/Static/NoCookies';
import { ErrorBoundary, ServiceErrorHandler } from './app/Error';
// import { initTrackersFromPreferences } from './helper/cookies';
import { LanguageListener } from './app/LanguageListener';
import fr from '../i18n/fr.json';

declare global {
  interface Window {
    INITIAL_STATE?: StateRoot;
  }
}

// TO DO with the SSR
window.INITIAL_STATE = {
  ...initialState,
  appConfig: {
    ...initialState.appConfig,
    translations: { fr: { translation: fr } },
  },
};
// END TO DO with the SSR

const serverState = window.INITIAL_STATE || initialState;

window.onerror = (message, source, lineNumber, columnNumber, error) => {
  if (error && error.stack) {
    const { stack } = error;
    const formattedMessage = JSON.stringify(message);
    const formattedSource = JSON.stringify(source);
    const formattedLineNumber = JSON.stringify(lineNumber);
    const formattedColumnNumber = JSON.stringify(columnNumber);
    Logger.log(
      {
        formattedMessage,
        formattedSource,
        formattedLineNumber,
        formattedColumnNumber,
        stack,
      },
      'error'
    );
  }

  return false;
};

ApiService.strategy = apiClient;

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

  const authenticationStateData = await authenticationState();

  // Set in session storage some keys from query params
  setDataFromQueryParams(queryParams);
  const {
    appConfig: { translations },
  } = state;

  const store = {
    ...state,
    user: {
      ...state.user,
      authentication: {
        ...state.user.authentication,
        ...authenticationStateData,
      },
    },
    session: { sessionId: '' },
    customData: getAll(), // custom_data already saved in session_storage
  };

  // i18n
  i18n.init({
    interpolation: {
      escapeValue: false,
    },
    debug: env.isDev(),
    lng: language || DEFAULT_LANGUAGE,
    resources: translations,
  });

  const cookies = new Cookies();
  const preferencesCookie = cookies.get(USER_PREFERENCES_COOKIE);
  // initTrackersFromPreferences(preferencesCookie);

  // Set date helper language
  DateHelper.language = language;

  // add listerner to update apiClient params
  trackingParamsService.addListener({
    onTrackingUpdate: (params: any) => {
      apiClient.source = params.source;
      apiClient.country = params.country;
      apiClient.language = params.language;
      apiClient.location = params.location;
      apiClient.url = params.url;
      apiClient.referrer = params.referrer;
      apiClient.questionId = params.questionId;
    },
  });

  // Set tracking params
  trackingParamsService.source = source;
  trackingParamsService.country = country;
  trackingParamsService.language = language;

  const { currentQuestion, questions, customData } = store;
  if (currentQuestion && questions[currentQuestion]) {
    updateTrackingQuestionParam(questions[currentQuestion].question);
  }

  if (customData) {
    updateRequestContextCustomData(customData);
  }

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
    // TODO const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

    if (!cookieIsEnabled()) {
      return ReactDOM.hydrate(
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

    // TODO
    // return renderMethod(
    return ReactDOM.hydrate(
      <CookiesProvider>
        <HeadProvider>
          <ContextState serverState={store}>
            <BrowserRouter>
              <React.StrictMode>
                <CountryListener />
                <LanguageListener />
                <AppContainer />
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

// TODO
// if (module.hot) {
//   module.hot.accept();
// }
