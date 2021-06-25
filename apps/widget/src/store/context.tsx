import React, { useReducer } from 'react';
import { INITIAL_STATE } from './reducers';
import { logger } from './utils';

const Context = React.createContext({});

const ContextState: React.FC = ({ children }) => {
  const [state] = useReducer(logger, INITIAL_STATE);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default ContextState;
