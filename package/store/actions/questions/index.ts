import {
  ReducerAction,
  QuestionType,
  QuestionResultsType,
} from '@make.org/types';
import { LOAD_QUESTION, LOAD_QUESTION_RESULTS } from '../../actionTypes';

export const loadQuestion = (question: QuestionType): ReducerAction => ({
  type: LOAD_QUESTION,
  payload: { question },
});

export const loadQuestionResults = (
  questionSlug: string,
  results: QuestionResultsType
): ReducerAction => ({
  type: LOAD_QUESTION_RESULTS,
  payload: { questionSlug, results },
});
