/* eslint-disable max-classes-per-file */
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { Logger } from '@make.org/utils/services/Logger';
import { APP_NAME } from '@make.org/utils/constants/config';
import { v4 as uuidv4 } from 'uuid';
import { env } from '@make.org/assets/env';
import { ErrorResponse } from '@make.org/types';
import { ApiServiceError } from './ApiServiceError';

const HOSTNAME = (typeof window !== 'undefined' && window?.location?.hostname) || null;

const LOCATION_PARAMS = (typeof window !== 'undefined' && window?.location?.search) || '';

const API_URL = env.apiUrl();

axiosRetry(axios, {
  retries: 5,
  retryDelay: (retryCount) => retryCount * 100,
});

/**
 * handle error for http response
 * @param  {ErrorResponse} error
 * @param {string} apiUrl
 * @param {string} method
 * @return {void}
 */
export const handleErrors = (
  error: ErrorResponse,
  requestUrl?: string,
  requestMethod?: string,
  requestId?: string
) => {
  const status = error.response?.status || 0;
  const responseData = error.response?.data || null;
  const url = error.response?.config?.url || requestUrl || 'none';
  const method = error.response?.config?.method || requestMethod || 'none';
  const isNetworkError = !!error.isAxiosError && !error.response;
  const isServerError = status && status >= 500;
  const isClientOffline = typeof window !== 'undefined' && window?.navigator?.onLine === false;
  const uuid = uuidv4();

  let logged;

  const commonArguments = [
    status,
    responseData,
    url,
    method,
    uuid,
    false,
    requestId || 'none',
  ];

  switch (true) {
    case isServerError:
      Logger.logError(
        new ApiServiceError(
          `API call error - server error - ${error.message}`,
          ...commonArguments
        )
      );
      logged = true;
      break;
    case isClientOffline:
      Logger.logInfo(
        new ApiServiceError(
          `API call error - client off line - ${error.message}`,
          ...commonArguments
        )
      );
      logged = true;
      break;
    case isNetworkError:
      Logger.logError(
        new ApiServiceError(
          `API call error - no response - ${error.message}`,
          ...commonArguments
        )
      );
      logged = true;
      break;
    case !error.response:
      Logger.logError(
        new ApiServiceError(
          `API call error - not axios error - ${error.message}`,
          ...commonArguments
        )
      );
      logged = true;
      break;
    case !error.request:
      Logger.logWarning(
        new ApiServiceError(
          `API call error - no request - ${error.message} - ${JSON.stringify(
            error
          )}`,
          ...commonArguments
        )
      );
      logged = true;
      break;
    default:
      logged = false;
  }

  throw new ApiServiceError(
    error.message,
    status,
    responseData,
    url,
    method,
    uuid,
    logged,
    requestId || 'none'
  );
};

class ApiServiceSharedClass {
  // eslint-disable-next-line class-methods-use-this
  callApi(url: string, options: any = {}): Promise<any> {
    const paramsQuery = new URLSearchParams(LOCATION_PARAMS).toString();
    const requestId = uuidv4();
    const defaultHeaders = {
      'x-hostname': HOSTNAME,
      'x-make-app-name': APP_NAME,
      'x-make-location': 'core',
      'x-make-external-id': requestId,
    };

    let headers = { ...defaultHeaders, ...(options.headers || {}) };

    if (paramsQuery) {
      headers = { ...headers, 'x-get-parameters': paramsQuery };
    }

    if (options.allowedHeaders) {
      Object.keys(headers).forEach((key) => {
        if (!options.allowedHeaders.includes(key)) {
          delete headers[key];
        }
      });
    }

    const apiUrl = `${API_URL}${url}`;

    return axios(apiUrl, {
      method: options.method,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        ...headers,
      },
      data: options.body,
      params: options.params,
      withCredentials:
        options.withCredentials !== undefined ? options.withCredentials : true,
      httpsAgent: options.httpsAgent || undefined,
    }).catch((error) => handleErrors(error, apiUrl, options.method, requestId));
  }
}

export const ApiServiceShared = new ApiServiceSharedClass();
