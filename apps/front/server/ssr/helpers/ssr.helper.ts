import { Logger as SharedLogger } from '@make.org/utils/services/Logger';
import { getLoggerInstance } from '../../logger';

const log = async (level: string, error: any) => {
  const logger = await getLoggerInstance();
  logger.log(level, SharedLogger.normalizeData(error));
};

export const logError = (error: any): void => {
  log('error', error);
};

export const logInfo = (info: any): void => {
  log('info', info);
};

export const logWarning = (warning: any): void => {
  log('warning', warning);
};
