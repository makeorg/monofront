import React from 'react';
import ReactDOM from 'react-dom';
import { HeadProvider } from 'react-head';
import { BrowserRouter } from 'react-router-dom';
import ContextState from '@make.org/store';
import App from './App';

ReactDOM.render(
  <HeadProvider>
    <React.StrictMode>
      <BrowserRouter>
        <ContextState>
          <App />
        </ContextState>
      </BrowserRouter>
    </React.StrictMode>
  </HeadProvider>,
  document.getElementById('root')
);
