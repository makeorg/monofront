/* eslint-disable no-underscore-dangle */
import { AxiosResponse } from 'axios';
import {
  ApiServiceHeadersType,
  ApiServiceResponse,
  OptionsType,
} from '@make.org/types';
import { IApiServiceStrategy } from './index';
import { ApiServiceShared } from './ApiService.shared';
import { ApiServiceError } from './ApiServiceError';
import { refreshToken } from '../OauthRefresh';

const RETRIES = 5;

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

  _visitorId = '';

  _token: string | null = null;

  _refreshTokenCallback: () => Promise<string> = refreshToken;

  _headersListeners: Map<string, (headers: ApiServiceHeadersType) => void> =
    new Map();

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

  set visitorId(visitorId: string) {
    this._visitorId = visitorId;
  }

  get visitorId(): string {
    return this._sessionId;
  }

  set token(token: string | null) {
    this._token = token;
  }

  get token(): string | null {
    return this._token;
  }

  set refreshTokenCallback(callback: () => Promise<string>) {
    this._refreshTokenCallback = callback;
  }

  get refreshTokenCallback(): () => Promise<string> {
    return this._refreshTokenCallback;
  }

  set headersListener(
    listeners: Map<string, (headers: ApiServiceHeadersType) => void>
  ) {
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

  _generateHeaders(
    optionHeaders?: OptionsType['headers']
  ): ApiServiceHeadersType {
    let headers: ApiServiceHeadersType = {
      ...{
        'x-make-app-name': this._appname,
        'x-make-country': this._country,
        'x-make-language': this._language,
        'x-make-source': this._source,
        'x-make-question-id': this._questionId,
        'x-make-location': this._location,
        'x-make-referrer': this._referrer,
        'x-make-custom-data': this._customData,
        'x-make-url': this._url,
      },
      ...optionHeaders,
    };

    if (this._sessionId) {
      headers = {
        ...headers,
        'x-session-id': this._sessionId,
      };
    }

    if (this._visitorId) {
      headers = {
        ...headers,
        'x-visitor-id': this._visitorId,
      };
    }

    if (this._token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${this._token}`,
      };
    }

    return headers;
  }

  async _retryApiCall(
    url: string,
    options: OptionsType,
    retry = RETRIES
  ): Promise<void | AxiosResponse> {
    const headers: ApiServiceHeadersType = this._generateHeaders(
      options.headers
    );

    try {
      const response = await ApiServiceShared.callApi(url, {
        ...options,
        headers,
      });

      this._headersListeners.forEach(
        (listener: (headers: Readonly<Record<string, string>>) => void) =>
          response?.headers && listener(response?.headers)
      );

      return response;
    } catch (error: unknown) {
      const apiServiceError = error as ApiServiceError;
      this._headersListeners.forEach(
        (listener: (headers: Readonly<Record<string, string>>) => void) =>
          apiServiceError?.headers && listener(apiServiceError?.headers)
      );

      if (apiServiceError?.status === 401 && retry > 0 && this._token) {
        this._token = null;
        this._token = await this._refreshTokenCallback();
        await this._retryApiCall(url, options, 0);
      }

      if (
        (!apiServiceError?.status || apiServiceError?.status > 403) &&
        retry > 0
      ) {
        const sleep = (ms: number): Promise<void> =>
          new Promise(resolve => setTimeout(resolve, ms));

        await sleep((RETRIES - retry) * 500);

        return this._retryApiCall(url, options, retry - 1);
      }

      throw apiServiceError;
    }
  }

  async callApi(
    url: string,
    options: OptionsType
  ): Promise<ApiServiceResponse> {
    const setAttributesFromResponseHeaders = (
      responseHeaders: ApiServiceHeadersType | null | undefined
    ) => {
      if (!responseHeaders) {
        return;
      }

      if (responseHeaders['x-visitor-id']) {
        this._visitorId = responseHeaders['x-visitor-id'];
      }
      if (responseHeaders['x-session-id']) {
        this._sessionId = responseHeaders['x-session-id'];
      }
    };

    try {
      const response = await this._retryApiCall(url, options);
      setAttributesFromResponseHeaders(response?.headers);

      return response;
    } catch (error: unknown) {
      const apiServiceError = error as ApiServiceError;
      setAttributesFromResponseHeaders(apiServiceError?.headers);

      if (apiServiceError.status === 401) {
        this._isLogged = false;
      }

      throw apiServiceError;
    }
  }
}

export const apiClient = new ApiServiceClient();
