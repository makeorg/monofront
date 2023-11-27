import React, { FC } from 'react';
import { UIOnboardingModalStyle } from '../../components/style';
import { Routes } from './Routes';

declare global {
  interface Window {
    API_URL?: string;
    PORT?: string;
    LANGUAGE?: string;
  }
}

export const AppContainer: FC = () => (
  <div>
    <Routes />
    <UIOnboardingModalStyle />
  </div>
);
