/* eslint-disable no-underscore-dangle */
import { ApiServiceResponse, OptionsType } from '@make.org/types';
import https from 'https';
import { ApiServiceShared } from './ApiService.shared';
import { IApiServiceStrategy } from './index';

export class ApiServiceServer implements IApiServiceStrategy {
  _apiServiceShared;

  _country = '';

  _language = '';

  _source = '';

  _questionId = '';

  _referrer = '';

  get country(): string {
    return this._country;
  }

  get language(): string {
    return this._language;
  }

  get source(): string {
    return this._source;
  }

  get questionId(): string {
    return this._questionId;
  }

  get referrer(): string {
    return this._referrer;
  }

  // constructor
  constructor(apiUrl: string) {
    this._apiServiceShared = new ApiServiceShared(apiUrl);
  }

  // eslint-disable-next-line class-methods-use-this
  callApi(url: string, options: OptionsType): Promise<ApiServiceResponse> {
    const headers = {
      ...options.headers,
    };

    const agent: https.Agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const serverOptions = { httpsAgent: agent, ...options };

    return this._apiServiceShared.callApi(url, {
      ...serverOptions,
      headers,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  removeToken(): void {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line class-methods-use-this
  setToken(token: string): void {
    throw new Error('Method not implemented.');
  }
}
