import React, { useEffect, useReducer } from 'react';
import { ACTIONS, INITIAL_STATE } from './reducers';
import { logger } from './utils';

const Context = React.createContext({});

const ContextState: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(logger, INITIAL_STATE);

  useEffect(() => {
    dispatch({
      type: ACTIONS.LOGIN,
      data: {
        username: 'toto',
        token: 'yallaaaaa',
      },
    });
  }, []);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default ContextState;
