import { ApiService } from 'Shared/api/ApiService';
import {
  ProposalApiService,
  PATH_PROPOSALS,
  PATH_PROPOSAL_GET,
} from './ProposalApiService';

jest.mock('./ApiService');

describe('ProposalApiService', () => {
  beforeEach(() => {
    ApiService.callApi.mockClear();
    jest.spyOn(ApiService, 'callApi');
  });

  describe('propose', () => {
    it('must call ApiService.callApi', async () => {
      await ProposalApiService.propose('content', '12345');
      expect(ApiService.callApi).toHaveBeenNthCalledWith(1, PATH_PROPOSALS, {
        method: 'POST',
        body: JSON.stringify({
          content: 'content',
          questionId: '12345',
        }),
      });
    });
  });

  describe('getProposal', () => {
    it('must call ApiService.callApi', async () => {
      await ProposalApiService.getProposal('12345');
      expect(ApiService.callApi).toHaveBeenNthCalledWith(
        1,
        PATH_PROPOSAL_GET.replace(':proposalId', '12345'),
        {
          headers: {},
          method: 'GET',
          proposalId: '12345',
        }
      );
    });
  });

  describe('searchProposals', () => {
    it('must call ApiService.callApi', async () => {
      await ProposalApiService.searchProposals();
      expect(ApiService.callApi).toHaveBeenNthCalledWith(1, PATH_PROPOSALS, {
        headers: {},
        method: 'GET',
        params: {
          questionId: undefined,
          limit: 20,
          seed: undefined,
          skip: 0,
          sortAlgorithm: undefined,
          tagsIds: undefined,
        },
      });
    });
    it('must filter by questionId', async () => {
      await ProposalApiService.searchProposals('FR', '12345');
      expect(ApiService.callApi).toHaveBeenNthCalledWith(1, PATH_PROPOSALS, {
        headers: {},
        method: 'GET',
        params: {
          country: 'FR',
          questionId: '12345',
          content: undefined,
          limit: 20,
          seed: undefined,
          skip: 0,
          sortAlgorithm: undefined,
          tagsIds: undefined,
        },
      });
    });
    it('must filter by questionId && tagIds', async () => {
      await ProposalApiService.searchProposals('FR', '12345', 'foo, bar');
      expect(ApiService.callApi).toHaveBeenNthCalledWith(1, PATH_PROPOSALS, {
        headers: {},
        method: 'GET',
        params: {
          country: 'FR',
          questionId: '12345',
          content: undefined,
          limit: 20,
          seed: undefined,
          skip: 0,
          sortAlgorithm: undefined,
          tagsIds: 'foo, bar',
        },
      });
    });
    it('must filter by content', async () => {
      await ProposalApiService.searchProposals(
        'FR',
        undefined,
        undefined,
        undefined,
        20,
        0,
        undefined,
        'foo'
      );
      expect(ApiService.callApi).toHaveBeenNthCalledWith(1, PATH_PROPOSALS, {
        headers: {},
        method: 'GET',
        params: {
          country: 'FR',
          questionId: undefined,
          content: 'foo',
          limit: 20,
          seed: undefined,
          skip: 0,
          sortAlgorithm: undefined,
          tagsIds: undefined,
        },
      });
    });
  });
});
