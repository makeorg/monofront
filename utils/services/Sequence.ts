import { QuestionApiService } from '@make.org/api/QuestionApiService';
import { ProposalType } from '@make.org/types';
import { Logger } from './Logger';
import { defaultUnexpectedError } from './DefaultErrorHandler';

type Accumulator = {
  unique: ProposalType[];
  duplicates: ProposalType[];
  voted: ProposalType[];
};

type SequenceByKindResponse = {
  proposals: ProposalType[];
};

const getOrderedProposals = (
  proposals: ProposalType[],
  includedProposalIds: string[]
) => {
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

// remove duplicates and voted
const removeDuplicatedAndVotedProposals =
  (includedProposalIds: string[]) =>
  (accumulator: Accumulator, proposal: ProposalType) => {
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

const logCornerCases = (
  questionId,
  duplicates: ProposalType[],
  voted: ProposalType[],
  uniqueProposals: ProposalType[]
) => {
  if (duplicates.length > 0) {
    Logger.logWarning(
      `start sequence return duplicate proposals for questionId=${questionId} : ${JSON.stringify(
        duplicates
      )}`
    );
  }
  if (voted.length > 0) {
    Logger.logWarning(
      `start sequence return voted proposals for questionId=${questionId} : ${JSON.stringify(
        voted
      )}`
    );
  }
  if (uniqueProposals.length === 0) {
    Logger.logError(`Empty sequence - questionId: ${questionId}`);
  }
};

const startSequenceByKind = async (
  questionId: string,
  includedProposalIds: string[],
  sequenceKind: string
): Promise<SequenceByKindResponse> => {
  try {
    const { data } = await QuestionApiService.startSequenceByKind(
      questionId,
      includedProposalIds,
      sequenceKind
    );

    const orderedProposals = getOrderedProposals(
      data.proposals,
      includedProposalIds
    );
    const {
      unique: uniqueOrderedProposals,
      duplicates,
      voted,
    } = orderedProposals.reduce(
      removeDuplicatedAndVotedProposals(includedProposalIds),
      {
        unique: [],
        duplicates: [],
        voted: [],
      }
    );

    logCornerCases(questionId, duplicates, voted, uniqueOrderedProposals);

    const response = {
      proposals: uniqueOrderedProposals,
    };

    return response;
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);
    return null;
  }
};

const startSequenceByKeyword = async (
  questionId: string,
  includedProposalIds: string[],
  keyword: string
): Promise<ProposalType[]> => {
  try {
    const { data } = await QuestionApiService.startSequenceByKeyword(
      questionId,
      includedProposalIds,
      keyword
    );
    const orderedProposals = getOrderedProposals(
      data.proposals,
      includedProposalIds
    );
    const { unique, duplicates, voted } = orderedProposals.reduce(
      removeDuplicatedAndVotedProposals(includedProposalIds),
      {
        unique: [],
        duplicates: [],
        voted: [],
      }
    );

    logCornerCases(questionId, duplicates, voted, unique);

    const response = {
      proposals: unique,
      label: data.label,
      key: data.key,
    };

    return response;
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);
    return null;
  }
};

export const SequenceService = {
  startSequenceByKind,
  startSequenceByKeyword,
};
