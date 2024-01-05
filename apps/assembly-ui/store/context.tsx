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
import { AssemblyStateType } from '../types';
import { feed_reducer } from './feed/reducer';

const emptyAssemblyState: AssemblyStateType = {
  customer: { id: '', name: '', slug: '' },
  event: {
    id: '',
    customerId: '',
    language: '',
    name: '',
    slug: '',
    introMediaUrl: '',
    introduction: '',
    links: [],
    logoUrl: '',
  },
  termQueries: [],
  generatedContents: [],
  feed: { isStreaming: false, items: [] },
};

export const initAssemblyEmptyState = (): AssemblyStateType =>
  JSON.parse(JSON.stringify(emptyAssemblyState));

const deepEqual = (x: AssemblyStateType, y: AssemblyStateType): boolean =>
  JSON.stringify(x) === JSON.stringify(y);

const AssemblyAppContext = createContext({
  state: initAssemblyEmptyState(),
  dispatch: (arg: ReducerAction) => {}, // eslint-disable-line
});

export const useAssemblyContext = (): {
  state: AssemblyStateType;
  dispatch: Dispatch;
} => useContext(AssemblyAppContext);

const rootReducer = combineReducers({
  feed: feed_reducer,
});

const useAllReducers = (
  serverState?: AssemblyStateType
): {
  state: AssemblyStateType;
  dispatch: Dispatch;
} => {
  const [state, dispatch] = useReducer(rootReducer, serverState || {});
  return { state, dispatch };
};

const AssemblyContextState: FC<{
  serverState?: AssemblyStateType;
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
