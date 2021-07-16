import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ContextState from '@make.org/store';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextState>
        <App />
      </ContextState>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
