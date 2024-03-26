import {
  QuestionExtraSlidesConfigType,
  SequenceCardType,
  ProposalType,
  NoProposalCardType,
  ILogger,
} from '@make.org/types';
import i18n from 'i18next';
import { CARD, SEQUENCE } from '@make.org/types/enums';

/**
 * Build cards array
 * @param  {ProposalType[]} proposals
 * @param  {QuestionExtraSlidesConfigType} extraSlidesConfig
 * @param  {boolean} canPropose
 * @param  {boolean} isStandardSequence
 * @param  {boolean|undefined} introCardParam
 * @param  {boolean|undefined} pushProposalParam
 * @return {SequenceCardType[]}
 */
export const buildCards = (
  proposals: ProposalType[],
  extraSlidesConfig: QuestionExtraSlidesConfigType,
  isStandardSequence: boolean
): SequenceCardType[] => {
  const withPushProposalCard =
    !!extraSlidesConfig.pushProposalCard &&
    !!extraSlidesConfig.pushProposalCard.enabled;

  const withIntroCard =
    !!extraSlidesConfig.introCard && !!extraSlidesConfig.introCard.enabled;
  const withIntroDemographicCard =
    !!extraSlidesConfig.demographics?.length &&
    extraSlidesConfig.isDemographicsSessionBindingMode;

  const cards: SequenceCardType[] = proposals.map(proposal => ({
    type: CARD.CARD_TYPE_PROPOSAL,
    configuration: { proposal },
    state: { votes: proposal.votes },
    index: 0,
  }));

  if (withPushProposalCard) {
    cards.splice(cards.length / 2, 0, {
      type: CARD.CARD_TYPE_EXTRASLIDE_PUSH_PROPOSAL,
      configuration: extraSlidesConfig.pushProposalCard,
      index: 0,
    });
  }

  if (withIntroCard) {
    cards.splice(0, 0, {
      type: CARD.CARD_TYPE_EXTRASLIDE_INTRO,
      configuration: extraSlidesConfig.introCard,
      index: 0,
    });
  }

  const demographicsStartPosition: number = (() => {
    if (extraSlidesConfig.isDemographicsSessionBindingMode) {
      return cards.length;
    }

    return withIntroCard ? 3 : 2;
  })();

  const shuffle = <T>(array: T[]): T[] => {
    if (array.length <= 1) {
      return array;
    }
    // eslint-disable-next-line no-plusplus
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // eslint-disable-next-line no-param-reassign
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  };

  shuffle(extraSlidesConfig.demographics).forEach(demographicCard => {
    cards.splice(demographicsStartPosition, 0, {
      type: CARD.CARD_TYPE_EXTRASLIDE_DEMOGRAPHICS_CARD,
      configuration: demographicCard,
      index: 0,
    });
  });

  if (withIntroDemographicCard) {
    cards.splice(demographicsStartPosition, 0, {
      type: CARD.CARD_TYPE_EXTRASLIDE_INTRO_DEMOGRAPHICS_CARD,
      index: 0,
    });
  }

  cards.splice(cards.length, 0, {
    type: isStandardSequence
      ? CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD
      : CARD.CARD_TYPE_EXTRASLIDE_SPECIAL_FINAL_CARD,
    configuration: {
      isSessionBindingMode: extraSlidesConfig.isDemographicsSessionBindingMode,
    },
    index: 0,
  });

  const cardsIndexed = cards.map((card, index) => ({
    ...card,
    index,
  }));

  return cardsIndexed;
};

/**
 * Check if is a proposal card
 * @param  {SequenceCardType | NoProposalCardType | null} card
 * @return {boolean}
 */
export const isPushProposalCard = (
  card: SequenceCardType | NoProposalCardType | null
): boolean => card?.type === CARD.CARD_TYPE_EXTRASLIDE_PUSH_PROPOSAL;

/**
 * Renders Meta title depending on kind
 * @param  {string} sequenceKind
 * @return {string || null}
 */
export const getMetalTitleBySequenceKind = (sequenceKind?: string): string => {
  if (sequenceKind === SEQUENCE.KIND_STANDARD) {
    return 'meta.sequence.title_standard';
  }
  if (sequenceKind === SEQUENCE.KIND_CONTROVERSY) {
    return 'meta.sequence.title_controversy';
  }
  if (sequenceKind === SEQUENCE.KIND_CONSENSUS) {
    return 'meta.sequence.title_popular';
  }

  return '';
};

/**
 * Check if is a standard sequence
 * @param  {string} sequenceKind
 * @return {boolean}
 */
