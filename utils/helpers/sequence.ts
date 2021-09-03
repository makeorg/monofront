import {
  QuestionExtraSlidesConfigType,
  SequenceCardType,
  ProposalType,
} from '@make.org/types';
import i18n from 'i18next';
import { CARD, SEQUENCE } from '@make.org/types/enums';

/**
 * Build cards array
 * @param  {ProposalType[]} proposals
 * @param  {QuestionExtraSlidesConfigType} extraSlidesConfig
 * @param  {boolean} hasProposed
 * @param  {boolean} canPropose
 * @param  {boolean} isStandardSequence
 * @param  {string} introCardParam
 * @param  {string} pushProposalParam
 * @return {SequenceCardType[]}
 */
export const buildCards = (
  proposals: ProposalType[],
  extraSlidesConfig: QuestionExtraSlidesConfigType,
  hasProposed: boolean,
  canPropose: boolean,
  isStandardSequence: boolean,
  introCardParam?: boolean,
  pushProposalParam?: boolean,
  withDemographics?: boolean,
  isWidget?: boolean
): SequenceCardType[] => {
  const withPushProposalCard: boolean =
    !!extraSlidesConfig.pushProposalCard &&
    !!extraSlidesConfig.pushProposalCard.enabled &&
    !!canPropose &&
    !!pushProposalParam &&
    !hasProposed;
  const withIntroCard: boolean =
    !!extraSlidesConfig.introCard &&
    !!extraSlidesConfig.introCard.enabled &&
    !!introCardParam &&
    !isWidget;

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

  if (withDemographics) {
    cards.splice(withIntroCard ? 3 : 2, 0, {
      type: CARD.CARD_TYPE_EXTRASLIDE_DEMOGRAPHICS_CARD,
      configuration: undefined,
      state: { votes: [] },
      index: 0,
    });
  }

  cards.splice(cards.length, 0, {
    type: isStandardSequence
      ? CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD
      : CARD.CARD_TYPE_EXTRASLIDE_SPECIAL_FINAL_CARD,
    configuration: undefined,
    state: { votes: [] },
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
 * @param  {SequenceCardType} card
 * @return {boolean}
 */
export const isPushProposalCard = (card: SequenceCardType | null): boolean =>
  card?.type === CARD.CARD_TYPE_EXTRASLIDE_PUSH_PROPOSAL;

/**
 * Check if is a standard sequence
 * @param  {string} sequenceKind
 * @return {boolean}
 */
export const isStandardSequence = (sequenceKind: string): boolean =>
  sequenceKind === SEQUENCE.KIND_STANDARD;

/**
 * Render title depending on kind
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
 * @return {string || null}
 */
export const getNoProposalCardTitleBySequenceKind = (
  sequenceKind: string
): string | null => {
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

/** Render boolean according to sequence kind parameter
 * @param  {string} sequenceKind
 * @return {boolean}
 *
 */

export const isKeywordSequence = (sequenceKind: SEQUENCE): boolean =>
  ![
    SEQUENCE.KIND_CONTROVERSY,
    SEQUENCE.KIND_CONSENSUS,
    SEQUENCE.KIND_STANDARD,
  ].includes(sequenceKind);
