import React, { FC, ReactNode } from 'react';
import ReactCookieFirst from 'react-cookiefirst';
import { AppContent, UIModalStyle } from '../../components/style';
import { Routes } from './Routes';
import { Header } from '../../components/Header';
import { env } from '../../utils/env';

const CookieFirst = ReactCookieFirst as FC<{
  apiKey: string;
  lang: string;
  children: ReactNode;
}>;

const App: FC = () => (
  <>
    <AppContent>
      <Header />
      <Routes />
    </AppContent>
    <UIModalStyle />
  </>
);

export const AppContainer: FC = () => {
  if (!env.isDev()) {
    return (
      <CookieFirst apiKey={env.cookieFirstToken() || ''} lang="fr">
        <App />
      </CookieFirst>
    );
  }

  return <App />;
};
