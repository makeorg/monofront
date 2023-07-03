import axios, { AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { env } from '@make.org/assets/env';
import { FbEventClientType } from '@make.org/types/FbEvents';
import { LogLevelType } from '@make.org/types/enums/logLevel';
import { ApiServiceResponse, OptionsType } from '@make.org/types';
import { handleErrors } from '../ApiService/ApiService.shared';

const port = env.port() || '';
const host = env.frontUrl() || '';
const PATH_RESULTS_CONFIGURATION = '/api/question/:questionId/results';
const PATH_LOGGER = '/api/logger';
const PATH_FB_EVENT_CONVERSION = '/api/conversion';

axiosRetry(axios, {
  retries: 5,
  retryDelay: retryCount => retryCount * 100,
});

interface Logger {
  logInfo: (v: any) => void;
  logError: (v: any) => void;
  logWarning: (v: any) => void;
}

/* @todo this service is only used by 'front' app
 * Delete it when 'results page' is automated
 * Or refactor it to define the service and his layers in the 'front' app
 */
export class ExpressApiService {
  logger: Logger;

  constructor(logger?: Logger) {
    this.logger = logger ?? {
      logInfo: (v: any): void => console.log(v),
      logError: (v: any): void => console.error(v),
      logWarning: (v: any): void => console.warn(v),
    };
  }

  // eslint-disable-next-line class-methods-use-this
  callApi(url: string, options: OptionsType): Promise<ApiServiceResponse> {
    const defaultHeaders = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
    const headers = { ...defaultHeaders, ...(options.headers || {}) };

    const apiUrl = `${url}`;

    const response = axios(apiUrl, {
      method: options.method,
      headers,
      data: options.body,
      params: options.params,
      withCredentials: false,
      httpsAgent: options.httpsAgent || undefined,
    }).catch(error => handleErrors(error, this.logger, apiUrl, options.method));

    return response as ApiServiceResponse;
  }

  getResultsFromContentApi(questionId: string): Promise<void | AxiosResponse> {
    return this.callApi(
      PATH_RESULTS_CONFIGURATION.replace(':questionId', questionId),
      {
        method: 'GET',
      }
    );
  }

  getResults(questionId: string): Promise<void | AxiosResponse> {
    return this.callApi(
      PATH_RESULTS_CONFIGURATION.replace(':questionId', questionId),
      {
        method: 'GET',
      }
    );
  }

  log(data: unknown, level: LogLevelType): Promise<void | AxiosResponse> {
    return this.callApi(PATH_LOGGER, {
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

  sendFbEventConversion(
    data: FbEventClientType
  ): Promise<void | AxiosResponse> {
    return this.callApi(PATH_FB_EVENT_CONVERSION, {
      method: 'POST',
      body: data,
    });
  }
}