export const isStandardSequence = (sequenceKind: string): boolean =>
  sequenceKind === SEQUENCE.KIND_STANDARD;

export const isConsensusSequence = (sequenceKind: string): boolean =>
  sequenceKind === SEQUENCE.KIND_CONSENSUS;
/**
 * Renders title depending on kind
 * @param  {string} sequenceKind
 * @return {string || null}
 */
export const getSequenceTitleBySequenceKind = (
  sequenceKind: string
): string | null => {
  switch (sequenceKind) {
    case SEQUENCE.KIND_CONTROVERSY: {
      return i18n.t('sequence_zone.controversial_title');
    }
    case SEQUENCE.KIND_CONSENSUS: {
      return i18n.t('sequence_zone.popular_title');
    }
    default:
      return null;
  }
};

/** Render NoProposal card title depending on type of sequence
 * @param  {string} sequenceKind
 * @return {string}
 */
export const getNoProposalCardTitleBySequenceKind = (
  sequenceKind: string
): string => {
  switch (sequenceKind) {
    case SEQUENCE.KIND_CONTROVERSY: {
      return i18n.t('no_proposal_card.title.controversial');
    }
    case SEQUENCE.KIND_CONSENSUS: {
      return i18n.t('no_proposal_card.title.popular');
    }
    default:
      return i18n.t('no_proposal_card.title.regular');
  }
};

/** Renders the size of the sequence by handle number of proposals and extra slides params
 * @param  {number} proposalLength
 * @param  {QuestionExtraSlidesConfigType} extraSlidesConfig
 * @param  {boolean} canPropose
 * @param  {number} demographicsCardCount
 * @return {number}
 *
 */
export const getSequenceSize = (
  proposalLength: number,
  extraSlidesConfig: QuestionExtraSlidesConfigType,
  canPropose: boolean,
  demographicsCardCount: number
): number => {
  let sequenceSize = proposalLength + 1; // add one for final card always in sequence

  const withPushProposalCard =
    !!extraSlidesConfig.pushProposalCard &&
    !!extraSlidesConfig.pushProposalCard.enabled &&
    !!canPropose;
  const withIntroCard =
    !!extraSlidesConfig.introCard && !!extraSlidesConfig.introCard.enabled;

  if (withPushProposalCard) {
    sequenceSize += 1;
  }

  if (withIntroCard) {
    sequenceSize += 1;
  }

  if (demographicsCardCount > 0) {
    sequenceSize += demographicsCardCount;
  }

  return sequenceSize;
};

/** Handle no proposals card depending on context
 * @param  {string|undefined} keyword
 * @return {NoProposalCardType}
 *
 */

export const setNoProposalsCard = (keyword?: string): NoProposalCardType => {
  const title = keyword
    ? i18n.t('no_proposal_card.title.keyword', {
        keyword,
      })
    : i18n.t('no_proposal_card.title.regular');

  const noProposalsCard: NoProposalCardType = {
    type: CARD.CARD_TYPE_NO_PROPOSAL_CARD,
    configuration: {
      title,
      description: i18n.t('no_proposal_card.description.special'),
    },
    index: 0,
  };

  return noProposalsCard;
};

export const logSequenceCornerCases = (
  questionId: string,
  duplicates: ProposalType[],
  voted: ProposalType[],
  uniqueProposals: ProposalType[],
  logger: ILogger
): void => {
  if (duplicates.length > 0) {
    logger.logWarning({
      message: `start sequence return duplicate proposals for questionId=${questionId} : ${JSON.stringify(
        duplicates
      )}`,
      name: 'services',
    });
  }
  if (voted.length > 0) {
    logger.logWarning({
      message: `start sequence return voted proposals for questionId=${questionId} : ${JSON.stringify(
        voted
      )}`,
      name: 'services',
    });
  }
  if (uniqueProposals.length === 0) {
    logger.logWarning({
      message: `Empty sequence - questionId: ${questionId}`,
      name: 'services',
    });
  }
};

/** Get no proposals card depending on sequence kind
 * @param  {string|undefined} sequenceKind
 * @return {NoProposalCardType}
 *
 */
export const getNoProposalCard = (sequenceKind: string): NoProposalCardType => {
  const noProposalCard: NoProposalCardType = {
    type: CARD.CARD_TYPE_NO_PROPOSAL_CARD,
    configuration: {
      title: getNoProposalCardTitleBySequenceKind(sequenceKind) || '',
      description: isStandardSequence(sequenceKind)
        ? i18n.t('no_proposal_card.description.regular')
        : i18n.t('no_proposal_card.description.special'),
    },
    index: 0,
  };

  return noProposalCard;
};
