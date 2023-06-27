import {
  QuestionResultsType,
  TrackingConfigurationParamType,
} from '@make.org/types';
import { ExpressApiService } from '@make.org/api/services/ExpressApiService';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { FbEventClientType } from '@make.org/types/FbEvents';
import { LogLevelType } from '@make.org/types/enums/logLevel';
import { DataLog } from '@make.org/logger/loggerNormalizer';
import { Logger } from '@make.org/utils/services/Logger';
import { defaultUnexpectedError } from './DefaultErrorHandler';

const apiService = new ExpressApiService(Logger);

const getResults = async (
  questionSlug: string,
  notFound: () => void = () => null
): Promise<QuestionResultsType | null> => {
  try {
    const response = await apiService.getResults(questionSlug);

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

const log = (data: DataLog, level: LogLevelType): void => {
  apiService.log(data, level).catch(error => {
    // eslint-disable-next-line no-console
    console.error('Fail to log error - ', error);
  });
};

const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

let pendindFbEvents = 0;
const sendFbEventConversion = async (
  eventName: string,
  eventId: string,
  params: TrackingConfigurationParamType,
  url: string | undefined,
  visitorId: string
): Promise<void> => {
  const data: FbEventClientType = {
    event_name: eventName,
    user_data: {
      client_user_agent: navigator.userAgent || navigator.vendor,
      external_id: visitorId,
    },
    event_source_url: url || '',
    event_id: eventId,

    custom_data: params,
  };

  pendindFbEvents += 1;
  if (pendindFbEvents > 100) {
    Logger.logWarning({
      name: 'tracking-facebook',
      message: `More than 100 tasks pending.  Pending: ${pendindFbEvents}`,
    });
  }
  await sleep(3000);
  apiService
    .sendFbEventConversion(data)
    .then(() => {
      pendindFbEvents -= 1;
    })
    .catch(error => {
      pendindFbEvents -= 1;
      Logger.logError(error);
    });
};

/* @todo this service is only used by 'front' app
 * Refactor it to define the service and his layers in the 'front' app
 */
export const ExpressService = {
  getResults,
  log,
  sendFbEventConversion,
};
