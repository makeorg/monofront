/* eslint-disable no-underscore-dangle */
import axiosRetry from 'axios-retry';
import axios, { AxiosResponse } from 'axios';
import { IApiServiceStrategy } from './index';
import { ApiServiceShared } from './ApiService.shared';
import { getLocationContext } from './getLocationContext';

export class ApiServiceClient implements IApiServiceStrategy {
  _language = '';

  _country = '';

  _questionId = '';

  _source = '';

  _referrer = '';

  _url = '';

  _location = '';

  _customData = '';

  _isLogged = false;

  _headersListeners: any = new Map();

  constructor() {
    this._referrer =
      typeof window !== 'undefined' && !!window.document.referrer
        ? window.document.referrer
        : '';
  }

  set language(language: string) {
    this._language = language;
  }

  get language(): string {
    return this._language;
  }

  set country(country: string) {
    this._country = country;
  }

  get country(): string {
    return this._country;
  }

  set questionId(questionId: string) {
    this._questionId = questionId;
  }

  get questionId(): string {
    return this._questionId;
  }

  set isLogged(isLogged: boolean) {
    this._isLogged = isLogged;
  }

  get isLogged(): boolean {
    return this._isLogged;
  }

  set source(source: string) {
    this._source = source;
  }

  get source(): string {
    return this._source;
  }

  set referrer(referrer: string) {
    this._referrer = referrer;
  }

  get referrer(): string {
    return this._referrer;
  }

  set customData(customData: string) {
    this._customData = customData;
  }

  get customData(): string {
    return this._customData;
  }

  set headersListener(listeners: Map<string, string>) {
    this._headersListeners = listeners;
  }

  set url(url: string) {
    this._url = url;
  }

  get url(): string {
    return this._url;
  }

  set location(location: string) {
    this._location = location;
  }

  get location(): string {
    return this._location;
  }

  addHeadersListener(identifier: string, listener: string): void {
    this._headersListeners.set(identifier, listener);
  }

  removeHeadersListener(identifier: string): void {
    this._headersListeners.delete(identifier);
  }

  callApi(
    url: string,
    options: { proposalId?: string; headers?: Readonly<Record<string, string>> }
  ): Promise<void | AxiosResponse> {
    const defaultHeaders = {
      'x-make-country': this._country,
      'x-make-language': this._language,
      'x-make-source': this._source,
      'x-make-question-id': this._questionId,
      'x-make-location': getLocationContext(
        window.location.pathname,
        this._questionId,
        options.proposalId || ''
      ),
      'x-make-referrer': this._referrer,
      'x-make-custom-data': this._customData,
    };

    const headers = { ...defaultHeaders, ...(options.headers || {}) };

    axiosRetry(axios, {
      retries: 5,
      retryDelay: retryCount => retryCount * 100,
      retryCondition: error =>
        axiosRetry.isNetworkOrIdempotentRequestError(error) ||
        (error.response && error.response.status === 401 && this._isLogged) ||
        false,
    });

    try {
      const response = ApiServiceShared.callApi(url, {
        ...options,
        headers,
      });

      response.then(res =>
        this._headersListeners.forEach(
          (listener: (headers: Readonly<Record<string, string>>) => void) =>
            listener(res && res.headers)
        )
      );

      return response;
    } catch (apiServiceError) {
      if (apiServiceError.status === 401) {
        this._isLogged = false;
      }
      throw apiServiceError;
    }
  }
}

export const apiClient = new ApiServiceClient();
