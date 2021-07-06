export type ApiServiceHeadersType = {
  'x-make-country'?: string
  'x-make-language'?: string
  'x-make-question-id'?: string
  'x-make-custom-data'?: string
};

export type ErrorObjectType = {
  field: string
  key: string
  message: any
};

export type ErrorResponse = {
  response: {
    status: number
    data: any
    headers: any
    config: any
  }
  isAxiosError: boolean
  message: string
  request: any
};
