import { QuestionResultsType } from '@make.org/types';
import { ExpressApiService } from '@make.org/api/ExpressApiService';
import { defaultUnexpectedError } from './DefaultErrorHandler';

const getResults = async (
  questionSlug: string,
  notFound: () => void = () => null
): Promise<QuestionResultsType | null> => {
  try {
    const response = await ExpressApiService.getResults(questionSlug);

    return response ? response.data : null;
  } catch (apiServiceError) {
    if (apiServiceError.status === 404) {
      notFound();

      return null;
    }

    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

export const ExpressService = {
  getResults,
};
