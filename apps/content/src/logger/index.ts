import { LoggerService } from '@nestjs/common';

import {
  getLoggerInstance as makeGetLoggerInstance,
  initLogger as makeInitLogger,
} from '@make.org/logger';
import {
  errorNormalizer,
  objectNormalizer,
  stringNormalizer,
} from '@make.org/logger/loggerNormalizer';
import { oneLineTransformer } from '@make.org/logger/loggerTransformer';
import { ServerLogger } from '@make.org/logger';

export class Logger implements LoggerService {
  makeLoggerInstance: ServerLogger;
  /**
   * Create a new instance of the logger.
   */
  constructor() {
    makeInitLogger(
      'make-content',
      [errorNormalizer, objectNormalizer, stringNormalizer],
      [oneLineTransformer],
    );

    this.makeLoggerInstance = makeGetLoggerInstance();
  }

  private transformParams(params: any[]) {
    const length = Object.keys(params).length;
    if (length === 1) {
      return { app_context: params[0], name: params[0] };
    }
    if (length === 2) {
      return {
        app_stack: params[0],
        app_context: params[1],
        name: params[1],
      };
    }

    return params;
  }

  log(message: any, ...optionalParams: any[]) {
    this.makeLoggerInstance.logInfo({
      message,
      ...this.transformParams(optionalParams),
    });
  }
  error(message: any, ...optionalParams: any[]): void {
    this.makeLoggerInstance.logError({
      message,
      ...this.transformParams(optionalParams),
    });
  }

  warn(message: any, ...optionalParams: any[]): void {
    this.makeLoggerInstance.logWarning({
      message,
      ...this.transformParams(optionalParams),
    });
  }

  debug?(message: any, ...optionalParams: any[]): void {
    this.makeLoggerInstance.logInfo({
      message,
      ...this.transformParams(optionalParams),
    });
  }

  verbose?(message: any, ...optionalParams: any[]): void {
    this.makeLoggerInstance.logInfo({
      message,
      ...this.transformParams(optionalParams),
    });
  }
}
