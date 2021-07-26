import { Dispatch, ReducerAction } from '@make.org/types';
import { trackingParamsService } from '@make.org/utils/services/TrackingParamsService';
import { QuestionType } from '@make.org/types/Question';
import { REMOVE_CURRENT_QUESTION_SLUG } from '../actionTypes';

export const updateTrackingQuestionParam = (question: QuestionType): void => {
  if (question) {
    trackingParamsService.questionId = question.questionId;
    trackingParamsService.questionSlug = question.slug;
  }
};

const clearQuestionParam = () => {
  trackingParamsService.questionId = '';
  trackingParamsService.questionSlug = '';
};

export const question =
  () =>
  (next: Dispatch) =>
  (action: ReducerAction): void => {
    switch (action.type) {
      case REMOVE_CURRENT_QUESTION_SLUG:
        clearQuestionParam();
        return next(action);
      default:
        return next(action);
    }
  };
