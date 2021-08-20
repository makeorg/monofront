import {
  getBaitText,
  MIN_PROPOSAL_LENGTH,
  MAX_PROPOSAL_LENGTH,
  PROPOSALS_LISTING_LIMIT,
} from '@make.org/utils/constants/proposal';
import { ProposalsType } from '@make.org/types';
import { ProposalService } from '@make.org/utils/services/Proposal';
import i18n from 'i18next';
import { TRANSLATION_NAMESPACE } from '@make.org/utils/i18n/constants';
import { Logger } from '@make.org/utils/services/Logger';
import { DEFAULT_LANGUAGE } from '@make.org/utils/constants/config';
import { AVAILABLE_ALGORITHMS } from '@make.org/api/ProposalApiService';

export const getProposalLength = (content = ''): number => {
  if (content === '') {
    return getBaitText().length;
  }

  return (getBaitText() + content).length;
};

export const proposalHasValidLength = (length = 0): boolean => {
  if (length === 0) {
    return false;
  }

  return length >= MIN_PROPOSAL_LENGTH && length <= MAX_PROPOSAL_LENGTH;
};

/**
 * Search the first no voted proposal
 * @type {Object|undefined}
 */
export const searchProposals = async (
  country: string,
  content?: string,
  page = 0,
  limit = PROPOSALS_LISTING_LIMIT,
  seed?: number,
  questionId?: string,
  tagsIds?: string,
  sortTypeKey?: string,
  ideaIds?: string
): Promise<ProposalsType | null> => {
  const skip = page * limit;

  const result = await ProposalService.searchProposals(
    country,
    questionId,
    tagsIds,
    seed,
    limit,
    skip,
    sortTypeKey,
    content,
    ideaIds
  );

  return result;
};

export const searchTaggedProposals = async (
  country: string,
  questionId: string,
  TagIdsArray: string[] = [],
  seed?: number,
  page = 0,
  sortTypeKey = AVAILABLE_ALGORITHMS.TAGGED_FIRST.value,
  ideaIds?: string
): Promise<ProposalsType | null> => {
  const limit = PROPOSALS_LISTING_LIMIT;
  const skip = page * limit;
  const tagsIds = TagIdsArray.length ? TagIdsArray.join(',') : undefined;

  const response = await ProposalService.searchProposals(
    country,
    questionId,
    tagsIds,
    seed,
    limit,
    skip,
    sortTypeKey,
    ideaIds
  );

  return response;
};

export const getProposalCardIndex = (index = 0): string =>
  `proposal_list_card_${index}`;

/**
 * Rendering title depending on feed algorithm type
 * @type {string}
 * @param {string} sortKey
 * @return {string}
 */
export const getProposalsListTitle = (sortKey: string): string => {
  switch (sortKey) {
    case 'RECENT':
      return i18n.t('consultation.sort.RECENT');
    default:
      return i18n.t('consultation.sort.RECENT');
  }
};

/**
 * Rendering proposal bait text depending on language
 * @type {string}
 * @param {QuestionType} question
 * @return {string}
 */
export const getLocalizedBaitText = (
  language: string,
  questionId: string
): string => {
  const localizedBaitText = i18n.getResource(
    language,
    TRANSLATION_NAMESPACE,
    'proposal_submit.form.bait'
  );

  if (!localizedBaitText) {
    Logger.logError(
      `No proposal bait for questionId:${questionId} with language:${language}`
    );
    return i18n.getResource(
      DEFAULT_LANGUAGE,
      TRANSLATION_NAMESPACE,
      'proposal_submit.form.bait'
    );
  }

  return localizedBaitText;
};
