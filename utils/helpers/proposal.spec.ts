import {
  AVAILABLE_ALGORITHMS,
  ProposalApiService,
} from '@make.org/api/ProposalApiService';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import {
  getBaitText,
  PROPOSALS_LISTING_LIMIT,
} from '../constants/proposal';
import { Logger } from '../services/Logger';
import { ProposalService } from '../services/Proposal';
import * as ProposalHelper from './proposal';

jest.mock('@make.org/api/ProposalApiService');
jest.mock('../services/Logger');
jest.mock('../constants/proposal', () => ({
  getBaitText: () => 'il faut',
  MIN_PROPOSAL_LENGTH: 12,
  MAX_PROPOSAL_LENGTH: 140,
  PROPOSALS_LISTING_LIMIT: 10,
}));

describe('Proposal Helper', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProposalLength function', () => {
    const validProposalContent = 'foobar';
    it('getProposalLength with content', () => {
      const proposalLength = ProposalHelper.getProposalLength(
        validProposalContent
      );
      expect(proposalLength).toBe(13);
    });

    it('getProposalLength with empty content', () => {
      const proposalLength = ProposalHelper.getProposalLength();
      expect(proposalLength).toBe(getBaitText().length);
    });
  });

  describe('proposalHasValidLength function', () => {
    it('proposalHasValidLength with content with valid length', () => {
      const isProposalValidLength = ProposalHelper.proposalHasValidLength(15);
      expect(isProposalValidLength).toBe(true);
    });

    it('proposalHasValidLength with content with length more than Max', () => {
      const isProposalValidLength = ProposalHelper.proposalHasValidLength(141);
      expect(isProposalValidLength).toBe(false);
    });

    it('proposalHasValidLength with content with length minus than Min', () => {
      const isProposalValidLength = ProposalHelper.proposalHasValidLength(2);
      expect(isProposalValidLength).toBe(false);
    });

    it('proposalHasValidLength without content', () => {
      const isProposalValidLength = ProposalHelper.proposalHasValidLength();
      expect(isProposalValidLength).toBe(false);
    });
  });

  describe('searchFirstUnvotedProposal function', () => {
    it('searchFirstUnvotedProposal with empty array', () => {
      const firstUnvotedProposal = ProposalHelper.searchFirstUnvotedProposal(
        []
      );
      expect(firstUnvotedProposal).toBeUndefined();
    });

    it('searchFirstUnvotedProposal with proposals', () => {
      const fooProposal = {
        id: 'foo',
        votes: [{ hasVoted: true }, { hasVoted: false }, { hasVoted: false }],
      };
      const barProposal = {
        id: 'bar',
        votes: [{ hasVoted: false }, { hasVoted: false }, { hasVoted: false }],
      };
      const bazProposal = {
        id: 'baz',
        votes: [{ hasVoted: true }, { hasVoted: false }, { hasVoted: false }],
      };
      const proposals = [fooProposal, barProposal, bazProposal];

      const firstUnvotedProposal = ProposalHelper.searchFirstUnvotedProposal(
        proposals
      );
      expect(firstUnvotedProposal.id).toBe('bar');
    });
  });
  describe('Search Proposals', () => {
    it('transform tagIds to string', async () => {
      jest.spyOn(ProposalService, 'searchProposals');
      ProposalHelper.searchTaggedProposals('FR', '12345', ['foo', 'bar']);
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

      ProposalHelper.searchTaggedProposals(
        'FR',
        '12345',
        ['foo', 'bar'],
        999,
        3
      );
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
      ProposalApiService.searchProposals.mockResolvedValue({
        data: {
          results: [{ proposalId: 'foo', question: { countries: ['FR'] } }],
        },
      });
      const repsonse = await ProposalHelper.searchTaggedProposals(
        'FR',
        '12345',
        ['foo', 'bar']
      );
      expect(repsonse).toEqual({
        results: [{ proposalId: 'foo', question: { countries: ['FR'] } }],
      });
    });

    it('return an empty Array and call Logger when api fail', async () => {
      ProposalApiService.searchProposals.mockRejectedValue(
        new ApiServiceError('Api error')
      );

      const repsonse = await ProposalHelper.searchTaggedProposals(
        'FR',
        '12345',
        ['foo', 'bar']
      );

      expect(Logger.logError).toHaveBeenCalledWith(
        new ApiServiceError(
          'You should handle unexpected errors (default handler): Api error'
        )
      );

      expect(repsonse).toEqual(null);
    });
  });
  describe('getProposalsListTitle', () => {
    it('return default title', () => {
      const title = ProposalHelper.getProposalsListTitle('foo');
      expect(title).toEqual('consultation.sort.RECENT');
    });

    it('return RECENT title', () => {
      const title = ProposalHelper.getProposalsListTitle('RECENT');
      expect(title).toEqual('consultation.sort.RECENT');
    });
  });
});
