/* eslint-disable no-underscore-dangle */
import axiosRetry from 'axios-retry';
import axios, { AxiosResponse } from 'axios';
import { ApiServiceHeadersType, OptionsType } from '@make.org/types';
import { IApiServiceStrategy } from './index';
import { ApiServiceShared } from './ApiService.shared';
import { getLocationContext } from './getLocationContext';
import { ApiServiceError } from './ApiServiceError';

export class ApiServiceClient implements IApiServiceStrategy {
  _appname = '';

  _language = '';

  _country = '';

  _questionId = '';

  _source = '';

  _referrer = '';

  _url = '';

  _location = '';

  _customData = '';

  _isLogged = false;

  _sessionId = '';

  _headersListeners: any = new Map();

  constructor() {
    this._referrer =
      typeof window !== 'undefined' && !!window.document.referrer
        ? window.document.referrer
        : '';
  }

  set appname(appname: string) {
    this._appname = appname;
  }

  get appname(): string {
    return this._appname;
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

  set location(location: string) {
    this._location = location;
  }

  get location(): string {
    return this._location;
  }

  set url(url: string) {
    this._url = url;
  }

  get url(): string {
    return this._url;
  }

  set customData(customData: string) {
    this._customData = customData;
  }

  get customData(): string {
    return this._customData;
  }

  set sessionId(sessionId: string) {
    this._sessionId = sessionId;
  }

  get sessionId(): string {
    return this._sessionId;
  }

  set headersListener(listeners: Map<string, string>) {
    this._headersListeners = listeners;
  }

  addHeadersListener(
    identifier: string,
    listener: (headers: ApiServiceHeadersType) => void
  ): void {
    this._headersListeners.set(identifier, listener);
  }

  removeHeadersListener(identifier: string): void {
    this._headersListeners.delete(identifier);
  }

  callApi(url: string, options: OptionsType): Promise<void | AxiosResponse> {
    const defaultHeaders = {
      'x-make-app-name': this._appname,
      'x-make-country': this._country,
      'x-make-language': this._language,
      'x-make-source': this._source,
      'x-make-question-id': this._questionId,
      'x-make-location': getLocationContext(
        typeof window !== 'undefined' ? window.location.pathname : '',
        this._questionId,
        options.proposalId || ''
      ),
      'x-make-referrer': this._referrer,
      'x-make-custom-data': this._customData,
      'x-session-id': this._sessionId,
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

      response
        .then(res => {
          const sessionId = res?.headers && res?.headers['x-session-id'];
          if (sessionId) {
            this._sessionId = sessionId;
          }

          this._headersListeners.forEach(
            (listener: (headers: Readonly<Record<string, string>>) => void) =>
              listener(res && res.headers)
          );
        })
        .catch(apiServiceError => {
          this._headersListeners.forEach(
            (listener: (headers: Readonly<Record<string, string>>) => void) => {
              if (apiServiceError.headers) {
                listener(apiServiceError.headers);
              }
            }
          );
        });
      return response;
    } catch (error: unknown) {
      const apiServiceError = error as ApiServiceError;
      if (apiServiceError.status === 401) {
        this._isLogged = false;
      }
      throw apiServiceError;
    }
  }
}

export const apiClient = new ApiServiceClient();
