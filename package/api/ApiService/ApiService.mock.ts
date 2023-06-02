import { ApiServiceResponse } from '@make.org/types';
import { AxiosResponse } from 'axios';
import { IApiServiceStrategy } from './index';

export class ApiServiceMock implements IApiServiceStrategy {
  // eslint-disable-next-line class-methods-use-this
  callApi(url: string): Promise<ApiServiceResponse> {
    const result = { data: url } as AxiosResponse;
    return Promise.resolve(result);
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  removeToken(): void {}

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  setToken(token: string): void {}

  // eslint-disable-next-line class-methods-use-this
  get country(): string {
    return 'foo';
  }

  // eslint-disable-next-line class-methods-use-this
  get language(): string {
    return 'foo';
  }

  // eslint-disable-next-line class-methods-use-this
  get source(): string {
    return 'foo';
  }

  // eslint-disable-next-line class-methods-use-this
  get questionId(): string {
    return 'foo';
  }

  // eslint-disable-next-line class-methods-use-this
  get referrer(): string {
    return 'foo';
  }
}
