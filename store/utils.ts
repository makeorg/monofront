import { useReducer, createContext } from 'react';
import { Dispatch, Reducer, ReducerAction, StateRoot } from '@make.org/types';
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

type SliceType = {
  [key: string]: Reducer
}

export const combineReducers = (
  slices: SliceType
) => (
  state: StateRoot,
  action: ReducerAction
): any => Object.keys(slices).filter((s) => s !== undefined).reduce(
  (flatReducer: SliceType, prop) => {
    if (prop in slices && slices[prop] !== undefined) {
      return {
        ...flatReducer,
        [prop]: slices[prop](flatReducer[prop], action),
      };
    }
    return flatReducer;
  },
  {}
);

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

export const useAllReducers = (): { state: StateRoot, dispatch: Dispatch } => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return { state, dispatch };
};

export const getCurrentTimeFormatted = (): string => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const milliseconds = currentTime.getMilliseconds();
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const deepEqual = (x: StateRoot, y: StateRoot): boolean => JSON.stringify(x) === JSON.stringify(y);
