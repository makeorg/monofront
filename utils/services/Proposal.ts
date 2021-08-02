import { getBaitText } from '@make.org/utils/constants/proposal';
import { ProposalType, ProposalsType } from '@make.org/types';
import { ProposalApiService } from '@make.org/api/ProposalApiService';
import { defaultUnexpectedError } from './DefaultErrorHandler';

// @todo remove with DepreactedProposalSubmit
const deprecatedPropose = async (
  content: string,
  questionId: string,
  success: () => void,
  unexpectedError: () => void
): Promise<void> => {
  const proposalContent = getBaitText() + content;

  ProposalApiService.propose(proposalContent, questionId)
    .then(success)
    .catch(apiServiceError => {
      defaultUnexpectedError(apiServiceError);
      unexpectedError();
    });
};

const propose = async (content: string, questionId: string): Promise<void> => {
  try {
    await ProposalApiService.propose(content.trim(), questionId);
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);
  }
};

const getProposal = async (
  proposalId: string
): Promise<ProposalType | null> => {
  try {
    const response = await ProposalApiService.getProposal(proposalId);

    return response && response.data;
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getPopularProposals = async (
  questionId: string
): Promise<ProposalType | null> => {
  try {
    const response = await ProposalApiService.getPopularProposals(questionId);

    return response && response.data;
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const searchProposals = async (
  country: string,
  questionId?: string,
  tagsIds?: string,
  seed?: number,
  limit = 20,
  skip = 0,
  sortTypeKey?: string,
  content?: string,
  ideaIds?: string,
  order?: string
): Promise<ProposalsType | null> => {
  try {
    const response = await ProposalApiService.searchProposals(
      country,
      questionId,
      tagsIds,
      seed,
      limit,
      skip,
      sortTypeKey,
      content,
      ideaIds,
      order
    );
    if (!response) {
      return null;
    }

    const { data } = response;
    // @toDo: hack multi-countries
    const { results } = data;

    const updateCountry = (proposal: ProposalType) => ({
      ...proposal,
      question: proposal.question,
    });

    return {
      ...data,
      results: results.map((proposal: ProposalType) => updateCountry(proposal)),
    };
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

export const ProposalService = {
  // @todo remove with DepreactedProposalSubmit
  deprecatedPropose,
  propose,
  getProposal,
  getPopularProposals,
  searchProposals,
};
