import { AxiosResponse } from 'axios';
import { ApiService } from '@make.org/api/ApiService';

const PATH_VOTE = '/questions/:questionId/proposals/:proposalId/vote';
const PATH_UNVOTE = '/questions/:questionId/proposals/:proposalId/unvote';

export class VoteApiService {
  static vote(
    questionId: string,
    proposalId: string,
    voteKey: string,
    proposalKey: string,
    proposalLanguage: string
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(
      PATH_VOTE.replace(':questionId', questionId).replace(
        ':proposalId',
        proposalId
      ),
      {
        method: 'POST',
        body: JSON.stringify({ voteKey, proposalKey }),
        proposalId,
        headers: {
          'x-make-proposal-language': proposalLanguage,
        },
      }
    );
  }

  static unvote(
    questionId: string,
    proposalId: string,
    voteKey: string,
    proposalKey: string,
    proposalLanguage: string
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(
      PATH_UNVOTE.replace(':questionId', questionId).replace(
        ':proposalId',
        proposalId
      ),
      {
        method: 'POST',
        body: JSON.stringify({ voteKey, proposalKey }),
        proposalId,
        headers: {
          'x-make-proposal-language': proposalLanguage,
        },
      }
    );
  }
}
