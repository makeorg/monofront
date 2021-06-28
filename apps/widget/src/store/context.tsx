import React, { useContext, useReducer } from 'react';
import useCombinedReducers from 'use-combined-reducers';
import { auth_reducer, auth_state } from './reducers/auth_reducer';
import { question_reducer, question_state } from './reducers/question_reducer';
import { Logger } from './utils';

const AppContext = React.createContext({});

const ContextState: React.FC = ({ children }) => {
  const [state, dispatch] = useCombinedReducers({
    authentification: useReducer(Logger(auth_reducer), auth_state),
    proposal: useReducer(Logger(question_reducer), question_state),
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): any => useContext(AppContext);
export default ContextState;
