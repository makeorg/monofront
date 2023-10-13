import React, { FC } from 'react';
import i18n from 'i18next';
import { AppContainer } from './style';

declare global {
  interface Window {
    API_URL?: string;
    PORT?: string;
    LANGUAGE?: string;
  }
}

const App: FC = () => (
  <AppContainer>
    <p>{i18n.t('ressources.doc')}</p>
  </AppContainer>
);

export default App;
