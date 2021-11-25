import { QuestionApiService } from '@make.org/api/QuestionApiService';
import {
  SequenceType,
  ProposalType,
  DemographicDataType,
  FirstProposalSequenceType,
} from '@make.org/types';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { Logger } from './Logger';
import { defaultUnexpectedError } from './DefaultErrorHandler';

type Accumulator = {
  unique: ProposalType[];
  duplicates: ProposalType[];
  voted: ProposalType[];
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
  questionId: string,
  duplicates: ProposalType[],
  voted: ProposalType[],
  uniqueProposals: ProposalType[]
) => {
  if (duplicates.length > 0) {
    Logger.logWarning({
      message: `start sequence return duplicate proposals for questionId=${questionId} : ${JSON.stringify(
        duplicates
      )}`,
      name: 'services',
    });
  }
  if (voted.length > 0) {
    Logger.logWarning({
      message: `start sequence return voted proposals for questionId=${questionId} : ${JSON.stringify(
        voted
      )}`,
      name: 'services',
    });
  }
  if (uniqueProposals.length === 0) {
    Logger.logError({
      message: `Empty sequence - questionId: ${questionId}`,
      name: 'services',
    });
  }
};

const startSequenceByKind = async (
  questionId: string,
  includedProposalIds: string[],
  sequenceKind: string,
  demographicsCardId?: string,
  token?: string
): Promise<SequenceType | null> => {
  try {
    const response = await QuestionApiService.startSequenceByKind(
      questionId,
      includedProposalIds,
      sequenceKind,
      demographicsCardId,
      token
    );

    if (!response) {
      return null;
    }

    const { data } = response;
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

    const formattedResponse = {
      proposals: uniqueOrderedProposals,
      demographics: data.demographics as DemographicDataType,
      length: uniqueOrderedProposals.length,
    };

    return formattedResponse;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);
    return null;
  }
};

const startSequenceFirstProposal = async (
  questionId: string
): Promise<null | FirstProposalSequenceType> => {
  try {
    const response = await QuestionApiService.startSequenceFirstProposal(
      questionId
    );
    if (!response) {
      return null;
    }
    const { data } = response;
    return data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);
    return null;
  }
};

const startSequenceByKeyword = async (
  questionId: string,
  includedProposalIds: string[],
  keyword: string
): Promise<null | SequenceType> => {
  try {
    const response = await QuestionApiService.startSequenceByKeyword(
      questionId,
      includedProposalIds,
      keyword
    );

    if (!response) {
      return null;
    }

    const { data } = response;
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

    const formattedResponse = {
      proposals: unique,
      label: data.label,
      key: data.key,
      length: unique.length,
    };

    return formattedResponse;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);
    return null;
  }
};

export const SequenceService = {
  startSequenceByKind,
  startSequenceByKeyword,
  startSequenceFirstProposal,
};
