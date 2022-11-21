/* eslint-disable class-methods-use-this */
import { v4 as uuidv4 } from 'uuid';
import { env } from '@make.org/assets/env';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { ExpressService } from '@make.org/utils/services/Express';
import { LogLevelType } from '@make.org/types/enums/logLevel';

let instance: LoggerSingleton | null = null;

class LoggerSingleton {
  constructor() {
    if (!instance) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      instance = this;
    }
  }

  formatApiServiceError = (error: ApiServiceError) => ({
    message: error.message,
    app_logName: error.name,
    app_fileName: error.fileName,
    app_lineNumber: error.lineNumber,
    app_columnNumber: error.columnNumber,
    stack: error.stack,
    app_status: error.status,
    app_responseData: error.data,
    app_url: error.url,
    app_method: error.method,
    app_logId: error.logId,
    app_requestId: error.requestId,
  });

  formatError = (
    error: Error & {
      fileName?: string;
      lineNumber?: string;
      columnNumber?: string;
    }
  ) => ({
    message: error.message,
    app_logName: error.name,
    app_fileName: error.fileName,
    app_lineNumber: error.lineNumber,
    app_columnNumber: error.columnNumber,
    app_logId: uuidv4(),
    stack: error.stack,
  });

  normalizeData = (
    data: ApiServiceError | Error | { [key: string]: string } | string
  ) => {
    if (data instanceof ApiServiceError) {
      return this.formatApiServiceError(data);
    }
    if (data instanceof Error) {
      return this.formatError(data);
    }
    if (typeof data === 'string') {
      return {
        message: data,
        stack: 'no-stack',
        app_logId: uuidv4(),
        app_logName: '-',
      };
    }
    if (typeof data === 'object') {
      const formatedData: {
        app_logId: string;
        app_logName: string;
        stack: string;
        message: string;
        name?: string;
        errorName?: string;
        logId?: string;
      } = {
        ...data,
        app_logId: data.app_logId || data.logId || uuidv4(),
        app_logName: data.app_logName || data.name || data.errorName || '-',
        stack: data.stack || '-',
        message: data.message || '-',
      };

      delete formatedData.name;
      delete formatedData.errorName;
      delete formatedData.logId;

      return formatedData;
    }

    try {
      return {
        message: JSON.stringify(data),
        app_logId: uuidv4(),
      };
    } catch (e: unknown) {
      const error = e as Error;
      return {
        message: error.message,
        app_logId: uuidv4(),
      };
    }
  };

  logError = (
    error: string | ApiServiceError | Record<string, string> | Error
  ) => {
    this.log(error, LogLevelType.error);
  };

  logInfo = (data: string | ApiServiceError | Record<string, string>) => {
    this.log(data, LogLevelType.info);
  };

  logWarning = (data: string | ApiServiceError | Record<string, string>) => {
    this.log(data, LogLevelType.warn);
  };

  log = (
    data: string | ApiServiceError | Record<string, string> | Error,
    level: LogLevelType
  ): void => {
    if (env.isDev()) {
      if (level === 'error') {
        // eslint-disable-next-line no-console
        console.error(level, data);

        return;
      }
      // eslint-disable-next-line no-console
      console.log(level, data);
    }

    if (!env.isClientSide()) {
      // eslint-disable-next-line no-console
      console.error('trying to use logger service on server side', level, data);

      return;
    }

    ExpressService.log(data, level || LogLevelType.error);
  };
}

export const Logger = new LoggerSingleton();
