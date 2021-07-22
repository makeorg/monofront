import React from 'react';
import ReactDOM from 'react-dom';
import { HeadProvider } from 'react-head';
import { BrowserRouter } from 'react-router-dom';
import { ModernNormalizeStylesheet } from '@make.org/assets/css-in-js/ModernNormalize';
import { FontFacesStylesheet } from '@make.org/assets/css-in-js/FontFaces';
import { DefaultStylesheet } from '@make.org/assets/css-in-js/DefaultStyle';
import { UIThemeStylesheet } from '@make.org/assets/css-in-js/UITheme';
import ContextState from '@make.org/store';
import { LocalesContext } from '@make.org/utils/i18n';
import App from './App';

ReactDOM.render(
  <HeadProvider>
    <React.StrictMode>
      <BrowserRouter>
        <ContextState>
          <LocalesContext>
            <ModernNormalizeStylesheet />
            <FontFacesStylesheet />
            <DefaultStylesheet />
            <UIThemeStylesheet />
            <App />
          </LocalesContext>
        </ContextState>
      </BrowserRouter>
    </React.StrictMode>
  </HeadProvider>,
  document.getElementById('root')
);
