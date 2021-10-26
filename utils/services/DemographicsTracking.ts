import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { DemographicsTrackingApiService } from '@make.org/api/DemographicsTrackingApiService';
import { defaultUnexpectedError } from './DefaultErrorHandler';

const PREFIX_QUERY_PARAMS_ACCEPTED = 'utm_';

const sanitizeQueryParams = (queryParams: { [n: string]: string }) => {
  const queryParamSanitized: { [n: string]: string } = {};
  Object.keys(queryParams).forEach((key: string) => {
    if (key.startsWith(PREFIX_QUERY_PARAMS_ACCEPTED)) {
      queryParamSanitized[key] = queryParams[key];
    }
  });

  return queryParamSanitized;
};

export const trackUnsecure = async (
  name: string,
  value: string,
  questionId: string,
  source: string,
  parameters: { [n: string]: string },
  success: () => void,
  error: () => void
): Promise<void> => {
  try {
    await DemographicsTrackingApiService.trackUnsecure(
      name,
      value,
      questionId,
      source,
      sanitizeQueryParams(parameters)
    );
    success();
  } catch (e) {
    const apiServiceError = e as ApiServiceError;
    defaultUnexpectedError(apiServiceError);
    error();
  }
};

export const track = async (
  demographicsCardId: string,
  token: string,
  value: string,
  questionId: string,
  source: string,
  parameters: { [n: string]: string },
  success: () => void,
  error: (message: string, data: unknown) => void
): Promise<void> => {
  try {
    await DemographicsTrackingApiService.track(
      demographicsCardId,
      token,
      value,
      questionId,
      source,
      sanitizeQueryParams(parameters)
    );
    success();
  } catch (e) {
    const apiServiceError = e as ApiServiceError;
    if (apiServiceError.status === 400) {
      error(apiServiceError.message, apiServiceError.data);
      return;
    }

    defaultUnexpectedError(apiServiceError);
    error(apiServiceError.message, null);
  }
};

export const DemographicsTrackingService = {
  track,
  trackUnsecure,
};
