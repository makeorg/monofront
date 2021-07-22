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
import { i18n } from '@make.org/utils/i18n';
import { StateRoot } from '@make.org/types';
import { initialState } from '@make.org/store/initialState'; // TO DO
import App from './App';

// TO DO
import french from './i18n/fr.json';

declare global {
  interface Window {
    INITIAL_STATE?: StateRoot;
  }
}

const serverState = window.INITIAL_STATE || initialState;

const initApp = (state: StateRoot) => {
  // init languages
  i18n.init({
    interpolation: {
      escapeValue: false,
    },
    debug: env.isDev(),
    lng: state.appConfig.language || DEFAULT_LANGUAGE, // TO DO
    resources: {
      // TO DO
      fr: { translation: french },
    },
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
