import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IApiServiceStrategy } from './index';

export class ApiServiceMock implements IApiServiceStrategy {
  // eslint-disable-next-line class-methods-use-this
  callApi(url: string, options: AxiosRequestConfig = {}): AxiosPromise<AxiosResponse> {
    return Promise.resolve(url, options);
  }

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
}
