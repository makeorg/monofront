import React from 'react';
import ReactDOM from 'react-dom';
import { HeadProvider } from 'react-head';
import { BrowserRouter } from 'react-router-dom';
import { ModernNormalizeStylesheet } from '@make.org/assets/css-in-js/ModernNormalize';
import { FontFacesStylesheet } from '@make.org/assets/css-in-js/FontFaces';
import { DefaultStylesheet } from '@make.org/assets/css-in-js/DefaultStyle';
import { UIThemeStylesheet } from '@make.org/assets/css-in-js/UITheme';
import { env } from '@make.org/assets/env';
import ContextState from '@make.org/store';
import { DEFAULT_LANGUAGE } from '@make.org/utils/constants/config';
import i18n from 'i18next';
import { StateRoot } from '@make.org/types';
import { initialState } from '@make.org/store/initialState'; // TO DO
import App from './App';

// TO DO
import { initDevState } from '../initDevState';
import { translationRessources } from './i18n';

declare global {
  interface Window {
    INITIAL_STATE?: StateRoot;
  }
}

const serverState = initDevState(initialState);

const initApp = (state: StateRoot) => {
  const { language } = state.appConfig;
  // init languages
  i18n.init({
    interpolation: {
      escapeValue: false,
    },
    debug: env.isDev(),
    lng: language || DEFAULT_LANGUAGE,
    resources: translationRessources,
  });

  // Render the app
  ReactDOM.render(
    <HeadProvider>
      <React.StrictMode>
        <BrowserRouter>
          <ContextState serverState={state}>
            <ModernNormalizeStylesheet />
            <FontFacesStylesheet />
            <DefaultStylesheet />
            <UIThemeStylesheet />
            <App />
          </ContextState>
        </BrowserRouter>
      </React.StrictMode>
    </HeadProvider>,
    document.getElementById('root')
  );
};

initApp(serverState);
