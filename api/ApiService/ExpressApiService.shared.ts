/* eslint-disable max-classes-per-file */
import axios, { AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { OptionsType } from '../../types';
import { handleErrors } from './ApiService.shared';

export class ExpressApiServiceSharedError extends Error {
  status?: number;

  data?: any;

  constructor(message: string, status?: number, data?: any) {
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
  callApi(
    url: string,
    options: OptionsType = {}
  ): Promise<void | AxiosResponse> {
    const defaultHeaders = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
    const headers = { ...defaultHeaders, ...(options.headers || {}) };

    const apiUrl = `${url}`;

    return axios(apiUrl, {
      method: options.method,
      headers,
      data: options.body,
      params: options.params,
      withCredentials: false,
      httpsAgent: options.httpsAgent || undefined,
    }).catch(error => handleErrors(error, apiUrl, options.method));
  }
}

export const ExpressApiServiceShared = new ExpressApiServiceSharedClass();
