import {
  QuestionResultsType,
  TrackingConfigurationParamType,
} from '@make.org/types';
import { ExpressApiService } from '@make.org/api/ExpressApiService';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { FbEventClientType } from '@make.org/types/FbEvents';
import { trackingParamsService } from '@make.org/utils/services/TrackingParamsService';
import { LogLevelType } from '@make.org/types/enums/logLevel';
import { defaultUnexpectedError } from './DefaultErrorHandler';
import { Logger } from './Logger';

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

const log = (
  data: ApiServiceError | Error | { [key: string]: string } | string,
  level: LogLevelType
): void => {
  ExpressApiService.log(Logger.normalizeData(data), level).catch(error => {
    // eslint-disable-next-line no-console
    console.error('Fail to log error - ', error);
  });
};

const sendFbEventConversion = (
  eventName: string,
  eventId: string,
  params: TrackingConfigurationParamType,
  url: string | undefined,
  visitorId: string
): void => {
  const data: FbEventClientType = {
    event_name: eventName,
    user_data: {
      client_user_agent: navigator.userAgent || navigator.vendor,
      external_id: trackingParamsService.visitorId,
    },
    event_source_url: trackingParamsService.url || '',
    event_id: eventId,

    custom_data: params,
  };

  ExpressApiService.sendFbEventConversion(data)
    .catch(error => {
      Logger.logError(error);
    })
    .then(res => console.log(res));
};

/* @todo this service is only used by 'front' app
 * Refactor it to define the service and his layers in the 'front' app
 */
export const ExpressService = {
  getResults,
  log,
  sendFbEventConversion,
};
