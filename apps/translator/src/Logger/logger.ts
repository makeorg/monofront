import {
  getLoggerInstance as baseGetLoggerInstance,
  initLogger as baseInitLogger,
  ServerLogger,
} from '@make.org/logger';
import {
  errorNormalizer,
  objectNormalizer,
  stringNormalizer,
} from '@make.org/logger/loggerNormalizer';
import { oneLineTransformer } from '@make.org/logger/loggerTransformer';
import { Response } from 'express';

export interface CustomServerLogger {
  logError: (x: object, res: Response) => void;
  logInfo: (x: object, res: Response) => void;
  logWarning: (x: object, res: Response) => void;
}

export const initLogger = (): Promise<void> =>
  baseInitLogger(
    'make-translator',
    [errorNormalizer, objectNormalizer, stringNormalizer],
    [oneLineTransformer]
  );

const logger: CustomServerLogger = {
  logError: (x: object, res: Response) =>
    baseGetLoggerInstance().logError({
      ...x,
      'app_from-app-name': res.locals.fromAppName,
      app_request_id: res.locals.requestId,
    }),
  logInfo: (x: object, res: Response) =>
    baseGetLoggerInstance().logInfo({
      ...x,
      'app_from-app-name': res.locals.fromAppName,
      app_request_id: res.locals.requestId,
    }),
  logWarning: (x: object, res: Response) =>
    baseGetLoggerInstance().logWarning({
      ...x,
      'app_from-app-name': res.locals.fromAppName,
      app_request_id: res.locals.requestId,
    }),
};

// use this logger when possible to ensure setting extraValues
export const getLoggerInstance = (): CustomServerLogger => logger;

// use this other cases
export const getBaseLoggerInstance = (): ServerLogger =>
  baseGetLoggerInstance();
