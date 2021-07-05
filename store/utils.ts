import { useReducer, createContext } from 'react';
import useCombinedReducers from 'use-combined-reducers';
import { question_reducer, question_state } from './reducers/question';
import {
  proposals_reducer,
  proposals_state,
} from './reducers/proposals';
import { sequence_reducer, sequence_state } from './reducers/sequence';

export const AppContext = createContext({});

export const useAllReducers = (): any => {
  const [state, dispatch] = useCombinedReducers({
    question: useReducer(question_reducer, question_state),
    proposals: useReducer(proposals_reducer, proposals_state),
    sequence: useReducer(sequence_reducer, sequence_state),
    // appConfig: undefined,
    // views: undefined,
    // proposal: undefined,
    // currentQuestion: undefined,
    // notifications: undefined,
    // user: undefined,
    // questions: undefined,
    // modal: undefined,
    // partners: undefined,
    // panel: undefined,
    // session: undefined,
  });

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

export const deepEqual = (x: any, y: any): boolean => JSON.stringify(x) === JSON.stringify(y);
