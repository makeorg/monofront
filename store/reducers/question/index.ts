import { QuestionType, Reducer, ReducerAction } from '@make.org/types';
import { GET_QUESTION } from '../../actionTypes';

// state, actions and reducer
export const question_state: QuestionType | undefined = undefined;

export const question_reducer: Reducer = (
  state: QuestionType,
  action: ReducerAction
): QuestionType => {
  const { type, payload = {} } = action;
  switch (type) {
    case GET_QUESTION:
      return payload;
    default:
      return state;
  }
};
