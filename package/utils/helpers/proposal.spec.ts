import { proposalHasValidLength } from './proposal';

jest.mock('@make.org/api/ProposalApiService');
jest.mock('@make.org/utils/services/Logger');

describe('Proposal Helper', () => {
  afterEach(() => {
    jest.clearAllMocks();
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
});
