import { VoteApiService } from '@make.org/api/VoteApiService';
import { VoteType } from '@make.org/types';
import { defaultUnexpectedError } from './DefaultErrorHandler';

const vote = async (
  proposalId: string,
  voteKey: string,
  proposalKey: string
): Promise<VoteType> => {
  try {
    const response = await VoteApiService.vote(
      proposalId,
      voteKey,
      proposalKey
    );

    return response.data;
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const unvote = async (
  proposalId: string,
  voteKey: string,
  proposalKey: string
): Promise<VoteType> => {
  try {
    const response = await VoteApiService.unvote(
      proposalId,
      voteKey,
      proposalKey
    );

    return response.data;
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

export const VoteService = {
  vote,
  unvote,
};
