import { ReducerAction, QuestionType } from '@make.org/types';
import { LOAD_QUESTION } from '../../actionTypes';

export const loadQuestion = (question: QuestionType): ReducerAction => ({
  type: LOAD_QUESTION,
  payload: { question },
});
