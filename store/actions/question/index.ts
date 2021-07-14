import { QuestionType } from '@make.org/types';
import { GET_QUESTION } from '../../actionTypes';

export const getQuestionDetails = (
  question: QuestionType
): {
  type: string;
  payload: QuestionType;
} => ({
  type: GET_QUESTION,
  payload: question,
});
