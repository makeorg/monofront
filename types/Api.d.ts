import React from 'react';
import { Method } from 'axios';
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
  'x-make-country'?: string;
  'x-make-language'?: string;
  'x-make-question-id'?: string;
  'x-make-custom-data'?: string;
  'x-visitor-id'?: string;
  'x-session-id'?: string;
  'x-session-id-expiration'?: string;
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

export type OptionsType = {
  headers?: Readonly<Record<string, string | boolean | null>>;
  allowedHeaders?: string[];
  body?: string;
  params?: Record<string, string>;
  method: Method;
  httpsAgent?: string;
  withCredentials?: boolean;
  proposalId?: string;
};
