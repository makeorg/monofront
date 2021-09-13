import React from 'react';
import { render, hydrate } from 'react-dom';
import { HeadProvider } from 'react-head';
import { BrowserRouter } from 'react-router-dom';
import { env } from '@make.org/assets/env';
import ContextState from '@make.org/store';
import { DEFAULT_LANGUAGE } from '@make.org/utils/constants/config';
import i18n from 'i18next';
import { StateRoot } from '@make.org/types';
import { ApiService } from '@make.org/api/ApiService';
import { apiClient } from '@make.org/api/ApiService/ApiService.client';
import { initialState } from '@make.org/store/initialState';
import { trackingParamsService } from '@make.org/utils/services/TrackingParamsService';
import { QuestionService } from '@make.org/utils/services/Question';
import { Logger } from '@make.org/utils/services/Logger';
import { translationRessources } from '../i18n';
import { initDevState } from '../initDevState';
import { transformExtraSlidesConfigFromQuery } from '../server/helpers/query.helper';
import App from './App';

declare global {
  interface Window {
    INITIAL_STATE?: StateRoot;
  }
}

if (env.isDev()) {
  // Set state for dev env, pass desired slug
  window.INITIAL_STATE = initDevState(initialState, 'environnement');
}

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

const initApp = async (state: StateRoot) => {
  let store = { ...state };
  const { source, country, language } = state.appConfig;
  // init languages
  i18n.init({
    interpolation: {
      escapeValue: false,
    },
    debug: env.isDev(),
    lng: language || DEFAULT_LANGUAGE,
    resources: translationRessources,
  });

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
        ...state,
        questions: {
          [question.slug]: {
            question: questionModified,
          },
        },
      };
    }
  }

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
  trackingParamsService.questionId =
    store.questions[store.currentQuestion]?.question.questionId || '';

  const appDom = document.getElementById('app');
  const renderMethod = module.hot ? render : hydrate;

  return renderMethod(
    <HeadProvider>
      <React.StrictMode>
        <ContextState serverState={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ContextState>
      </React.StrictMode>
    </HeadProvider>,
    appDom
  );
};

initApp(serverState);
