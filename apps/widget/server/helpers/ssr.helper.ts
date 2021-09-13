import { getLoggerInstance } from '@make.org/utils/helpers/logger';
import { Logger } from '@make.org/utils/services/Logger';
import { WIDGET_BUILD_DIR, WIDGET_JS_DIR, WIDGET_MAP_DIR } from '../paths';

const log = async (level: string, error: any) => {
  const logger = await getLoggerInstance(
    'make-widget',
    WIDGET_JS_DIR,
    WIDGET_BUILD_DIR,
    WIDGET_MAP_DIR
  );
  logger.log(level, Logger.normalizeData(error));
};

export const logError = (error: any): void => {
  log('error', error);
};

export const logInfo = (info: any): void => {
  log('info', info);
};

export const logWarning = (warning: any): void => {
  log('warn', warning);
};
