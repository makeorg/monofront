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

const QUESTION_STATUS_OPEN = 'open';
const QUESTION_STATUS_FINISHED = 'finished';
const QUESTION_SORT_FEATURED = 'featured';
const QUESTION_SORT_CHRONOLOGICAL = 'chronological';

const getQuestions = async (
  country: string,
  preferedLanguage: string,
  status?: string,
  sortAlgorithm?: string,
  limit?: number,
  skip?: number
): Promise<{ total: number; results: HomeQuestionType[] } | null> => {
  try {
    const response = await QuestionApiService.getQuestions(
      country,
      preferedLanguage,
      status,
      sortAlgorithm,
      limit,
      skip
    );

    if (!response) {
      return null;
    }

    // @todo clean when API updated (this line is used to handle retrocompat for future deprecated language)

    return {
      ...response.data,
      returnedLanguage:
        response.data.returnedLanguage || response.data.language,
    };
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);
    return null;
  }
};

const getOpenedConsultations = async (
  country: string,
  preferedLanguage: string,
  limit?: number,
  skip?: number
): Promise<{ total: number; results: HomeQuestionType[] } | null> =>
  getQuestions(
    country,
    preferedLanguage,
    QUESTION_STATUS_OPEN,
    QUESTION_SORT_FEATURED,
    limit,
    skip
  );

const getFinishedConsultations = async (
  country: string,
  preferedLanguage: string,
  limit?: number,
  skip?: number
): Promise<{ total: number; results: HomeQuestionType[] } | null> =>
  getQuestions(
    country,
    preferedLanguage,
    QUESTION_STATUS_FINISHED,
    QUESTION_SORT_CHRONOLOGICAL,
    limit,
    skip
  );

const getDetail = async (
  questionSlugOrId: string,
  preferedLanguage: string,
  // eslint-disable-next-line default-param-last
  notFound: () => void = () => null,
  country?: string
): Promise<QuestionType | null> => {
  try {
    const response = await QuestionApiService.getDetail(
      questionSlugOrId,
      preferedLanguage
    );
    const { data } = response || {};
    if (
      country !== undefined &&
      !data?.countries?.includes(country.toUpperCase())
    ) {
      notFound();
      Logger.logError({
        message: `Country : ${country.toUpperCase()} is not defined or available for question : ${questionSlugOrId}. Available countries in question are : ${
          data.countries
        }`,
        name: 'services',
      });

      return null;
    }

    if (!response) {
      return null;
    }

    // @todo clean when API updated (this line is used to handle retrocompat for future deprecated language)

    return {
      ...response.data,
      returnedLanguage:
        response.data.returnedLanguage || response.data.language,
    };
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
  content: string,
  preferedLanguage: string
): Promise<{ total: number; results: QuestionType[] } | null> => {
  try {
    const response = await QuestionApiService.searchQuestions(
      country,
      content,
      preferedLanguage
    );
    if (!response) {
      return null;
    }

    // @todo clean when API updated (this line is used to handle retrocompat for future deprecated language)

    return {
      ...response.data,
      returnedLanguage:
        response.data.returnedLanguage || response.data.language,
    };
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
  getOpenedConsultations,
  getFinishedConsultations,
  getDetail,
  searchQuestions,
  getQuestionPopularTags,
  getQuestionPartners,
  getQuestionPersonalities,
  getFeaturedProposals,
  getQuestionKeywords,
};
