import { QuestionApiService } from '@make.org/api/services/QuestionApiService';
import {
  SequenceType,
  FirstProposalSequenceType,
  ILogger,
} from '@make.org/types';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { defaultUnexpectedError } from './DefaultErrorHandler';
import {
  getOrderedProposals,
  removeDuplicatedAndVotedProposals,
} from '../helpers/proposal';
import { logSequenceCornerCases } from '../helpers/sequence';

const startSequenceByKind = async (
  questionId: string,
  includedProposalIds: string[],
  sequenceKind: string,
  preferredLanguage: string,
  demographicsCardId: string | null,
  token: string | null,
  logger: ILogger
): Promise<SequenceType | null> => {
  try {
    const response = await QuestionApiService.startSequenceByKind(
      questionId,
      includedProposalIds,
      sequenceKind,
      preferredLanguage,
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

    logSequenceCornerCases(
      questionId,
      duplicates,
      voted,
      uniqueOrderedProposals,
      logger
    );

    const formattedResponse = {
      proposals: uniqueOrderedProposals,
      demographics: data.demographics,
      length: uniqueOrderedProposals.length,
      sessionBindingMode: data.sessionBindingMode,
    };

    return formattedResponse;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);
    return null;
  }
};

const startSequenceFirstProposal = async (
  questionId: string,
  preferredLanguage: string
): Promise<null | FirstProposalSequenceType> => {
  try {
    const response = await QuestionApiService.startSequenceFirstProposal(
      questionId,
      preferredLanguage
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
  keyword: string,
  preferredLanguage: string,
  logger: ILogger
): Promise<null | SequenceType> => {
  try {
    const response = await QuestionApiService.startSequenceByKeyword(
      questionId,
      includedProposalIds,
      keyword,
      preferredLanguage
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

    logSequenceCornerCases(questionId, duplicates, voted, unique, logger);

    const formattedResponse = {
      proposals: unique,
      label: data.label,
      key: data.key,
      demographics: data.demographics,
      length: unique.length,
      sessionBindingMode: data.sessionBindingMode,
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
