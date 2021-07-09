import { UnknownObjectType } from './Commons';

export type ApiServiceHeadersType = {
  'x-make-country'?: string
  'x-make-language'?: string
  'x-make-question-id'?: string
  'x-make-custom-data'?: string
};

export type ErrorObjectType = {
  field: string
  key: string
  message: string
};

export type ErrorResponse = {
  response: {
    status: number
    data: UnknownObjectType
    headers: UnknownObjectType
    config: {
      url: string
      method: string
    }
  }
  isAxiosError: boolean
  message: string
  request: string
};
