import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { QuestionApiService } from '@make.org/api/QuestionApiService';
import {
  QuestionType,
  QuestionPartnerType,
  HomeQuestionType,
  QuestionKeywordType,
  PersonalityType,
  TagType,
  ProposalType,
} from '@make.org/types';
import { defaultUnexpectedError } from './DefaultErrorHandler';
import { Logger } from './Logger';

const getQuestions = async (
  country: string,
  status?: string,
  sortAlgorithm?: string,
  limit?: number,
  skip?: number
): Promise<{ total: number; results: HomeQuestionType[] } | null> => {
  try {
    const response = await QuestionApiService.getQuestions(
      country,
      status,
      sortAlgorithm,
      limit,
      skip
    );

    return response ? response.data : null;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);
    return null;
  }
};

const getDetail = async (
  questionSlugOrId: string,
  notFound: () => void = () => null,
  country?: string
): Promise<QuestionType | null> => {
  try {
    const response = await QuestionApiService.getDetail(questionSlugOrId);
    const { data } = response || {};
    if (country !== undefined && !data?.countries?.includes(country)) {
      notFound();
      Logger.logError({
        message: `Country : ${country} is not defined or available for question : ${questionSlugOrId}. Available countries in question are : ${data.countries}`,
        name: 'services',
      });

      return null;
    }

    return data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 404) {
      notFound();

      return null;
    }

    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const searchQuestions = async (
  country: string,
  language: string,
  content: string
): Promise<{ total: number; results: QuestionType[] } | null> => {
  try {
    const response = await QuestionApiService.searchQuestions(
      country,
      language,
      content
    );
    const { data } = response || {};

    return data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getQuestionPopularTags = async (
  questionId: string,
  limit?: number,
  skip?: number
): Promise<TagType[] | null> => {
  try {
    const response = await QuestionApiService.getQuestionPopularTags(
      questionId,
      limit,
      skip
    );
    const { data } = response || {};

    return data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getQuestionPartners = async (
  questionId: string,
  partnerKind: string,
  sortAlgorithm?: string,
  limit?: number,
  skip?: number
): Promise<{ total: number; results: QuestionPartnerType[] } | null> => {
  try {
    const response = await QuestionApiService.getQuestionPartners(
      questionId,
      partnerKind,
      sortAlgorithm,
      limit,
      skip
    );
    const { data } = response || {};

    return data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getQuestionPersonalities = async (
  questionId: string,
  personalityRole?: string,
  limit?: number,
  skip?: number
): Promise<{ total: number; results: PersonalityType[] } | null> => {
  try {
    const response = await QuestionApiService.getQuestionPersonalities(
      questionId,
      personalityRole,
      limit,
      skip
    );
    const { data } = response || {};

    return data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getFeaturedProposals = async (
  questionId: string,
  maxPartnerProposals: number,
  limit: number,
  seed?: number
): Promise<{ total: number; results: ProposalType[] } | null> => {
  try {
    const response = await QuestionApiService.getFeaturedProposals(
      questionId,
      maxPartnerProposals,
      limit,
      seed
    );
    const { data } = response || {};

    return data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getQuestionKeywords = async (
  questionId: string,
  limit: number
): Promise<QuestionKeywordType[] | null> => {
  try {
    const response = await QuestionApiService.getKeywords(questionId, limit);
    const { data } = response || {};

    return data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

export const QuestionService = {
  getQuestions,
  getDetail,
  searchQuestions,
  getQuestionPopularTags,
  getQuestionPartners,
  getQuestionPersonalities,
  getFeaturedProposals,
  getQuestionKeywords,
};
