import { ReducerAction, StateQuestions } from '@make.org/types';
import {
  LOAD_QUESTION,
  QUESTION_POPULAR_TAGS_LOAD,
  QUESTION_PERSONALITIES_LOAD,
} from '../../actionTypes';

export const questions_state: StateQuestions = {};

export const questions_reducer = (
  state: StateQuestions = questions_state,
  action: ReducerAction
): StateQuestions => {
  switch (action.type) {
    case LOAD_QUESTION:
      return {
        ...state,
        [action.payload.question.slug]: {
          ...state[action.payload.question.slug],
          question: action.payload.question,
        },
      };
    case QUESTION_POPULAR_TAGS_LOAD:
      return {
        ...state,
        [action.payload.questionSlug]: {
          ...state[action.payload.questionSlug],
          popularTags: action.payload.popularTags,
        },
      };
    case QUESTION_PERSONALITIES_LOAD:
      return {
        ...state,
        [action.payload.questionSlug]: {
          ...state[action.payload.questionSlug],
          personalities: action.payload.personalities,
        },
      };
    default:
      return state;
  }
};
