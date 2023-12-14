import React, { FC } from 'react';
import { AppContent, UIModalStyle } from '../../components/style';
import { Routes } from './Routes';
import { Header } from '../../components/header';

export const AppContainer: FC = () => (
  <>
    <AppContent>
      <Header />
      <Routes />
    </AppContent>
    <UIModalStyle />
  </>
);
