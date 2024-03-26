import { ProposalType } from '@make.org/types';
import { proposalHasValidLength, getProposalContent } from './proposal';

jest.mock('@make.org/api/services/ProposalApiService');

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

  describe('getProposalContent', () => {
    const mockedProposal: ProposalType = {
      id: '1234',
      userId: '1234',
      content: 'fooContent',
      contentLanguage: 'fooLanguage',
      translatedContent: 'translatedFooContent',
      translatedLanguage: 'translatedFooLanguage',
      slug: 'foo',
      status: 'foo',
      createdAt: 'foo',
      updatedAt: 'foo',
      votes: [],
      context: {
        operation: 'foo',
        source: 'foo',
        location: 'foo',
        question: 'foo',
        country: 'foo',
        questionLanguage: 'foo',
        proposalLanguage: 'foo',
        clientLanguage: 'foo',
        getParameters: [],
      },
      author: {
        firstName: 'foo',
        displayName: 'foo',
        organisationName: 'foo',
        organisationSlug: 'foo',
        postalCode: 'string',
        age: 123,
        avatarUrl: 'string',
        userType: 'foo',
      },
      organisations: [],
      tags: [],
      selectedStakeTag: {},
      myProposal: false,
      idea: 'foo',
      question: {},
      operationId: 'foo',
      proposalKey: 'foo',
      keywords: [],
    };

    it('return translated content and language', () => {
      const proposalContent = getProposalContent(false, mockedProposal);
      expect(proposalContent).toEqual({
        proposalContent: mockedProposal.translatedContent,
        proposalLanguage: mockedProposal.translatedLanguage,
      });
    });

    it('return original content and language', () => {
      const proposalContent = getProposalContent(true, mockedProposal);
      expect(proposalContent).toEqual({
        proposalContent: mockedProposal.content,
        proposalLanguage: mockedProposal.contentLanguage,
      });
    });

    it('proposal is not defined, it returns undefined', () => {
      const proposalContent = getProposalContent(true);
      expect(proposalContent).toEqual({
        proposalContent: undefined,
        proposalLanguage: undefined,
      });
    });
  });
});
