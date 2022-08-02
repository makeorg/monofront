/* eslint-disable max-classes-per-file */
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { ApiServiceResponse, OptionsType } from '@make.org/types';
import { handleErrors } from './ApiService.shared';

export class ExpressApiServiceSharedError extends Error {
  status?: number;

  data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ExpressApiServiceSharedError);
    }
  }
}

axiosRetry(axios, {
  retries: 5,
  retryDelay: retryCount => retryCount * 100,
});

class ExpressApiServiceSharedClass {
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
    }).catch(error => handleErrors(error, apiUrl, options.method));

    return response as ApiServiceResponse;
  }
}

export const ExpressApiServiceShared = new ExpressApiServiceSharedClass();
