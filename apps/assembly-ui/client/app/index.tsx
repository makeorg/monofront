import React, { FC, ReactNode } from 'react';
import ReactCookieFirst from 'react-cookiefirst';
import { AppContent, UIModalStyle } from '../../components/style';
import { Routes } from './Routes';
import { Header } from '../../components/Header';
import { env } from '../../utils/env';
import { useAssemblyContext } from '../../store/context';

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

const cookieFirstToken = env.isClientSide()
  ? window.COOKIE_FIRST_TOKEN
  : env.cookieFirstToken();

export const AppContainer: FC = () => {
  const { state } = useAssemblyContext();
  const { language } = state.event;

  if (!env.isDev() && cookieFirstToken) {
    return (
      <CookieFirst apiKey={cookieFirstToken} lang={language}>
        <App />
      </CookieFirst>
    );
  }

  return <App />;
};
