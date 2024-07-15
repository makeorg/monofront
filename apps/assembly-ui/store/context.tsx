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
import { Dispatch, ReducerAction } from '@make.org/types';
import {
  combineReducers,
  getCurrentTimeFormatted,
} from '@make.org/store/utils';
import { DEFAULT_LANGUAGE } from '../utils/constants';
import { AssemblyGlobalStateType } from '../types';
import { feed_reducer } from './feed/reducer';
import { event_sources_reducer } from './eventSources/reducer';
import { session_reducer, visitor_reducer } from './sessionVisitor/reducer';

const emptyAssemblyState: AssemblyGlobalStateType = {
  customer: { id: '', name: '', slug: '' },
  event: {
    id: '',
    customerId: '',
    language: DEFAULT_LANGUAGE,
    name: '',
    slug: '',
    introMediaUrl: '',
    introduction: '',
    links: [],
    logoUrl: '',
    summaryTitle: '',
    summaryContent: '',
  },
  termQueries: [],
  feed: { isStreaming: false, items: [] },
  language: DEFAULT_LANGUAGE,
  sessionId: '',
  visitorId: '',
  documentSources: [],
};

export const initAssemblyEmptyState = (): AssemblyGlobalStateType =>
  JSON.parse(JSON.stringify(emptyAssemblyState));

const deepEqual = (
  x: AssemblyGlobalStateType,
  y: AssemblyGlobalStateType
): boolean => JSON.stringify(x) === JSON.stringify(y);

const AssemblyAppContext = createContext({
  state: initAssemblyEmptyState(),
  dispatch: (arg: ReducerAction) => {}, // eslint-disable-line
});

export const useAssemblyContext = (): {
  state: AssemblyGlobalStateType;
  dispatch: Dispatch;
} => useContext(AssemblyAppContext);

const rootReducer = combineReducers({
  feed: feed_reducer,
  sessionId: session_reducer,
  visitorId: visitor_reducer,
  documentSources: event_sources_reducer,
});

const useAllReducers = (
  serverState?: AssemblyGlobalStateType
): {
  state: AssemblyGlobalStateType;
  dispatch: Dispatch;
} => {
  const [state, dispatch] = useReducer(rootReducer, serverState || {});
  return { state, dispatch };
};

const AssemblyContextState: FC<{
  serverState?: AssemblyGlobalStateType;
  children: ReactNode;
}> = ({ serverState, children }) => {
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
    <AssemblyAppContext.Provider value={{ state, dispatch: dispatchLogged }}>
      {children}
    </AssemblyAppContext.Provider>
  );
};

export default AssemblyContextState;
