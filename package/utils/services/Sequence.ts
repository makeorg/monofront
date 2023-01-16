import { QuestionApiService } from '@make.org/api/QuestionApiService';
import {
  SequenceType,
  DemographicDataType,
  FirstProposalSequenceType,
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
  demographicsCardId?: string,
  token?: string
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
      uniqueOrderedProposals
    );

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
  preferredLanguage: string
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

    logSequenceCornerCases(questionId, duplicates, voted, unique);

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
