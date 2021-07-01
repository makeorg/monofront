/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useContext, useEffect, useReducer, useState } from 'react';
import useCombinedReducers from 'use-combined-reducers';
import { auth_reducer, auth_state } from './reducers/auth_reducer';
import { question_reducer, question_state } from './reducers/question_reducer';
import {
  proposals_reducer,
  proposals_state,
} from './reducers/proposals_reducer';
import { ReducerAction } from './reducers/types';
import { getCurrentTimeFormatted } from './utils';

const AppContext = React.createContext({});

const ContextState: React.FC = ({ children }) => {
  const [state, dispatch] = useCombinedReducers({
    authentification: useReducer(auth_reducer, auth_state),
    question: useReducer(question_reducer, question_state),
    proposals: useReducer(proposals_reducer, proposals_state),
  });
  const [lastAction, setLastAction] = useState({
    lastState: state,
    action: {
      type: '',
    },
  });

  const dispatchLogged = async (action: ReducerAction) => {
    setLastAction({
      lastState: state,
      action,
    });
    return dispatch(action);
  };

  useEffect(() => {
    const { action, lastState } = lastAction;
    if (JSON.stringify(lastState) !== JSON.stringify(state)) {
      console.group(
        `%cAction: %c${action.type} %cat ${getCurrentTimeFormatted()}`,
        'color: green; font-weight: bold;',
        'color: red; font-weight: bold;',
        'color: lightblue; font-weight: lighter;'
      );
      console.log(
        '%cPrevious State:',
        'color: #9E9E9E; font-weight: 700;',
        lastState
      );
      console.log('%cAction:', 'color: #00A7F7; font-weight: 700;', action);
      console.log('%cNew State:', 'color: #47B04B; font-weight: 700;', state);
      console.groupEnd();
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch: dispatchLogged }}>
      {children}
    </AppContext.Provider>
  );
};
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const useAppContext = (): any => useContext(AppContext);

export default ContextState;
