/* eslint-disable default-param-last */
import {
  MIN_PROPOSAL_LENGTH,
  MAX_PROPOSAL_LENGTH,
  PROPOSALS_LISTING_LIMIT,
} from '@make.org/utils/constants/proposal';
import {
  ProposalAccumulator,
  ProposalsType,
  ProposalType,
  TypeFilterAndSortValues,
} from '@make.org/types';
import { ProposalService } from '@make.org/utils/services/Proposal';

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
  preferredLanguage: string,
  questionId?: string,
  content?: string,
  tagsIds?: string,
  seed?: number,
  limit = PROPOSALS_LISTING_LIMIT,
  page = 0,
  sortTypeKey?: string,
  orderTypeKey?: string,
  ideaIds?: string,
  sortAndFilterParams?: TypeFilterAndSortValues
): Promise<ProposalsType | null> => {
  const skip = page * limit;
  const result = await ProposalService.searchProposals(
    country,
    preferredLanguage,
    questionId,
    content,
    tagsIds,
    seed,
    limit,
    skip,
    sortTypeKey,
    orderTypeKey,
    ideaIds,
    sortAndFilterParams && sortAndFilterParams.sortAlgorithm,
    sortAndFilterParams && sortAndFilterParams.keywords,
    sortAndFilterParams && sortAndFilterParams.isNotVoted,
    sortAndFilterParams && sortAndFilterParams.userType
  );

  return result;
};

/**
 * Rendering array of proposals sorted by index
 * @param {ProposalType[]} proposals
 * @param {string[]} includedProposalIds
 *
 * @return {ProposalType[]}
 */
export const getOrderedProposals = (
  proposals: ProposalType[],
  includedProposalIds: string[]
): ProposalType[] => {
  const sortedProposals = proposals.sort((firstProposal, secondProposal) => {
    const indexOfFirst = includedProposalIds.indexOf(firstProposal.id);
    const indexOfSecond = includedProposalIds.indexOf(secondProposal.id);

    if (indexOfFirst !== -1 && indexOfSecond !== -1) {
      return indexOfFirst > indexOfSecond ? 1 : -1;
    }

    if (indexOfFirst !== -1) {
      return -1;
    }

    if (indexOfSecond !== -1) {
      return 1;
    }

    return 0;
  });

  return sortedProposals;
};

/**
 * Rendering array of proposals sorted by index
 * @param {string[]} proposals
 *
 * @param {accumulator} ProposalAccumulator
 * @param {proposal} ProposalType
 *
 * @return {ProposalAccumulator}
 */
export const removeDuplicatedAndVotedProposals =
  (includedProposalIds: string[]) =>
  (
    accumulator: ProposalAccumulator,
    proposal: ProposalType
  ): ProposalAccumulator => {
    if (
      accumulator.unique.find(item => item.id === proposal.id) !== undefined
    ) {
      accumulator.duplicates.push(proposal);
    } else if (
      proposal.votes.some(vote => vote.hasVoted === true) &&
      !includedProposalIds.includes(proposal.id)
    ) {
      accumulator.voted.push(proposal);
    } else {
      accumulator.unique.push(proposal);
    }

    return accumulator;
  };

/**
 * Rendering proposal content and language
 * @param {showOriginal} boolean
 * @param {proposal} ProposalType
 *
 * @return {{ proposalContent: string; proposalLanguage: string;}}
 */
export const getProposalContent = (
  showOriginal: boolean,
  proposal?: ProposalType | null
): {
  proposalContent?: string;
  proposalLanguage?: string;
} => {
  const isTranslated = !!proposal?.translatedContent && !showOriginal;

  const proposalContent = isTranslated
    ? proposal?.translatedContent
    : proposal?.content;
  const proposalLanguage = isTranslated
    ? proposal?.translatedLanguage
    : proposal?.contentLanguage;

  return {
    proposalContent,
    proposalLanguage,
  };
};
