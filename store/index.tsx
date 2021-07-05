/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from 'react';
import { ReducerAction } from '@make.org/types';
import {
  AppContext,
  deepEqual,
  getCurrentTimeFormatted,
  useAllReducers,
} from './utils';

export const useAppContext = (): any => useContext(AppContext);

const ContextState: React.FC = ({ children }) => {
  const { state, dispatch } = useAllReducers();
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
    if (!deepEqual(lastState, state) && action.type) {
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
      setLastAction({ lastState: state, action: { type: '' } });
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch: dispatchLogged }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextState;
