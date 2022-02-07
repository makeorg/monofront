import {
  QuestionExtraSlidesConfigType,
  SequenceCardType,
  ProposalType,
  DemographicDataType,
  NoProposalCardType,
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
 * @param  {boolean|undefined} loadFirstProposal
 * @return {SequenceCardType[]}
 */
export const buildCards = (
  proposals: ProposalType[],
  extraSlidesConfig: QuestionExtraSlidesConfigType,
  canPropose: boolean,
  isStandardSequence: boolean,
  introCardParam?: boolean,
  pushProposalParam?: boolean,
  loadFirstProposal?: boolean
): SequenceCardType[] => {
  const withPushProposalCard =
    !!extraSlidesConfig.pushProposalCard &&
    !!extraSlidesConfig.pushProposalCard.enabled &&
    !!canPropose &&
    !!pushProposalParam &&
    !loadFirstProposal;
  const withIntroCard =
    !!extraSlidesConfig.introCard &&
    !!extraSlidesConfig.introCard.enabled &&
    !!introCardParam &&
    !loadFirstProposal;
  const withDemographicsCard = extraSlidesConfig.demographics;
  const withFinalCard = !loadFirstProposal;

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
      state: { votes: [] },
      index: 0,
    });
  }

  if (withIntroCard) {
    cards.splice(0, 0, {
      type: CARD.CARD_TYPE_EXTRASLIDE_INTRO,
      configuration: extraSlidesConfig.introCard,
      state: { votes: [] },
      index: 0,
    });
  }

  if (withDemographicsCard) {
    cards.splice(withIntroCard ? 3 : 2, 0, {
      type: CARD.CARD_TYPE_EXTRASLIDE_DEMOGRAPHICS_CARD,
      configuration: extraSlidesConfig.demographics,
      state: { votes: [] },
      index: 0,
    });
  }

  if (withFinalCard) {
    cards.splice(cards.length, 0, {
      type: isStandardSequence
        ? CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD
        : CARD.CARD_TYPE_EXTRASLIDE_SPECIAL_FINAL_CARD,
      configuration: undefined,
      state: { votes: [] },
      index: 0,
    });
  }

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
 * Check if is a standard sequence
 * @param  {string} sequenceKind
 * @return {boolean}
 */
export const isStandardSequence = (sequenceKind: string): boolean =>
  sequenceKind === SEQUENCE.KIND_STANDARD;

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
 * @param  {boolean} hasDemographics
 * @param  {boolean | undefined} introCardParam
 * @param  {boolean | undefined} pushProposalParam
 * @return {number}
 *
 */
export const getSequenceSize = (
  proposalLength: number,
  extraSlidesConfig: QuestionExtraSlidesConfigType,
  canPropose: boolean,
  hasDemographics: boolean,
  introCardParam?: boolean
): number => {
  let sequenceSize = proposalLength + 1; // add one for final card always in sequence

  const withPushProposalCard =
    !!extraSlidesConfig.pushProposalCard &&
    !!extraSlidesConfig.pushProposalCard.enabled &&
    !!canPropose;
  const withIntroCard =
    !!extraSlidesConfig.introCard &&
    !!extraSlidesConfig.introCard.enabled &&
    !!introCardParam;
  const withDemographicsCard =
    extraSlidesConfig.demographics || hasDemographics;

  if (withPushProposalCard) {
    sequenceSize += 1;
  }

  if (withIntroCard) {
    sequenceSize += 1;
  }

  if (withDemographicsCard) {
    sequenceSize += 1;
  }

  return sequenceSize;
};

/** Handle destructured data for demographics, and add those in extra slides config
 * @param  {QuestionExtraSlidesConfigType} extraSlidesConfig
 * @param  {boolean} hasDemographics
 * @param  {DemographicDataType | undefined} demographicsData
 * @return {QuestionExtraSlidesConfigType}
 *
 */
export const addDemographicsToSequenceConfig = (
  extraSlidesConfig: QuestionExtraSlidesConfigType,
  hasDemographics: boolean,
  demographicsData?: DemographicDataType
): QuestionExtraSlidesConfigType => {
  if (!hasDemographics || !demographicsData) {
    return extraSlidesConfig;
  }

  return {
    ...extraSlidesConfig,
    demographics: demographicsData,
  };
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
