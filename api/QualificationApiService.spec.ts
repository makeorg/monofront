import { ApiService } from './ApiService';
import {
  QualificationApiService,
  PATH_QUALIFICATION,
  PATH_UNQUALIFICATION,
} from './QualificationApiService';

jest.mock('./ApiService');

describe('QualificationApiService', () => {
  beforeEach(() => {
    ApiService.callApi.mockClear();
    jest.spyOn(ApiService, 'callApi');
  });

  describe('qualify', () => {
    it('must call ApiService.callApi', async () => {
      await QualificationApiService.qualify(
        '12345',
        'proposalKey',
        'voteKey',
        'qualificationKey'
      );
      expect(ApiService.callApi).toHaveBeenNthCalledWith(
        1,
        PATH_QUALIFICATION.replace(':proposalId', '12345'),
        {
          method: 'POST',
          body: JSON.stringify({
            voteKey: 'voteKey',
            qualificationKey: 'qualificationKey',
            proposalKey: 'proposalKey',
          }),
          proposalId: '12345',
        }
      );
    });
  });

  describe('unqualify', () => {
    it('must call ApiService.callApi', async () => {
      await QualificationApiService.unqualify(
        '12345',
        'proposalKey',
        'voteKey',
        'qualificationKey'
      );
      expect(ApiService.callApi).toHaveBeenNthCalledWith(
        1,
        PATH_UNQUALIFICATION.replace(':proposalId', '12345'),
        {
          method: 'POST',
          body: JSON.stringify({
            voteKey: 'voteKey',
            qualificationKey: 'qualificationKey',
            proposalKey: 'proposalKey',
          }),
          proposalId: '12345',
        }
      );
    });
  });
});
