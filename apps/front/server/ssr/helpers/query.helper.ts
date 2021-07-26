import { QuestionExtraSlidesConfigType } from '@make.org/types';

export function transformExtraSlidesConfigFromQuery(
  sequenceExtraSlides: QuestionExtraSlidesConfigType,
  noIntroCard: boolean,
  noPushProposalCard: boolean
): QuestionExtraSlidesConfigType {
  const extraSlidesConfig: QuestionExtraSlidesConfigType = {
    ...sequenceExtraSlides,
  };
  if (noIntroCard) {
    delete extraSlidesConfig.introCard;
  }

  if (noPushProposalCard) {
    delete extraSlidesConfig.pushProposalCard;
  }

  return extraSlidesConfig;
}
