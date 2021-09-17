import React from 'react';
import { render, hydrate } from 'react-dom';
import { HeadProvider } from 'react-head';
import { BrowserRouter } from 'react-router-dom';
import { env } from '@make.org/assets/env';
import ContextState from '@make.org/store';
import { DEFAULT_LANGUAGE } from '@make.org/utils/constants/config';
import i18n from 'i18next';
import { ApiServiceHeadersType, StateRoot } from '@make.org/types';
import { ApiService } from '@make.org/api/ApiService';
import { apiClient } from '@make.org/api/ApiService/ApiService.client';
import { createInitialState } from '@make.org/store/initialState';
import { trackingParamsService } from '@make.org/utils/services/TrackingParamsService';
import { QuestionService } from '@make.org/utils/services/Question';
import { Logger } from '@make.org/utils/services/Logger';
import { authenticationState } from '@make.org/utils/helpers/auth';
import { SessionExpiration } from '@make.org/components/Expiration/Session';
import {
  getAll,
  setDataFromQueryParams,
} from '@make.org/utils/helpers/customData';
import { DateHelper } from '@make.org/utils/helpers/date';
import { translationRessources } from '../i18n';
import { initDevState } from '../initDevState';
import { transformExtraSlidesConfigFromQuery } from '../server/helpers/query.helper';
import App from './App';

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
  // Set state for dev env, pass desired slug
  window.INITIAL_STATE = initDevState(initialState, 'environnement');
}

const serverState = window.INITIAL_STATE || initialState;

ApiService.strategy = apiClient;

const initApp = async (state: StateRoot) => {
  const { source, country, language, queryParams } = state.appConfig;
  const trackingSource = queryParams.source;

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

  let store = {
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

  if (env.isDev()) {
    const question = await QuestionService.getDetail(state.currentQuestion);

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

  // init languages
  i18n.init({
    interpolation: {
      escapeValue: false,
    },
    debug: env.isDev(),
    lng: language || DEFAULT_LANGUAGE,
    resources: translationRessources,
  });

  // Set date helper language
  DateHelper.language = language;

  // add listerner to update apiClient params
  trackingParamsService.addListener({
    onTrackingUpdate: (params: any) => {
      apiClient.source = trackingSource || params.source;
      apiClient.country = params.country;
      apiClient.language = params.language;
      apiClient.location = params.location;
      apiClient.url = params.url;
      apiClient.referrer = params.referrer;
      apiClient.questionId = params.questionId;
    },
  });

  // Set tracking params
  trackingParamsService.source = trackingSource || source;
  trackingParamsService.country = country;
  trackingParamsService.language = language;
  trackingParamsService.questionId =
    store.questions[store.currentQuestion]?.question.questionId || '';

  const appDom = document.getElementById('app');
  const renderMethod = module.hot ? render : hydrate;

  return renderMethod(
    <HeadProvider>
      <React.StrictMode>
        <ContextState serverState={store}>
          <BrowserRouter>
            <SessionExpiration>
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
