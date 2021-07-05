import React from 'react';
import ReactDOM from 'react-dom';
import ContextState from '@make.org/store';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ContextState>
      <App />
    </ContextState>
  </React.StrictMode>,
  document.getElementById('root')
);
