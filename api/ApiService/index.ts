export interface IApiServiceStrategy {
  callApi(url: string, options: any): Promise<any>;
  get country(): string;
  get language(): string;
  get source(): string;
  get questionId(): string;
  get referrer(): string;
}

class ApiServiceClass {
  strategyValue: IApiServiceStrategy;

  set strategy(strategy: IApiServiceStrategy) {
    this.strategyValue = strategy;
  }

  get strategy() {
    if (!this.strategyValue) throw new Error('No ApiService strategy configured');
    return this.strategyValue;
  }

  callApi(url: string, options = {}): Promise<any> {
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

  get questionId(): string {
    return this.strategy.questionId;
  }

  get referrer(): string {
    return this.strategy.referrer;
  }
}

export const ApiService = new ApiServiceClass();
