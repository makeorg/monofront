/* eslint-disable max-classes-per-file */
import { Logger } from '@make.org/utils/services/Logger';
import { v4 as uuidv4 } from 'uuid';
import { env } from '@make.org/assets/env';
import {
  ApiServiceResponse,
  ErrorResponse,
  OptionsType,
} from '@make.org/types';
import axios from 'axios';
import { ApiServiceError } from './ApiServiceError';

declare global {
  interface Window {
    API_URL_CLIENT_SIDE?: string;
  }
}

const HOSTNAME =
  (typeof window !== 'undefined' && window?.location?.hostname) || null;
const LOCATION_PARAMS =
  (typeof window !== 'undefined' && window?.location?.search) || '';

const API_URL: string =
  typeof window !== 'undefined'
    ? env.apiUrlClientSide() || window?.API_URL_CLIENT_SIDE || ''
    : env.apiUrlServerSide() || '';

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
): void => {
  const status = error.response?.status || 0;
  const responseData = error.response?.data || null;
  const url = error.response?.config?.url || requestUrl || 'none';
  const method = error.response?.config?.method || requestMethod || 'none';
  const isServerError = status && status >= 500;
  const isClientOffline =
    typeof window !== 'undefined' && window?.navigator?.onLine === false;
  const uuid = uuidv4();

  let logged;

  switch (true) {
    case isServerError:
      Logger.logError(
        new ApiServiceError(
          `API call error - server error - ${error.message}`,
          status,
          responseData,
          url,
          method,
          uuid,
          false,
          requestId || 'none',
          error?.response?.headers
        )
      );
      logged = true;
      break;
    case isClientOffline:
      Logger.logInfo(
        new ApiServiceError(
          `API call error - client off line - ${error.message}`,
          status,
          responseData,
          url,
          method,
          uuid,
          false,
          requestId || 'none',
          error?.response?.headers
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
          status,
          responseData,
          url,
          method,
          uuid,
          false,
          requestId || 'none',
          error?.response?.headers
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
    requestId || 'none',
    error?.response?.headers
  );
};

class ApiServiceSharedClass {
  // eslint-disable-next-line class-methods-use-this
  callApi(url: string, options: OptionsType): Promise<ApiServiceResponse> {
    const paramsQuery = new URLSearchParams(LOCATION_PARAMS).toString();
    const requestId = uuidv4();
    const defaultHeaders: Readonly<Record<string, string | null>> = {
      'x-hostname': HOSTNAME,
      'x-make-external-id': requestId,
    };

    let headers = { ...defaultHeaders, ...(options.headers || {}) };

    if (paramsQuery) {
      headers = { ...headers, 'x-get-parameters': paramsQuery };
    }

    if (options.allowedHeaders) {
      Object.keys(headers).forEach(key => {
        if (options.allowedHeaders && !options.allowedHeaders.includes(key)) {
          delete headers[key];
        }
      });
    }

    const apiUrl = `${API_URL}${url}`;

    const axiosOptions = {
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
    };

    const response = axios(apiUrl, axiosOptions).catch(error =>
      handleErrors(error, apiUrl, options.method, requestId)
    );

    return response as ApiServiceResponse;
  }
}

export const ApiServiceShared = new ApiServiceSharedClass();
