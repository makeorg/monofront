import React, { FC } from 'react';
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
    <p> Test 1</p>Test !!
  </AppContainer>
);

export default App;
