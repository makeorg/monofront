/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC, useEffect, useState } from 'react';
import ReactCookieFirst from 'react-cookiefirst';
import { AppContent, UIModalStyle } from '../../components/style';
import { Routes } from './Routes';
import { Header } from '../../components/Header';
import { env } from '../../utils/env';
import { useAssemblyContext } from '../../store/context';
import { ConsentConsumer } from '../../components/Tracking/ConsentConsumer';

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

  const [isDev, setIsDev] = useState<boolean>(false);

  useEffect(() => {
    setIsDev(window?.NODE_ENV === 'developement');
  }, []);

  if (!isDev && cookieFirstToken) {
    return (
      <>
        <ReactCookieFirst apiKey={cookieFirstToken} lang={language} />
        <ConsentConsumer />
        <App />{' '}
      </>
    );
  }

  return <App />;
};
