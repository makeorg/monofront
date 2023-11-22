/* eslint-disable import/no-import-module-exports */
import React, { ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { FontFacesStylesheet } from '@make.org/assets/css-in-js/FontFaces';
import { BrowserRouter } from 'react-router-dom';
import { ModernNormalizeStylesheet } from '@make.org/assets/css-in-js/ModernNormalize';
import i18n from 'i18next';
import { loadableReady } from '@loadable/component';
import ContextState from '@make.org/store';
import { DefaultStylesheet } from '@make.org/assets/css-in-js/DefaultStyle';
import { TRANSLATION_COMMON_NAMESPACE } from '@make.org/utils/i18n/constants';
import { createInitialState } from '@make.org/store/initialState';
import { env } from '../utils/env';
import { translationRessources } from '../i18n';
import { AppContainer } from './app';
import { initDevState } from './helpers/initDevState';

declare global {
  interface Window {
    API_URL?: string;
    PORT?: string;
    LANGUAGE?: string;
  }
}

const initialState = createInitialState();

if (env.isDev()) {
  window.ASSEMBLY_STATE = initDevState(initialState);
}

const serverState = window.ASSEMBLY_STATE || initialState;

const initApp = async (state: any) => {
  const store = {
    ...state,
  };

  i18n.init({
    interpolation: {
      escapeValue: false,
    },
    debug: env.isDev(),
    lng: 'fr',
    resources: translationRessources,
    defaultNS: TRANSLATION_COMMON_NAMESPACE,
  });

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

    return renderMethod(
      <ContextState serverState={store}>
        <BrowserRouter>
          <React.StrictMode>
            <ModernNormalizeStylesheet />
            <FontFacesStylesheet />
            <DefaultStylesheet />
            <AppContainer />
          </React.StrictMode>
        </BrowserRouter>
      </ContextState>,
      appDom
    );
  });
};

initApp(serverState);

if (module.hot) {
  module.hot.accept();
}
