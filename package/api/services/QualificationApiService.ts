import { AxiosResponse } from 'axios';
import { ApiService } from '@make.org/api/ApiService';

const PATH_QUALIFICATION =
  '/questions/:questionId/proposals/:proposalId/qualification';
const PATH_UNQUALIFICATION =
  '/questions/:questionId/proposals/:proposalId/unqualification';

export class QualificationApiService {
  static qualify(
    questionId: string,
    proposalId: string,
    proposalKey: string,
    voteKey: string,
    qualificationKey: string,
    proposalLanguage: string
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(
      PATH_QUALIFICATION.replace(':questionId', questionId).replace(
        ':proposalId',
        proposalId
      ),
      {
        method: 'POST',
        body: JSON.stringify({
          voteKey,
          qualificationKey,
          proposalKey,
        }),
        proposalId,
        headers: {
          'x-make-proposal-language': proposalLanguage,
        },
      }
    );
  }

  static unqualify(
    questionId: string,
    proposalId: string,
    proposalKey: string,
    voteKey: string,
    qualificationKey: string,
    proposalLanguage: string
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(
      PATH_UNQUALIFICATION.replace(':questionId', questionId).replace(
        ':proposalId',
        proposalId
      ),
      {
        method: 'POST',
        body: JSON.stringify({
          voteKey,
          qualificationKey,
          proposalKey,
        }),
        proposalId,
        headers: {
          'x-make-proposal-language': proposalLanguage,
        },
      }
    );
  }
}
