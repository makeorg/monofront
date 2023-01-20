/* eslint-disable class-methods-use-this */
import { v4 as uuidv4 } from 'uuid';
import { env } from '@make.org/assets/env';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { ExpressService } from '@make.org/utils/services/Express';
import { LogLevelType } from '@make.org/types/enums/logLevel';
import {
  errorNormalizer,
  normalizeData as loggerNormalizeData,
  objectNormalizer,
  stringNormalizer,
} from '@make.org/logger/loggerNormalizer';
import { apiErrorDataLogNormalizer } from '@make.org/api/apiErrorDataLogNormalizer';

let instance: LoggerSingleton | null = null;

class LoggerSingleton {
  constructor() {
    if (!instance) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      instance = this;
    }
  }

  normalizeData = (
    data: ApiServiceError | Error | { [key: string]: string } | string
  ) => {
    try {
      const normalizedData = loggerNormalizeData(data, [
        errorNormalizer,
        apiErrorDataLogNormalizer,
        stringNormalizer,
        objectNormalizer,
      ]);

      return normalizedData;
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

    ExpressService.log(this.normalizeData(data), level || LogLevelType.error);
  };
}

export const Logger = new LoggerSingleton();
