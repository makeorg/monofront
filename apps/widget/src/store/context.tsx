import React, { useContext, useEffect, useReducer, useState } from 'react';
import useCombinedReducers from 'use-combined-reducers';
import { auth_reducer, auth_state } from './reducers/auth_reducer';
import {
  proposals_reducer,
  proposals_state,
} from './reducers/proposals_reducer';
import { ReducerAction } from './reducers/types';
import { getCurrentTimeFormatted } from './utils';

const AppContextDispatch = React.createContext({});
const AppContextState = React.createContext({});

const ContextState: React.FC = ({ children }) => {
  const [state, dispatch] = useCombinedReducers({
    authentification: useReducer(auth_reducer, auth_state),
    proposals: useReducer(proposals_reducer, proposals_state),
  });
  const [lastAction, setLastAction] = useState({
    lastState: state,
    action: {
      type: '',
    },
  });

  const dispatchLogged = (action: ReducerAction) => {
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
    <AppContextDispatch.Provider value={dispatchLogged}>
      <AppContextState.Provider value={state}>
        {children}
      </AppContextState.Provider>
    </AppContextDispatch.Provider>
  );
};

export const useAppContext = (): any => {
  const state = useContext(AppContextState);
  const dispatch = useContext(AppContextDispatch);
  return { state, dispatch };
};

export default ContextState;
