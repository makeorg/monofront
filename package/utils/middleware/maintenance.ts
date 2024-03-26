import MaintenanceApiService from '@make.org/api/services/MaintenanceApiService';
import { ILogger } from '@make.org/types';
import { AxiosResponse } from 'axios';
import { NextFunction, Request, Response } from 'express';
import NodeCache from 'node-cache';

const MAINTENANCE_SERVICE_RESPONSE_CACHE_KEY =
  'MAINTENANCE_SERVICE_RESPONSE_CACHE_KEY';

const cache = new NodeCache({ stdTTL: 300 });

const getConfig = async (logger: ILogger): Promise<null | AxiosResponse> => {
  try {
    const response = await MaintenanceApiService.getMaintenanceConfig();
    if (response === null) {
      logger.logError({
        message: `Failed to get maintenance config. Default configuration will be used.`,
        name: 'services',
      });
    }

    return response;
  } catch (error: unknown) {
    const serviceError = error as Error;

    logger.logError({
      message: `Failed to get maintenance config - ${serviceError.message}`,
      name: 'services',
      stack: serviceError.stack,
    });

    return null;
  }
};

const getMaintenanceConfigResponse = async (logger: ILogger) => {
  const content = cache.get(MAINTENANCE_SERVICE_RESPONSE_CACHE_KEY);

  if (content || content === null) {
    return content;
  }
  const response = await getConfig(logger);
  cache.set(MAINTENANCE_SERVICE_RESPONSE_CACHE_KEY, response?.data);

  return response?.data;
};

export const maintenanceMiddleware =
  () =>
  async (
    req: Request,
    res: Response & { maintenance?: boolean },
    next: NextFunction,
    logger: ILogger
  ): Promise<void> => {
    try {
      const { source } = req.query;
      const maintenanceConfigResponse = await getMaintenanceConfigResponse(
        logger
      );
      if (!maintenanceConfigResponse) {
        return next();
      }
      const { blockAll, blockedSources } = maintenanceConfigResponse;
      if (blockAll || (blockedSources && blockedSources.includes(source))) {
        res.maintenance = true;
      }

      return next();
    } catch (error) {
      logger.logError({
        message: `Failed to call maintenance config`,
        name: 'middlewares',
      });

      return next();
    }
  };
