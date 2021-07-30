import axios, { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { env } from '@make.org/assets/env';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';

const LOG_INFO = 'info';
const LOG_WARNING = 'warn';
const LOG_ERROR = 'error';
// const onClientSide = typeof window !== 'undefined' && !!window;

let instance: LoggerSingleton | null = null;
const host = env.frontUrl() || '';
const port = env.port() || '';

class LoggerSingleton {
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  formatApiServiceError = (error: ApiServiceError) => ({
    message: error.message,
    name: error.name,
    fileName: error.fileName,
    lineNumber: error.lineNumber,
    columnNumber: error.columnNumber,
    stack: error.stack,
    status: error.status,
    responseData: error.data,
    url: error.url,
    method: error.method,
    logId: error.logId,
    requestId: error.requestId,
  });

  formatError = (error: Error) => ({
    message: error.message,
    name: error.name,
    // TO DO
    // fileName: error.fileName,
    // lineNumber: error.lineNumber,
    // columnNumber: error.columnNumber,
    stack: error.stack,
    logId: uuidv4(),
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
      const formatedData = {
        ...data,
        app_logId: data.app_logId || data.logId || uuidv4(),
        app_logName: data.app_logName || data.name || data.errorName || '-',
        stack: data.stack || '-',
        message: data.message || '-',
      };
      // TODO
      // delete formatedData.name;
      // delete formatedData.errorName;
      // delete formatedData.logId;

      return formatedData;
    }

    try {
      return {
        message: JSON.stringify(data),
        app_logId: uuidv4(),
      };
    } catch (e) {
      return {
        message: e.message,
        app_logId: uuidv4(),
      };
    }
  };

  logError = (
    error: string | ApiServiceError | Record<string, string> | Error
  ) => {
    this.log(error, LOG_ERROR);
  };

  logInfo = (data: string | ApiServiceError | Record<string, string>) => {
    this.log(data, LOG_INFO);
  };

  logWarning = (data: string | ApiServiceError | Record<string, string>) => {
    this.log(data, LOG_WARNING);
  };

  log = async (
    data: string | ApiServiceError | Record<string, string> | Error,
    level: string
  ): Promise<void | AxiosResponse> => {
    if (env.isDev()) {
      // eslint-disable-next-line no-console
      console.log(level, data);
    }

    // TODO handle it cleanly
    // if (!onClientSide) {
    //   // eslint-disable-next-line import/no-cycle
    //   const { logError, logInfo, logWarning } = await import(
    //     'Server/ssr/helpers/ssr.helper'
    //   );

    //   switch (level) {
    //     case LOG_INFO:
    //       logInfo(data);
    //       break;
    //     case LOG_WARNING:
    //       logWarning(data);
    //       break;
    //     default:
    //       logError(data);
    //   }
    // }

    return axios('/api/logger', {
      method: 'POST',
      proxy: {
        host,
        port: parseInt(port, 10),
      },
      data: {
        level: level || 'error',
        data: this.normalizeData(data),
      },
    })
      .then(() => undefined)
      .catch(e => {
        // eslint-disable-next-line no-console
        console.log('Fail to log error - ', e);
      });
  };
}

export const Logger = new LoggerSingleton();
