/* eslint-disable @typescript-eslint/ban-ts-comment */
import { chronologicalOrder } from '@make.org/utils/helpers/date';
import i18n from 'i18next';
import { QuestionTimelineType } from '@make.org/types';

export const buildTimeline = (timeline: {
  result?: QuestionTimelineType;
  workshop?: QuestionTimelineType;
  action?: QuestionTimelineType;
}): any[] => {
  const timelineSteps: any[] = [];

  Object.entries(timeline).forEach(([key, value]) => {
    if (!value) {
      return;
    }
    timelineSteps.push({ name: key, ...value });
  });

  return timelineSteps.sort(chronologicalOrder);
};

const RESULT_STEP = 'result';
const WORKSHOP_STEP = 'workshop';
const ACTION_STEP = 'action';

export const getStepTitle = (stepName: string): string => {
  switch (stepName) {
    case RESULT_STEP:
      return i18n.t('consultation.timeline.result_title');
    case WORKSHOP_STEP:
      return i18n.t('consultation.timeline.workshop_title');
    case ACTION_STEP:
      return i18n.t('consultation.timeline.action_title');
    default:
      return '';
  }
};

export const selectStep = (
  timeline: {
    result?: QuestionTimelineType;
    workshop?: QuestionTimelineType;
    action?: QuestionTimelineType;
  },
  currentStep: 'string',
  nextStep: string | undefined
): boolean => {
  const today = Date.now();
  // Todo refactor to remove ts-ignore
  // @ts-ignore
  const currentStepDate = Date.parse(timeline[currentStep].date);
  let nextStepDate = today;

  if (nextStep) {
    // @ts-ignore
    nextStepDate = Date.parse(timeline[nextStep].date);
  }

  const isBetweenSteps = today >= currentStepDate && today <= nextStepDate;
  const isLastStep = today >= currentStepDate && !nextStepDate;

  if (isBetweenSteps || isLastStep) {
    return true;
  }

  return false;
};
