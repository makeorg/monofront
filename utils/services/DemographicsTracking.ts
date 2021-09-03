import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { DemographicsTrackingApiService } from '@make.org/api/DemographicsTrackingApiService';
import { DemographicNameType } from '@make.org/types';
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

export const track = async (
  name: DemographicNameType,
  value: string,
  parameters: { [n: string]: string } = {},
  success: () => void,
  error?: () => void
): Promise<void> => {
  try {
    await DemographicsTrackingApiService.track(
      name,
      value,
      sanitizeQueryParams(parameters)
    );
    success();
  } catch (e: unknown) {
    const apiServiceError = e as ApiServiceError;
    defaultUnexpectedError(apiServiceError);
    if (error) {
      error();
    }
  }
};

export const DemographicsTrackingService = {
  track,
};
