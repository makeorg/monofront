import React, { FC } from 'react';
import ReactCookieFirst from 'react-cookiefirst';
import { AppContent, UIModalStyle } from '../../components/style';
import { Routes } from './Routes';
import { Header } from '../../components/Header';
import { env } from '../../utils/env';
import { useAssemblyContext } from '../../store/context';

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
      <>
        <ReactCookieFirst apiKey={cookieFirstToken} lang={language} />
        <App />
      </>
    );
  }

  return <App />;
};
