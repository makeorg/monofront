import { QuestionType } from '@make.org/types';

export const question_actions = {
  GET_QUESTION: 'GET_QUESTION',
};

export const getQuestionDetails = (question: QuestionType): {
  type: string
  data: QuestionType
} => ({
  type: question_actions.GET_QUESTION,
  data: question,
});
