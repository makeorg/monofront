import { QuestionType } from '@make.org/types/Question';
import { QuestionApiService } from '@make.org/api/QuestionApiService';
import cache from 'memory-cache';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { getLoggerInstance } from '@make.org/utils/helpers/logger';

const clearCache = (): void => {
  cache.clear();
};

const getQuestion = async (
  questionIdOrSlug: string,
  country: string,
  language: string,
  notFound: () => void,
  unexpectedError: () => void
): Promise<QuestionType | void> => {
  const handleData = (data: QuestionType) => {
    if (!data.countries?.includes(country) || !data) {
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
    const response = await QuestionApiService.getDetail(questionIdOrSlug, {
      'x-make-question-id': questionIdOrSlug,
      'x-make-country': country,
      'x-make-language': language,
    });

    // 900,000 milliseconds = 5 minutes
    cache.put(CACHE_KEY, response && response.data, 900000);

    return handleData(response && response.data);
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 404) {
      return notFound();
    }
    getLoggerInstance().logError(
      apiServiceError.clone(
        `error in server/service/QuestionService/getQuestion: ${apiServiceError.message}`
      )
    );

    return unexpectedError();
  }
};

export const QuestionService = {
  getQuestion,
  clearCache,
};
