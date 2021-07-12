import { AxiosPromise, AxiosResponse } from 'axios';
import { ApiService } from './ApiService';

export const PATH_QUALIFICATION = '/proposals/:proposalId/qualification';
export const PATH_UNQUALIFICATION = '/proposals/:proposalId/unqualification';

export class QualificationApiService {
  static qualify(
    proposalId: string,
    proposalKey: string,
    voteKey: string,
    qualificationKey: string
  ): AxiosPromise<AxiosResponse> {
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
      }
    );
  }

  static unqualify(
    proposalId: string,
    proposalKey: string,
    voteKey: string,
    qualificationKey: string
  ): AxiosPromise<AxiosResponse> {
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
      }
    );
  }
}
