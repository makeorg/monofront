/* eslint-disable no-console */
import { IClientService, ILogger } from '../interface';

export class ClientService implements IClientService {
  #logger: ILogger;

  constructor(logger?: ILogger) {
    this.#logger = logger ?? {
      logInfo: (v: unknown): void => console.info(v),
      logError: (v: unknown): void => console.error(v),
      logWarning: (v: unknown): void => console.warn(v),
    };
  }

  #sanitizeBody(body: unknown): string | null {
    if (!body) {
      return null;
    }

    if (typeof body === 'string') return body;

    try {
      return JSON.stringify(body);
    } catch (e) {
      this.#logger.logError(e);
    }

    return null;
  }

  callApi(
    url: string,
    options: { method: string; headers?: HeadersInit; body?: unknown }
  ): Promise<Response> {
    const defaultHeaders = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
    const headers = { ...defaultHeaders, ...(options.headers || {}) };

    const apiUrl = `${url}`;

    const response = fetch(apiUrl, {
      method: options.method,
      headers,
      body: this.#sanitizeBody(options.body),
      credentials: 'omit',
    });

    return response;
  }
}
