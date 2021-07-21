import { ReducerAction } from '@make.org/types';
import {
  REMOVE_CURRENT_QUESTION_SLUG,
  SET_CURRENT_QUESTION_SLUG,
} from '../../actionTypes';

export const setCurrentQuestionSlug = (
  questionSlug: string
): ReducerAction => ({
  type: SET_CURRENT_QUESTION_SLUG,
  payload: { questionSlug },
});

export const removeCurrentQuestionSlug = (): ReducerAction => ({
  type: REMOVE_CURRENT_QUESTION_SLUG,
});
