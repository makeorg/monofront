import { QuestionType } from '@make.org/types/Question';
import { QuestionApiService } from '@make.org/api/services/QuestionApiService';
import NodeCache from 'node-cache';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import hash from 'object-hash';
import { ServerLogger } from '@make.org/logger/serverLogger';

const cache = new NodeCache({ stdTTL: 900 });
const clearCache = (): void => {
  cache.flushAll();
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
  const args = [
    questionIdOrSlug,
    preferredLanguage,
    {
      'x-make-question-id': questionIdOrSlug,
      'x-make-country': upperCountry,
      'x-make-client-language': preferredLanguage,
    },
  ] as const;

  const CACHE_KEY = hash(['GET_DETAILS', ...args]);
  const content: QuestionType | undefined = cache.get(CACHE_KEY);
  if (content) {
    return handleData(content);
  }

  try {
    const response = await QuestionApiService.getDetail(...args);
    const formattedResponse = response && {
      ...response.data,
      returnedLanguage:
        response.data.returnedLanguage || response.data.language,
    };
    // 900,000 milliseconds = 5 minutes
    cache.set(CACHE_KEY, formattedResponse);

    return handleData(formattedResponse);
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 404) {
      return notFound();
    }
    ServerLogger.getInstance().logError(apiServiceError);

    return unexpectedError();
  }
};

export const QuestionService = {
  getQuestion,
  clearCache,
};
