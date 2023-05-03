import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { ProposalType, ProposalsType, ReportReasonType } from '@make.org/types';
import { ProposalApiService } from '@make.org/api/ProposalApiService';
import { defaultUnexpectedError } from '@make.org/utils/services/DefaultErrorHandler';

export type TypeReason =
  | 'Inintelligible'
  | 'BadTranslation'
  | 'IncorrectInformation'
  | 'Offensive';

const propose = async (
  content: string,
  questionId: string,
  language: string,
  country: string,
  isAnonymous: boolean,
  success?: () => void,
  failure?: () => void
): Promise<void> => {
  try {
    await ProposalApiService.propose(
      content.trim(),
      questionId,
      language,
      country,
      isAnonymous
    );
    if (success) {
      success();
    }
  } catch (error: unknown) {
    if (failure) {
      failure();
      return;
    }

    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);
  }
};

const report = async (
  proposalId: string,
  reason: ReportReasonType,
  proposalLanguage: string,
  success?: () => void,
  failure?: (error: Error) => void
): Promise<void> => {
  try {
    await ProposalApiService.report(proposalId, reason, proposalLanguage);
    if (success) {
      success();
    }
  } catch (error: unknown) {
    if (failure) {
      failure(error as Error);
    }
    const apiServiceError = error as ApiServiceError;

    defaultUnexpectedError(apiServiceError);
  }
};

const getProposal = async (
  proposalId: string,
  preferredLanguage: string
): Promise<ProposalType | null> => {
  try {
    const response = await ProposalApiService.getProposal(
      proposalId,
      preferredLanguage
    );

    return response && response.data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const searchProposals = async (
  country: string,
  preferredLanguage: string,
  questionId?: string,
  content?: string,
  tagsIds?: string,
  seed?: number,
  limit?: number,
  skip?: number,
  sort?: string,
  order?: string,
  ideaIds?: string,
  sortAlgorithm?: string,
  keywords?: string,
  isNotVoted?: boolean,
  userType?: string
): Promise<ProposalsType | null> => {
  try {
    const response = await ProposalApiService.searchProposals(
      country,
      preferredLanguage,
      questionId,
      content,
      tagsIds,
      seed,
      limit,
      skip,
      sort,
      order,
      ideaIds,
      sortAlgorithm,
      keywords,
      isNotVoted,
      userType
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
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

export const ProposalService = {
  propose,
  getProposal,
  searchProposals,
  report,
};
