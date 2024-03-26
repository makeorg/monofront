import { LogLevelType } from '@make.org/logger/types';
import {
  errorNormalizer,
  objectNormalizer,
  stringNormalizer,
  normalizeData,
  DataNormalizer,
  DataLog,
} from '@make.org/logger/loggerNormalizer';
import { v4 as uuidv4 } from 'uuid';
import { ILogger } from './type/interface';
import { transformData } from './loggerTransformer';
import { LoggerServiceConfigType } from './type/type';

let clientLogger: ILogger = {
  // eslint-disable-next-line no-console
  logError: error => console.error('Logger not initialized', error),
  // eslint-disable-next-line no-console
  logInfo: info => console.log('Logger not initialized', info),
  // eslint-disable-next-line no-console
  logWarning: warning => console.warn('Logger not initialized', warning),
};

const sendData = (
  url: string,
  options: {
    method: string;
    headers?: HeadersInit;
    data?: DataLog & { level: LogLevelType };
  }
): Promise<Response> => {
  const defaultHeaders = {
    'Content-Type': 'application/json; charset=UTF-8',
  };
  const headers = { ...defaultHeaders, ...(options.headers || {}) };

  const response = fetch(url, {
    method: options.method,
    headers,
    body: JSON.stringify(options.data),
    credentials: 'omit',
  });

  return response;
};

const initClientLogger = async (
  serviceConfig: LoggerServiceConfigType,
  normalizers: DataNormalizer[] = [
    errorNormalizer,
    stringNormalizer,
    objectNormalizer,
  ]
): Promise<void> => {
  const log = (
    data: unknown,
    level: LogLevelType = LogLevelType.error
  ): void => {
    const normalizedData = normalizeData(data, normalizers);
    const transformedData = transformData(normalizedData, [
      (dataLog: DataLog): DataLog => ({
        ...dataLog,
        app_logId: uuidv4(),
      }),
    ]);
    try {
      sendData(serviceConfig.url, {
        method: serviceConfig.method,
        headers: serviceConfig.headers,
        data: {
          ...transformedData,
          level,
        },
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  clientLogger = {
    logError: (error: unknown) => log(error, LogLevelType.error),
    logInfo: info => log(info, LogLevelType.info),
    logWarning: warning => log(warning, LogLevelType.warn),
  };

  return Promise.resolve();
};

export const ClientLogger = {
  init: initClientLogger,
  getInstance: (): ILogger => clientLogger,
};
