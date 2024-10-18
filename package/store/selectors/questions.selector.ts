import {
  QuestionResultsType,
  QuestionType,
  SingleStateQuestionType,
  StateRoot,
} from '@make.org/types';

/**
 * Questions data selector
 * @param {*} state
 */
const selectQuestionData = (
  state: StateRoot,
  questionSlug: string
): SingleStateQuestionType => state.questions[questionSlug];

/**
 * question selector
 * @param {*} state
 */
const selectQuestion = (
  state: StateRoot,
  questionSlug: string
): QuestionType => {
  const data = selectQuestionData(state, questionSlug);

  return data && data.question;
};

/**
 * Sequence question selector
 * @param {*} state
 */
export const selectCurrentQuestion = (state: StateRoot): QuestionType => {
  const questionSlug = state.currentQuestion;
  return selectQuestion(state, questionSlug || '');
};

/**
 * question results selector
 * @param {*} state
 * @param {string} questionSlug
 */
export const selectQuestionResults = (
  state: StateRoot,
  questionSlug: string
): QuestionResultsType | undefined => {
  const data = selectQuestionData(state, questionSlug);

  return data?.questionResults;
};
