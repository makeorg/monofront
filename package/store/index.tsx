/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useReducer,
  createContext,
} from 'react';
import { Dispatch, ReducerAction, StateRoot } from '@make.org/types';
import {
  combineReducers,
  deepEqual,
  getCurrentTimeFormatted,
} from '@make.org/store/utils';

import { panel_reducer } from './reducers/panel';
import { modal_reducer } from './reducers/modal';
import { proposals_reducer } from './reducers/proposals';
import { sequence_reducer } from './reducers/sequence';
import { user_reducer } from './reducers/user';
import { initialState } from './initialState';
import { pendingProposal_reducer } from './reducers/pendingProposal';
import { currentQuestion_reducer } from './reducers/currentQuestion';
import { appConfig_reducer } from './reducers/appConfig';
import { questions_reducer } from './reducers/questions';
import { notifications_reducer } from './reducers/notifications';
import { views_reducer } from './reducers/views';
import { session_reducer } from './reducers/session';

const AppContext = createContext({
  state: initialState,
  dispatch: (arg: ReducerAction) => {}, // eslint-disable-line
});

export const useAppContext = (): { state: StateRoot; dispatch: Dispatch } =>
  useContext(AppContext);

const rootReducer = combineReducers({
  proposals: proposals_reducer,
  sequence: sequence_reducer,
  appConfig: appConfig_reducer,
  views: views_reducer,
  pendingProposal: pendingProposal_reducer,
  currentQuestion: currentQuestion_reducer,
  notifications: notifications_reducer,
  user: user_reducer,
  questions: questions_reducer,
  modal: modal_reducer,
  panel: panel_reducer,
  session: session_reducer,
});

const useAllReducers = (
  serverState?: StateRoot
): {
  state: StateRoot;
  dispatch: Dispatch;
} => {
  const [state, dispatch] = useReducer(
    rootReducer,
    serverState || initialState
  );
  return { state, dispatch };
};

const ContextState: FC<{ serverState?: StateRoot; children: ReactNode }> = ({
  serverState,
  children,
}) => {
  const { state, dispatch } = useAllReducers(serverState);
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
    if (!deepEqual(lastState, state) && action && action.type) {
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
    // @toDo remove next comment and fix
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AppContext.Provider value={{ state, dispatch: dispatchLogged }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextState;
