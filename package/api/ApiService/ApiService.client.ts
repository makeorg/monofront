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

class ApiServiceClient implements IApiServiceStrategy {
  _appname = '';

  _language = '';

  _country = '';

  _source = '';

  _referrer = '';

  _url = '';

  _location = '';

  _customData = '';

  _sessionId = '';

  _visitorId = '';

  _customHeaders = {};

  _token: string | null = null;

  _refreshTokenCallback: () => Promise<string> = refreshToken;

  _beforeCallListeners: Map<
    string,
    (url: string, options: OptionsType) => Promise<void>
  > = new Map();

  _afterCallListeners: Map<
    string,
    (
      url: string,
      options: Readonly<OptionsType>,
      responseHeaders: Readonly<ApiServiceHeadersType>
    ) => Promise<void>
  > = new Map();

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
    return this._visitorId;
  }

  set token(token: string | null) {
    this._token = token;
  }

  get token(): string | null {
    return this._token;
  }

  set customHeaders(headers: Record<string, string>) {
    this._customHeaders = headers;
  }

  get customHeaders(): Record<string, string> {
    return this._customHeaders;
  }

  set refreshTokenCallback(callback: () => Promise<string>) {
    this._refreshTokenCallback = callback;
  }

  get refreshTokenCallback(): () => Promise<string> {
    return this._refreshTokenCallback;
  }

  set beforeCallListener(listeners: Map<string, () => Promise<void>>) {
    this._beforeCallListeners = listeners;
  }

  set afterCallListener(listeners: Map<string, () => Promise<void>>) {
    this._afterCallListeners = listeners;
  }

  addbeforeCallListener(
    identifier: string,
    listener: (url: string, options: OptionsType) => Promise<void>
  ): void {
    this._beforeCallListeners.set(identifier, listener);
  }

  addAfterCallListener(
    identifier: string,
    listener: (
      url: string,
      options: Readonly<OptionsType>,
      responseHeaders: Readonly<ApiServiceHeadersType>
    ) => Promise<void>
  ): void {
    this._afterCallListeners.set(identifier, listener);
  }

  removeBeforeCallListener(identifier: string): void {
    this._beforeCallListeners.delete(identifier);
  }

  removeAfterCallListener(identifier: string): void {
    this._afterCallListeners.delete(identifier);
  }

  _generateHeaders(
    optionHeaders?: OptionsType['headers']
  ): ApiServiceHeadersType {
    let headers: ApiServiceHeadersType = {
      ...{
        'x-make-app-name': this.appname,
        'x-make-country': this.country,
        'x-make-language': this.language,
        'x-make-source': this.source,
        'x-make-location': this.location,
        'x-make-referrer': this.referrer,
        'x-make-custom-data': this.customData,
        'x-make-url': this.url,
      },
      ...this.customHeaders,
      ...optionHeaders,
    };

    if (this.sessionId) {
      headers = {
        ...headers,
        'x-session-id': this.sessionId,
      };
    }

    if (this.visitorId) {
      headers = {
        ...headers,
        'x-visitor-id': this.visitorId,
      };
    }

    if (this.token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${this.token}`,
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

      return response;
    } catch (error: unknown) {
      const apiServiceError = error as ApiServiceError;

      if (apiServiceError?.status === 401 && retry > 0 && this.token) {
        this._token = null;
        this._token = await this._refreshTokenCallback();
        await this._retryApiCall(url, options, 0);
      }

      if (
        (!apiServiceError?.status || apiServiceError?.status > 403) &&
        retry > 0
      ) {
        const sleep = (ms: number): Promise<void> =>
          new Promise(resolve => {
            setTimeout(resolve, ms);
          });

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

      const apiRouteHeaderName = 'x-route-name';
      const apiAnonymousRouteNames = ['demographicstrackingv2'];
      const isAnonymousRoute = (headers: ApiServiceHeadersType) =>
        headers[apiRouteHeaderName] &&
        apiAnonymousRouteNames.includes(headers[apiRouteHeaderName]);

      if (!isAnonymousRoute(responseHeaders)) {
        if (responseHeaders['x-visitor-id']) {
          this._visitorId = responseHeaders['x-visitor-id'];
        }
        if (responseHeaders['x-session-id']) {
          this._sessionId = responseHeaders['x-session-id'];
        }
      }
    };

    try {
      await this._beforeCallListeners.forEach(listener =>
        listener(url, options)
      );
      const response = await this._retryApiCall(url, options);
      setAttributesFromResponseHeaders(response?.headers);
      await this._afterCallListeners.forEach(listener =>
        listener(url, options, response?.headers || {})
      );

      return response;
    } catch (error: unknown) {
      const apiServiceError = error as ApiServiceError;
      setAttributesFromResponseHeaders(apiServiceError?.headers);
      await this._afterCallListeners.forEach(
        async (
          listener: (
            url: string,
            options: OptionsType,
            headers: Readonly<ApiServiceHeadersType>
          ) => void
        ) => listener(url, options, apiServiceError?.headers || {})
      );

      if (apiServiceError.status === 401) {
        this._token = null;
      }

      throw apiServiceError;
    }
  }
}

export const apiClient = new ApiServiceClient();
