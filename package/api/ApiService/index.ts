import { OptionsType } from '@make.org/types';
import { AxiosResponse } from 'axios';

export interface IApiServiceStrategy {
  callApi(url: string, options: OptionsType): Promise<void | AxiosResponse>;
  removeToken(): void;
  setToken(token: string): void;
  get country(): string;
  get language(): string;
  get source(): string;
  get referrer(): string;
}

class ApiServiceClass {
  strategyValue: IApiServiceStrategy | null = null;

  removeToken() {
    this.strategy.removeToken();
  }

  setToken(token: string) {
    this.strategy.setToken(token);
  }

  set strategy(strategy: IApiServiceStrategy) {
    this.strategyValue = strategy;
  }

  get strategy() {
    if (!this.strategyValue)
      throw new Error('No ApiService strategy configured');
    return this.strategyValue;
  }

  callApi(
    url: string,
    options: OptionsType = { method: 'get' }
  ): Promise<void | AxiosResponse> {
    return this.strategy.callApi(url, options);
  }

  get country(): string {
    return this.strategy.country;
  }

  get language(): string {
    return this.strategy.language;
  }

  get source(): string {
    return this.strategy.source;
  }

  get referrer(): string {
    return this.strategy.referrer;
  }
}

export const ApiService = new ApiServiceClass();
