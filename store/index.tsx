/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {
  useContext,
  useEffect,
  useState,
  useReducer,
  createContext,
} from 'react';
import { Dispatch, ReducerAction, StateRoot } from '@make.org/types';
import { combineReducers, deepEqual, getCurrentTimeFormatted } from './utils';

import { question_reducer } from './reducers/question';
import { panel_reducer } from './reducers/panel';
import { modal_reducer } from './reducers/modal';
import { proposals_reducer } from './reducers/proposals';
import { sequence_reducer } from './reducers/sequence';
import { user_reducer } from './reducers/user';
import { initialState } from './initialState';
import { proposal_reducer } from './reducers/proposal';

export const AppContext = createContext({
  state: initialState,
    dispatch: (arg: ReducerAction) => {}, // eslint-disable-line
});

export const useAppContext = (): { state: StateRoot; dispatch: Dispatch } =>
  useContext(AppContext);

const rootReducer = combineReducers({
  question: question_reducer,
  proposals: proposals_reducer,
  sequence: sequence_reducer,
  // appConfig: undefined,
  // views: undefined,
  proposal: proposal_reducer,
  // currentQuestion: undefined,
  // notifications: undefined,
  user: user_reducer,
  // questions: undefined,
  modal: modal_reducer,
  // partners: undefined,
  panel: panel_reducer,
  // session: undefined,
});

export const useAllReducers = (): { state: StateRoot; dispatch: Dispatch } => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return { state, dispatch };
};

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
