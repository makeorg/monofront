import { PartnerType, QuestionType, StateQuestions } from '@make.org/types';
import { trackingParamsService } from '@make.org/utils/services/TrackingParamsService';

const GREAT_CAUSE = 'GREAT_CAUSE';

export const isGreatCause = (operationKind: string): boolean =>
  operationKind === GREAT_CAUSE;

export const orderPartnersByWeight = (
  partner1: PartnerType,
  partner2: PartnerType
): number => {
  if (partner1.weight === null && partner2.weight === null) {
    return 0;
  }
  if (partner2.weight === null) {
    return 1;
  }
  if (partner1.weight === null) {
    return -1;
  }

  return 0;
};

export const getQuestionFromState = (
  questionsInState: StateQuestions,
  questionSlug: string
): null | QuestionType => {
  const questions = Object.keys(questionsInState);

  const slugFoundInState = questions.find(
    question => question === questionSlug
  );

  if (!slugFoundInState) {
    return null;
  }

  return questionsInState[slugFoundInState].question;
};

export const updateTrackingQuestionParam = (question: QuestionType): void => {
  trackingParamsService.questionId = question.questionId;
  trackingParamsService.questionSlug = question.slug;
};

export const clearQuestionParams = (): void => {
  trackingParamsService.questionId = '';
  trackingParamsService.questionSlug = '';
};
