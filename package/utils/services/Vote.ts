import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { VoteApiService } from '@make.org/api/VoteApiService';
import { VoteType } from '@make.org/types';
import { defaultUnexpectedError } from './DefaultErrorHandler';

const vote = async (
  proposalId: string,
  voteKey: string,
  proposalKey: string,
  proposalLanguage: string
): Promise<VoteType | null> => {
  try {
    const response = await VoteApiService.vote(
      proposalId,
      voteKey,
      proposalKey,
      proposalLanguage
    );

    return response && response.data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const unvote = async (
  proposalId: string,
  voteKey: string,
  proposalKey: string,
  proposalLanguage: string
): Promise<VoteType | null> => {
  try {
    const response = await VoteApiService.unvote(
      proposalId,
      voteKey,
      proposalKey,
      proposalLanguage
    );

    return response && response.data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

export const VoteService = {
  vote,
  unvote,
};
