import React from 'react';
import ReactDOM from 'react-dom';
import { HeadProvider } from 'react-head';
import { BrowserRouter } from 'react-router-dom';
import { ModernNormalizeStylesheet } from '@make.org/assets/css-in-js/ModernNormalize';
import { FontFacesStylesheet } from '@make.org/assets/css-in-js/FontFaces';
import { DefaultStylesheet } from '@make.org/assets/css-in-js/DefaultStyle';
import { UIThemeStylesheet } from '@make.org/assets/css-in-js/UITheme';
import ContextState from '@make.org/store';
import App from './App';

ReactDOM.render(
  <HeadProvider>
    <React.StrictMode>
      <BrowserRouter>
        <ContextState>
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
