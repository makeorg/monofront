import { QuestionExtraSlidesConfigType } from '@make.org/types';

export function transformExtraSlidesConfigFromQuery(
  sequenceExtraSlides: QuestionExtraSlidesConfigType,
  disableIntroCard: boolean,
  disablePushProposalCard: boolean
): QuestionExtraSlidesConfigType {
  const extraSlidesConfig: QuestionExtraSlidesConfigType = {
    ...sequenceExtraSlides,
  };
  if (disableIntroCard) {
    delete extraSlidesConfig.introCard;
  }

  if (disablePushProposalCard) {
    delete extraSlidesConfig.pushProposalCard;
  }

  return extraSlidesConfig;
}
