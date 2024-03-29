import { AxiosResponse } from 'axios';
import { ApiService } from '@make.org/api/ApiService';

const PATH_QUALIFICATION = '/proposals/:proposalId/qualification';
const PATH_UNQUALIFICATION = '/proposals/:proposalId/unqualification';

export class QualificationApiService {
  static qualify(
    proposalId: string,
    proposalKey: string,
    voteKey: string,
    qualificationKey: string,
    proposalLanguage: string
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(
      PATH_QUALIFICATION.replace(':proposalId', proposalId),
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
    proposalId: string,
    proposalKey: string,
    voteKey: string,
    qualificationKey: string,
    proposalLanguage: string
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(
      PATH_UNQUALIFICATION.replace(':proposalId', proposalId),
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
