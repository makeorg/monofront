import { StateRoot, TagType } from '@make.org/types';

/**
 * Questions data selector
 * @param {*} state
 */
export const selectQuestionData = (state: StateRoot, questionSlug?: string) => {
  if (!questionSlug) {
    return null;
  }

  return state.questions[questionSlug];
};

/**
 * question selector
 * @param {*} state
 */
export const selectQuestion = (state: StateRoot, questionSlug?: string) => {
  const data = selectQuestionData(state, questionSlug);

  return data && data.question;
};

/**
 * Sequence question selector
 * @param {*} state
 */
export const selectCurrentQuestion = (state: StateRoot) => {
  const questionSlug = state.currentQuestion;
  return selectQuestion(state, questionSlug);
};
/**
 *  question partners
 *  @param {*} state
 */
export const selectQuestionPartners = (state: StateRoot, slug: string) => {
  if (!slug) {
    return null;
  }
  return state && state.partners[slug] && state.partners[slug].actors;
};

/**
 *  question partners
 *  @param {*} state
 */
export const selectQuestionPopularTags = (
  state: StateRoot,
  questionSlug: string
): TagType[] => {
  if (!questionSlug) {
    return null;
  }
  return (
    state
    && state.questions[questionSlug]
    && state.questions[questionSlug].popularTags
  );
};
