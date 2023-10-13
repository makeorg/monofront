/* eslint-disable import/no-import-module-exports */
import React, { ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { FontFacesStylesheet } from '@make.org/assets/css-in-js/FontFaces';
import { ModernNormalizeStylesheet } from '@make.org/assets/css-in-js/ModernNormalize';
import i18n from 'i18next';
import { DefaultStylesheet } from '@make.org/assets/css-in-js/DefaultStyle';
import { env } from '@make.org/assets/env';
import { TRANSLATION_COMMON_NAMESPACE } from '@make.org/utils/i18n/constants';
import { translationRessources } from '../i18n';
import App from './App';

declare global {
  interface Window {
    API_URL?: string;
    PORT?: string;
    LANGUAGE?: string;
  }
}

const initApp = () => {
  const appDom = document.getElementById('app');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = createRoot(appDom!);

  const AVAILABLE_LANGUAGES = ['fr', 'en'];

  const getLanguage = () => {
    if (env.isDev() && window?.location) {
      const language = window?.location.pathname.replace(/^\/|\/$/g, '');
      return AVAILABLE_LANGUAGES.includes(language) ? language : 'fr';
    }
    return window?.LANGUAGE && AVAILABLE_LANGUAGES.includes(window?.LANGUAGE)
      ? window?.LANGUAGE
      : 'fr';
  };

  i18n.init({
    interpolation: {
      escapeValue: false,
    },
    debug: env.isDev(),
    lng: getLanguage(),
    resources: translationRessources,
    defaultNS: TRANSLATION_COMMON_NAMESPACE,
  });

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
    <React.StrictMode>
      <ModernNormalizeStylesheet />
      <FontFacesStylesheet />
      <DefaultStylesheet />
      <App />
    </React.StrictMode>,
    appDom
  );
};

initApp();

if (module.hot) {
  module.hot.accept();
}
