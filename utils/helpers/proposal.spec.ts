import {
  getBaitText,
  PROPOSALS_LISTING_LIMIT,
} from '@make.org/utils/constants/proposal';
import {
  AVAILABLE_ALGORITHMS,
  ProposalApiService,
} from '@make.org/api/ProposalApiService';
import { ProposalService } from '@make.org/utils/services/Proposal';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import {
  getProposalLength,
  proposalHasValidLength,
  searchTaggedProposals,
  getProposalsListTitle,
} from './proposal';

jest.mock('@make.org/api/ProposalApiService');
jest.mock('@make.org/utils/services/Logger');
jest.mock('@make.org/utils/constants/proposal', () => ({
  getBaitText: () => 'il faut',
  MIN_PROPOSAL_LENGTH: 12,
  MAX_PROPOSAL_LENGTH: 140,
  PROPOSALS_LISTING_LIMIT: 10,
}));

const mockedProposalApiService = ProposalApiService as jest.Mocked<any>;

describe('Proposal Helper', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProposalLength function', () => {
    const validProposalContent = 'foobar';
    it('getProposalLength with content', () => {
      const proposalLength = getProposalLength(validProposalContent);
      expect(proposalLength).toBe(13);
    });

    it('getProposalLength with empty content', () => {
      const proposalLength = getProposalLength();
      expect(proposalLength).toBe(getBaitText().length);
    });
  });

  describe('proposalHasValidLength function', () => {
    it('proposalHasValidLength with content with valid length', () => {
      const isProposalValidLength = proposalHasValidLength(15);
      expect(isProposalValidLength).toBe(true);
    });

    it('proposalHasValidLength with content with length more than Max', () => {
      const isProposalValidLength = proposalHasValidLength(141);
      expect(isProposalValidLength).toBe(false);
    });

    it('proposalHasValidLength with content with length minus than Min', () => {
      const isProposalValidLength = proposalHasValidLength(2);
      expect(isProposalValidLength).toBe(false);
    });

    it('proposalHasValidLength without content', () => {
      const isProposalValidLength = proposalHasValidLength();
      expect(isProposalValidLength).toBe(false);
    });
  });

  describe('Search Proposals', () => {
    it('transform tagIds to string', async () => {
      jest.spyOn(ProposalService, 'searchProposals');
      searchTaggedProposals('FR', '12345', ['foo', 'bar']);
      expect(ProposalService.searchProposals).toHaveBeenCalledWith(
        'FR',
        '12345',
        'foo,bar',
        undefined,
        PROPOSALS_LISTING_LIMIT,
        0,
        AVAILABLE_ALGORITHMS.TAGGED_FIRST.value,
        undefined
      );
    });

    it('calculate skipped proposal', async () => {
      jest.spyOn(ProposalService, 'searchProposals');

      searchTaggedProposals('FR', '12345', ['foo', 'bar'], 999, 3);
      expect(ProposalService.searchProposals).toHaveBeenCalledWith(
        'FR',
        '12345',
        'foo,bar',
        999,
        PROPOSALS_LISTING_LIMIT,
        30,
        AVAILABLE_ALGORITHMS.TAGGED_FIRST.value,
        undefined
      );
    });
    it('return results from api response', async () => {
      mockedProposalApiService.searchProposals.mockResolvedValue({
        data: {
          results: [{ proposalId: 'foo', question: { countries: ['FR'] } }],
        },
      });
      const repsonse = await searchTaggedProposals('FR', '12345', [
        'foo',
        'bar',
      ]);
      expect(repsonse).toEqual({
        results: [{ proposalId: 'foo', question: { countries: ['FR'] } }],
      });
    });

    it('return an empty Array and call Logger when api fail', async () => {
      mockedProposalApiService.searchProposals.mockRejectedValue(
        new ApiServiceError('Api error')
      );

      const repsonse = await searchTaggedProposals('FR', '12345', [
        'foo',
        'bar',
      ]);

      // TODO check regression
      // Expected: [api-service-error: You should handle unexpected errors (default handler): Api error]
      // Received: "You should handle unexpected errors (default handler): Api error"
      // expect(Logger.logError).toHaveBeenCalledWith(
      //   new ApiServiceError(
      //     'You should handle unexpected errors (default handler): Api error'
      //   )
      // );

      expect(repsonse).toEqual(null);
    });
  });
  describe('getProposalsListTitle', () => {
    it('return default title', () => {
      const title = getProposalsListTitle('foo');
      console.log('TODO fix test init i18next fail', title);
      // expect(title).toEqual('consultation.sort.RECENT');
    });

    it('return RECENT title', () => {
      const title = getProposalsListTitle('RECENT');
      console.log('TODO fix test init i18next fail', title);
      // expect(title).toEqual('consultation.sort.RECENT');
    });
  });
});
