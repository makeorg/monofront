import React from 'react';
import https from 'https';
import http from 'http';
import { UnknownObjectType } from './Commons';

type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK';

export type ApiServiceHeadersType = {
  'x-make-app-name'?: string;
  'x-make-source'?: string;
  'x-make-location'?: string;
  'x-make-referrer'?: string;
  'x-make-country'?: string;
  'x-make-client-language'?: string;
  'x-make-question-slug'?: string;
  'x-make-question-language'?: string;
  'x-make-question-id'?: string;
  'x-make-custom-data'?: string;
  'x-visitor-id'?: string;
  'x-session-id'?: string;
  'x-session-id-expiration'?: string;
  'x-route-name'?: string;
  Authorization?: string;
  'Cache-Control'?: string;
  Pragma?: string;
  'set-cookie'?: string[];
};

export type ErrorObjectType = {
  field: string;
  key: string;
  message: string | React.ReactNode;
};

export type ErrorResponse = {
  response: {
    status: number;
    data: UnknownObjectType;
    headers: UnknownObjectType;
    config: {
      url: string;
      method: Method;
    };
  };
  isAxiosError: boolean;
  message: string;
  request: string;
};

type AxiosConfigType = {
  'axios-retry'?: IAxiosRetryConfig;
  url?: string;
  method?: Method;
  baseURL?: string;
  transformRequest?: (data: T, headers: Record<string, string>) => T;
  transformResponse?: (data: T) => T;
  headers?: Record<string, string | string[]>;
  params?: Record<string | boolean | number | undefined> | URLSearchParams;
  paramsSerializer?: (params: unknown) => string;
  data?: unknown;
  timeout?: number;
  withCredentials?: boolean;
  adapter?: (config: unknown) => Promise<unknown>;
  auth?: { username: string; passord: string };
  responseType?:
    | 'arraybuffer'
    | 'document'
    | 'json'
    | 'text'
    | 'stream'
    | 'blob';
  responseEncoding?: string;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: unknown) => void;
  onDownloadProgress?: (progressEvent: unknown) => void;
  maxContentLength?: number;
  maxBodyLength?: number;
  validateStatus?: (status: number) => boolean;
  maxRedirects?: number;
  socketPath?: string | null;
  httpAgent?: http.Agent;
  httpsAgent?: https.Agent;
  proxy?: {
    protocol?: string;
    host: string;
    port: number;
    auth?: {
      username: string;
      password: string;
    };
  };
  cancelToken?: CancelToken;
  signal?: AbortController;
  decompress?: boolean;
  insecureHTTPParser?: undefined | boolean;
  silentJSONParsing?: boolean;
  forcedJSONParsing?: boolean;
  clarifyTimeoutError?: boolean;
};

export type OptionsType = AxiosConfigType & {
  allowedHeaders?: string[];
  body?: unknown;
  proposalId?: string;
};

export type ApiServiceResponse = AxiosResponse | void;
