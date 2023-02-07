import { AxiosResponse } from 'axios';
import { ApiService } from './ApiService';

const PATH_VOTE = '/proposals/:proposalId/vote';
const PATH_UNVOTE = '/proposals/:proposalId/unvote';

export class VoteApiService {
  static vote(
    proposalId: string,
    voteKey: string,
    proposalKey: string,
    proposalLanguage: string
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(PATH_VOTE.replace(':proposalId', proposalId), {
      method: 'POST',
      body: JSON.stringify({ voteKey, proposalKey }),
      proposalId,
      headers: {
        'x-make-proposal-language': proposalLanguage,
      },
    });
  }

  static unvote(
    proposalId: string,
    voteKey: string,
    proposalKey: string,
    proposalLanguage: string
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(PATH_UNVOTE.replace(':proposalId', proposalId), {
      method: 'POST',
      body: JSON.stringify({ voteKey, proposalKey }),
      proposalId,
      headers: {
        'x-make-proposal-language': proposalLanguage,
      },
    });
  }
}
