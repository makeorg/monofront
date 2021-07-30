import React from 'react';
import { Method } from 'axios';
import { UnknownObjectType } from './Commons';

export type ApiServiceHeadersType = {
  'x-make-country'?: string;
  'x-make-language'?: string;
  'x-make-question-id'?: string;
  'x-make-custom-data'?: string;
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
      method: string;
    };
  };
  isAxiosError: boolean;
  message: string;
  request: string;
};

export type OptionsType = {
  headers?: Readonly<Record<string, string | boolean>>;
  allowedHeaders?: string[];
  body?: string;
  params?: string;
  method?: Method;
  httpsAgent?: string;
  withCredentials?: boolean;
};
