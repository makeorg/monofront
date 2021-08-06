import { Reducer, ReducerAction } from '@make.org/types';
import { clearQuestionParams } from '@make.org/utils/helpers/question';
import {
  REMOVE_CURRENT_QUESTION_SLUG,
  SET_CURRENT_QUESTION_SLUG,
} from '../../actionTypes';

export const currentQuestion_reducer: Reducer = (
  state = '',
  action: ReducerAction
): string => {
  switch (action.type) {
    case REMOVE_CURRENT_QUESTION_SLUG: {
      clearQuestionParams();
      return '';
    }
    case SET_CURRENT_QUESTION_SLUG:
      return action.payload.questionSlug;
    default:
      return state;
  }
};
