import React, { FC } from 'react';
import { AppContent } from '../../components/style';
import { UIOnboardingModalStyle } from '../../components/onboarding/style';
import { Routes } from './Routes';
import { Header } from '../../components/header/Header';

export const AppContainer: FC = () => (
  <>
    <AppContent>
      <Header />
      <Routes />
    </AppContent>
    <UIOnboardingModalStyle />
  </>
);
