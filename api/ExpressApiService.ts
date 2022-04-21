import { AxiosResponse } from 'axios';
import { env } from '@make.org/assets/env';
import { FbEventClientType } from '@make.org/types/FbEvents';
import { LogLevelType } from '@make.org/types/enums/logLevel';
import { ExpressApiServiceShared } from './ApiService/ExpressApiService.shared';

const port = env.port() || '';
const host = env.frontUrl() || '';
const PATH_RESULTS_CONFIGURATION = '/api/results/:questionSlug';
const PATH_LOGGER = '/api/logger';
const PATH_FB_EVENT_CONVERSION = '/api/conversion';

/* @todo this service is only used by 'front' app
 * Delete it when 'results page' is automated
 * Or refactor it to define the service and his layers in the 'front' app
 */
export class ExpressApiService {
  static getResults(questionSlug: string): Promise<void | AxiosResponse> {
    return ExpressApiServiceShared.callApi(
      PATH_RESULTS_CONFIGURATION.replace(':questionSlug', questionSlug),
      {
        method: 'GET',
      }
    );
  }

  static log(
    data: unknown,
    level: LogLevelType
  ): Promise<void | AxiosResponse> {
    return ExpressApiServiceShared.callApi(PATH_LOGGER, {
      method: 'POST',
      proxy: {
        host,
        port: parseInt(port, 10),
      },
      body: {
        level: level || 'error',
        data,
      },
    });
  }

  static sendFbEventConversion(
    data: FbEventClientType
  ): Promise<void | AxiosResponse> {
    return ExpressApiServiceShared.callApi(PATH_FB_EVENT_CONVERSION, {
      method: 'POST',
      body: data,
    });
  }
}
