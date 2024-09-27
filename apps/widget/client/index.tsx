/* eslint-disable import/no-import-module-exports */
import React, { ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HeadProvider } from 'react-head';
import { BrowserRouter } from 'react-router-dom';
import { env } from '@make.org/assets/env';
import ContextState from '@make.org/store';
import { DEFAULT_LANGUAGE } from '@make.org/utils/constants/config';
import i18n from 'i18next';
import { StateRoot } from '@make.org/types';
import { ApiService } from '@make.org/api/ApiService';
import { ApiServiceClient } from '@make.org/api/ApiService/ApiService.client';
import { createInitialState } from '@make.org/store/initialState';
import { trackingParamsService } from '@make.org/utils/services/TrackingParamsService';
import { QuestionService } from '@make.org/utils/services/Question';
import { authenticationState } from '@make.org/utils/helpers/auth';
import {
  getAll,
  setDataFromQueryParams,
} from '@make.org/utils/helpers/customData';
import { DateHelper } from '@make.org/utils/helpers/date';
import { SessionExpiration } from '@make.org/components/Expiration/Session';
import { PATH_USER_LOGIN } from '@make.org/api/services/UserApiService';
import {
  refreshToken,
  initOauthRefresh,
  OauthResponseType,
} from '@make.org/api/ApiService/OauthRefresh';
import { TRANSLATION_COMMON_NAMESPACE } from '@make.org/utils/i18n/constants';
import { ClientLogger } from '@make.org/logger/clientLogger';
import { TrackingService } from '@make.org/utils/services/TrackingService';
import { translationRessources } from '../i18n';
import { initDevState } from '../initDevState';
import { transformExtraSlidesConfigFromQuery } from '../server/helpers/query.helper';
import App from './App';
import { getWidgetLocation } from '../utils/helpers/location';

declare global {
  interface Window {
    INITIAL_STATE?: StateRoot;
  }
}

ClientLogger.init({
  url: `/api/logger`,
  method: 'POST',
});

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
  // Set state for dev env, pass desired slug
  window.INITIAL_STATE = initDevState(initialState, 'test-morgane');
}

const serverState = window.INITIAL_STATE || initialState;

// Init API service
const API_URL: string =
  typeof window !== 'undefined'
    ? env.apiUrlClientSide() || window?.API_URL_CLIENT_SIDE || ''
    : env.apiUrlServerSide() || '';

const apiClient = new ApiServiceClient(API_URL);
ApiService.strategy = apiClient;
apiClient.appname = 'widget';
apiClient.refreshTokenCallback = refreshToken;

const initApp = async (state: StateRoot) => {
  const { sequenceKind } = state.sequence;

  // init store
  let store = {
    ...state,
    customData: getAll(), // custom_data already saved in session_storage
  };
  const { language } = store.appConfig;

  if (env.isDev()) {
    const question = await QuestionService.getDetail(
      state.currentQuestion,
      language || DEFAULT_LANGUAGE,
      undefined,
      undefined
    );

    if (question) {
      const { sequenceConfig } = question;
      const questionModified = {
        ...question,
        sequenceConfig: transformExtraSlidesConfigFromQuery(
          sequenceConfig,
          true,
          false
        ),
      };

      store = {
        ...store,
        questions: {
          [question.slug]: {
            question: questionModified,
          },
        },
      };
    }
  }

  const { source, country, queryParams } = store.appConfig;

  // Set in session storage some keys from query params
  setDataFromQueryParams(queryParams);

  // tracking values
  const currentQuestionId =
    store.questions[store.currentQuestion]?.question.questionId || '';
  const currentQuestionLanguage =
    store.questions[store.currentQuestion]?.question.returnedLanguage || '';

  const referrer = window?.document?.referrer || '';
  const urlFromIframe =
    window.top !== window.self ? referrer || 'none (iframe)' : undefined;

  const currentUrl = urlFromIframe || window?.location?.href || 'none';

  const widgetLocation = getWidgetLocation(sequenceKind);

  // Init Api service location
  apiClient.location = widgetLocation;

  // Init trackingService
  TrackingService.setLogger(ClientLogger.getInstance());

  // Set tracking params
  trackingParamsService.source = queryParams.source || source;
  trackingParamsService.country = country;
  trackingParamsService.language = language;
  trackingParamsService.questionId = currentQuestionId;
  trackingParamsService.location = widgetLocation;
  trackingParamsService.url = currentUrl;
  trackingParamsService.referrer = referrer;
  trackingParamsService.questionSlug = store.currentQuestion;
  trackingParamsService.questionLanguage = currentQuestionLanguage;

  // Set api headers params
  apiClient.sessionId = store.session.sessionId || '';
  apiClient.source = queryParams.source || source;
  apiClient.country = country;
  apiClient.language = language;
  apiClient.url = currentUrl;
  apiClient.referrer = referrer;
  apiClient.customHeaders = {
    'x-make-question-id': currentQuestionId,
    'x-make-question-slug': store.currentQuestion,
    'x-make-question-language': currentQuestionLanguage,
  };

  // add listener to update trackingParamsService
  apiClient.addAfterCallListener(
    'trackingServiceListener',
    async (url, options, responseHeaders) => {
      if (responseHeaders['x-visitor-id']) {
        trackingParamsService.visitorId = responseHeaders['x-visitor-id'];
      }
    }
  );

  // init oauth utils
  const retrieveAccessToken = async (
    token: string
  ): Promise<OauthResponseType | null> => {
    const response = await ApiService.callApi(PATH_USER_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(
        token
      )}&client_id=0cdd82cb-5cc0-4875-bb54-5c3709449429`,
    }).catch(error =>
      ClientLogger.getInstance().logWarning({
        name: 'refreshtokencall',
        message: error.message,
      })
    );

    return response?.data;
  };

  initOauthRefresh(retrieveAccessToken);

  // check authentication
  const authenticationStateData = await authenticationState();

  store = {
    ...store,
    user: {
      ...store.user,
      authentication: {
        ...store.user.authentication,
        ...authenticationStateData,
      },
    },
  };

  // init languages
  i18n.init({
    interpolation: {
      escapeValue: false,
    },
    debug: env.isDev(),
    lng: language || DEFAULT_LANGUAGE,
    resources: translationRessources,
    defaultNS: TRANSLATION_COMMON_NAMESPACE,
  });

  // Set date helper language
  DateHelper.language = language;

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

  return renderMethod(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: remove after upgrade to react18
    <HeadProvider>
      <React.StrictMode>
        <ContextState serverState={store}>
          <BrowserRouter>
            <SessionExpiration apiServiceClient={apiClient}>
              <App />
            </SessionExpiration>
          </BrowserRouter>
        </ContextState>
      </React.StrictMode>
    </HeadProvider>,
    appDom
  );
};

initApp(serverState);

if (module.hot) {
  module.hot.accept();
}
