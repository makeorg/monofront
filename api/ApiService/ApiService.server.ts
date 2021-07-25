import https from 'https';
import { ApiServiceShared } from './ApiService.shared';
import { IApiServiceStrategy } from './index';

export class ApiServiceServer implements IApiServiceStrategy {
  // eslint-disable-next-line class-methods-use-this
  callApi(url: string, options: any): Promise<any> {
    const headers = {
      'x-make-source': 'core',
      ...options.headers,
    };

    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const serverOptions = { httpsAgent: agent, ...options };

    return ApiServiceShared.callApi(url, {
      ...serverOptions,
      headers,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  get country(): string {
    return '';
  }

  // eslint-disable-next-line class-methods-use-this
  get language(): string {
    return '';
  }

  // eslint-disable-next-line class-methods-use-this
  get source(): string {
    return '';
  }

  // eslint-disable-next-line class-methods-use-this
  get questionId(): string {
    return '';
  }

  // eslint-disable-next-line class-methods-use-this
  get referrer(): string {
    return '';
  }
}
