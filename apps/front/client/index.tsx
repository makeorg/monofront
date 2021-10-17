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
import { ApiService } from '@make.org/api/ApiService';
import { apiClient } from '@make.org/api/ApiService/ApiService.client';
import { trackingParamsService } from '@make.org/utils/services/TrackingParamsService';
import { DateHelper } from '@make.org/utils/helpers/date';
import { detected as adBlockerDetected } from 'adblockdetect';
import { track } from '@make.org/utils/services/TrackingService';
import {
  updateRequestContextCustomData,
  getAll,
  setDataFromQueryParams,
} from '@make.org/utils/helpers/customData';
import { updateTrackingQuestionParam } from '@make.org/utils/helpers/question';
import i18n from 'i18next';
import { createInitialState } from '@make.org/store/initialState';
import { getRouteNoCookies } from '@make.org/utils/routes';
import ContextState from '@make.org/store';
import { DEFAULT_LANGUAGE } from '@make.org/utils/constants/config';

import {
  ApiServiceHeadersType,
  StateRoot,
  TrackingParamsUpdateType,
} from '@make.org/types';
import { initTrackersFromPreferences } from '@make.org/utils/helpers/cookies';
import { COOKIE } from '@make.org/types/enums';
import { getAppTrackingLocation } from '@make.org/utils/helpers/getLocationContext';
import { ENABLE_MIXPANEL } from '@make.org/utils/constants/cookies';
import { CountryListener } from './app/CountryListener';
import { AppContainer } from './app';
import { cookieIsEnabled, thirdCookieEnabled } from './helper/cookieDetect';
import { NoCookies } from './pages/Static/NoCookies';
import { ErrorBoundary, ServiceErrorHandler } from './app/Error';
import { LanguageListener } from './app/LanguageListener';
import { initDevState } from './helper/initDevState';
import { translationRessources } from '../i18n';

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

const initialState = createInitialState();

if (env.isDev()) {
  window.INITIAL_STATE = initDevState(initialState);
}

const serverState = window.INITIAL_STATE || initialState;

ApiService.strategy = apiClient;
apiClient.appname = 'main-front';

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

  // add listener to update trackingParamsService && sessionId in state
  // should be before first api call (before authenticationState) to get visitorId
  apiClient.addHeadersListener(
    'trackingServiceListener',
    (headers: ApiServiceHeadersType) => {
      trackingParamsService.visitorId =
        headers['x-visitor-id'] || trackingParamsService.visitorId;
    }
  );
  const authenticationStateData = await authenticationState();

  // Set in session storage some keys from query params
  setDataFromQueryParams(queryParams);

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
    resources: translationRessources,
  });

  // Cookie preference
  const cookies = new Cookies();
  const preferencesCookie = cookies.get(COOKIE.USER_PREFERENCES);
  initTrackersFromPreferences(preferencesCookie, ENABLE_MIXPANEL);

  // Set date helper language
  DateHelper.language = language;

  // Set tracking params
  trackingParamsService.addOnUpdateListener({
    onTrackingUpdate: (params: TrackingParamsUpdateType) => {
      if (params.source) {
        apiClient.source = params.source;
      }
      if (params.country) {
        apiClient.country = params.country;
      }
      if (params.language) {
        apiClient.language = params.language;
      }
      if (params.location) {
        apiClient.location = params.location;
      }
      if (params.url) {
        apiClient.url = params.url;
      }
      if (params.referrer) {
        apiClient.referrer = params.referrer;
      }
      if (params.questionId) {
        apiClient.questionId = params.questionId;
      }
    },
  });
  trackingParamsService.source = source;
  trackingParamsService.country = country;
  trackingParamsService.language = language;
  trackingParamsService.referrer =
    typeof window !== 'undefined' && !!window.document.referrer
      ? window.document.referrer
      : '';
  trackingParamsService.addBeforeGetListener({
    execute: () => {
      trackingParamsService.url =
        typeof window !== 'undefined' && window && window.location
          ? window.location.href
          : 'undefined';
      trackingParamsService.location = getAppTrackingLocation(
        window?.location?.pathname
      );
    },
  });

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
    const renderMethod = module.hot ? render : hydrate;

    if (!cookieIsEnabled()) {
      return hydrate(
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

if (module.hot) {
  module.hot.accept();
}
