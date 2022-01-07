/* eslint-disable no-underscore-dangle */
import { ApiServiceResponse, OptionsType } from '@make.org/types';
import https from 'https';
import { ApiServiceShared } from './ApiService.shared';
import { IApiServiceStrategy } from './index';

export class ApiServiceServer implements IApiServiceStrategy {
  // eslint-disable-next-line class-methods-use-this
  callApi(url: string, options: OptionsType): Promise<ApiServiceResponse> {
    const headers = {
      ...options.headers,
    };

    const agent: https.Agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const serverOptions = { httpsAgent: agent, ...options };

    return ApiServiceShared.callApi(url, {
      ...serverOptions,
      headers,
    });
  }

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
}

export const apiServer = new ApiServiceServer();
