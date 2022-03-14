import { QuestionResultsType } from '@make.org/types';
import { ExpressApiService } from '@make.org/api/ExpressApiService';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { defaultUnexpectedError } from './DefaultErrorHandler';

const getResults = async (
  questionSlug: string,
  notFound: () => void = () => null
): Promise<QuestionResultsType | null> => {
  try {
    const response = await ExpressApiService.getResults(questionSlug);

    return response ? response.data : null;
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

/* @todo this service is only used by 'front' app
 * Delete it when 'results page' is automated
 * Or refactor it to define the service and his layers in the 'front' app
 */
export const ExpressService = {
  getResults,
};
