/* eslint-disable import/no-import-module-exports */
import React, { ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { FontFacesStylesheet } from '@make.org/assets/css-in-js/FontFaces';
import { ModernNormalizeStylesheet } from '@make.org/assets/css-in-js/ModernNormalize';
import { DefaultStylesheet } from '@make.org/assets/css-in-js/DefaultStyle';
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
