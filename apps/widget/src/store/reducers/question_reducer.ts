import { Question, ReducerAction } from './types';

// types
export type QuestionState = {
  question?: Question;
  questionId: string;
};

// state, actions and reducer
export const question_state: QuestionState = {
  question: undefined,
  questionId: '',
};

export const question_actions = {
  GET_QUESTION: 'GET_QUESTION',
};

export const question_reducer = (
  state: QuestionState,
  action: ReducerAction
): QuestionState => {
  const { type, data = {} } = action;
  switch (type) {
    case question_actions.GET_QUESTION:
      return {
        ...state,
        ...data,
      };
    default:
      return state;
  }
};
