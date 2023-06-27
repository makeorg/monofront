/* eslint-disable max-classes-per-file */
// import { Logger } from '@make.org/utils/services/Logger';
import { v4 as uuidv4 } from 'uuid';
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
const ALLOWED_GET_PARAMETERS_KEYS: string[] = [
  'source',
  'utm_campaign',
  'utm_content',
  'utm_medium',
  'utm_source',
  'utm_term',
  'country',
  'introCard',
  'pushProposal',
  'question',
  'signUpCard',
  'firstProposal',
  'widgetId',
  'language',
  'questionSlug',
  'hash',
];

export interface Logger {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logError: (val: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logInfo: (val: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logWarning: (val: any) => void;
}

/**
 * handle error for http response
 * @param  {ErrorResponse} error
 * @param {string} apiUrl
 * @param {string} method
 * @return {void}
 */
export const handleErrors = (
  error: ErrorResponse,
  logger: Logger,
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
      logger.logError(
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
      logger.logInfo(
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
      logger.logWarning(
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

export class ApiServiceShared {
  apiIUrl = '';

  logger: Logger;

  // constructor
  constructor(apiUrl: string, logger?: Logger) {
    this.apiIUrl = apiUrl;
    this.logger = logger ?? {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      logError: (val: any) => console.error(val),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      logInfo: (val: any) => console.info(val),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      logWarning: (val: any) => console.warn(val),
    };
  }

  // eslint-disable-next-line class-methods-use-this
  callApi(url: string, options: OptionsType): Promise<ApiServiceResponse> {
    const searchParams = new URLSearchParams(LOCATION_PARAMS);
    const filteredSearchParams = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (ALLOWED_GET_PARAMETERS_KEYS.includes(key)) {
        filteredSearchParams.append(key, value);
      }
    });
    const paramsQuery = filteredSearchParams.toString();
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

    const apiUrl = `${this.apiIUrl}${url}`;

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

    // only fetch permit a really anonymous call (no cookies)
    // but specific axios options are not used
    if (options.withCredentials === false) {
      const body = options.body ? (options.body as string) : undefined;
      const response = fetch(apiUrl, {
        ...axiosOptions,
        credentials: 'omit',
        body,
      }).catch(error =>
        handleErrors(error, this.logger, apiUrl, options.method, requestId)
      );

      return response as ApiServiceResponse;
    }

    const response = axios(apiUrl, axiosOptions).catch(error =>
      handleErrors(error, this.logger, apiUrl, options.method, requestId)
    );

    return response as ApiServiceResponse;
  }
}
