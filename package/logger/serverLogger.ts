import winston from 'winston';
import { LogLevelType } from '@make.org/logger/types';
import {
  LogTransformer,
  transformData,
} from '@make.org/logger/loggerTransformer';
import { DataNormalizer, normalizeData } from './loggerNormalizer';
import { ILogger } from './type/interface';

const baseLogger: ILogger = {
  // eslint-disable-next-line no-console
  logError: error => console.error('Logger not initialized', error),
  // eslint-disable-next-line no-console
  logInfo: info => console.log('Logger not initialized', info),
  // eslint-disable-next-line no-console
  logWarning: warning => console.warn('Logger not initialized', warning),
};

class ServerLoggerClass {
  #logger: ILogger;

  constructor(logger: ILogger) {
    this.#logger = logger;
  }

  setLogger(logger: ILogger): void {
    this.#logger = logger;
  }

  async init(
    instanceLabel: string,
    dataNormalizers: DataNormalizer[] = [],
    logTransformers: LogTransformer[] = [],
    isTestEnv = false,
    colorize = false
  ): Promise<void> {
    const { combine, timestamp, label, simple } = winston.format;
    const logFormat = ServerLoggerClass.getLogFormat(colorize);
    const winstonLoggerInstance = winston.createLogger({
      silent: isTestEnv,
      format: combine(
        label({ label: instanceLabel }),
        timestamp(),
        simple(),
        logFormat
      ),
      transports: [new winston.transports.Console()],
    });

    const log = (level: string, value: unknown) =>
      winstonLoggerInstance.log(
        level,
        transformData(normalizeData(value, dataNormalizers), logTransformers)
      );

    this.#logger = {
      logError: error => log(LogLevelType.error, error),
      logInfo: info => log(LogLevelType.info, info),
      logWarning: warning => log(LogLevelType.warn, warning),
    };

    return Promise.resolve();
  }

  static getLogFormat(colorize: boolean): winston.Logform.Format {
    const { printf } = winston.format;

    return printf(info => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = info instanceof Object ? info : { message: info };

      const infoLabel = data.label;
      delete data.label;

      const infoTime = data.timestamp;
      delete data.timestamp;

      const infoLevel = data.level;
      delete data.level;

      const infoStack = data.stack || '-';
      delete data.stack;

      const message = JSON.stringify(data) || '-';

      const yellow = '\x1b[33;20m';
      const green = '\x1b[32;20m';
      const reset = '\x1b[0m';

      if (colorize) {
        return `${yellow}infoTime${reset}:${infoTime} ${yellow}infoLabel${reset}:${infoLabel} ${yellow}infoLevel${reset}:${infoLevel} ${yellow}message${reset}:${green}${message}${reset} ${yellow}stackTrace${reset}:${infoStack}`;
      }

      return `infoTime:${infoTime} infoLabel:${infoLabel} infoLevel:${infoLevel} message:${message} stackTrace:${infoStack}`;
    });
  }

  getInstance(): ILogger {
    return {
      logError: (error: unknown) => this.#logger.logError(error),
      logInfo: (info: unknown) => this.#logger.logInfo(info),
      logWarning: (warning: unknown) => this.#logger.logWarning(warning),
    };
  }
}

export const ServerLogger = new ServerLoggerClass(baseLogger);
