import { QuestionType } from '@make.org/types';
import { Reducer, ReducerAction } from './types';
import { question_actions } from '../actions/question_actions';

// state, actions and reducer
export const question_state: QuestionType | undefined = undefined;

export const question_reducer: Reducer = (
  state: QuestionType,
  action: ReducerAction
): QuestionType => {
  const { type, data = {} } = action;
  switch (type) {
    case question_actions.GET_QUESTION:
      return data;
    default:
      return state;
  }
};
