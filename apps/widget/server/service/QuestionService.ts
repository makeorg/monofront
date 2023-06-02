import { QuestionType } from '@make.org/types/Question';
import { QuestionApiService } from '@make.org/api/services/QuestionApiService';
import cache from 'memory-cache';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { getLoggerInstance } from '@make.org/logger';

const clearCache = (): void => {
  cache.clear();
};

const getQuestion = async (
  questionIdOrSlug: string,
  country: string,
  notFound: () => void,
  unexpectedError: () => void,
  preferredLanguage: string
): Promise<QuestionType | void> => {
  const upperCountry = country.toUpperCase();
  const handleData = (data: QuestionType) => {
    if (!data.countries?.includes(upperCountry) || !data) {
      return notFound();
    }

    return data;
  };

  const CACHE_KEY = `QUESTION_${questionIdOrSlug}`;
  const content = cache.get(CACHE_KEY);
  if (content) {
    return handleData(content);
  }

  try {
    const response = await QuestionApiService.getDetail(
      questionIdOrSlug,
      preferredLanguage,
      {
        'x-make-question-id': questionIdOrSlug,
        'x-make-country': upperCountry,
        'x-make-client-language': preferredLanguage,
      }
    );
    const formattedResponse = response && {
      ...response.data,
      returnedLanguage:
        response.data.returnedLanguage || response.data.language,
    };
    // 900,000 milliseconds = 5 minutes
    cache.put(CACHE_KEY, formattedResponse, 900000);

    return handleData(formattedResponse);
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 404) {
      return notFound();
    }
    getLoggerInstance().logError(apiServiceError);

    return unexpectedError();
  }
};

export const QuestionService = {
  getQuestion,
  clearCache,
};
