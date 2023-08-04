import { MaintenanceService } from '@make.org/utils/services/Maintenance';
import { NextFunction, Request, Response } from 'express';
import NodeCache from 'node-cache';

const MAINTENANCE_SERVICE_RESPONSE_CACHE_KEY =
  'MAINTENANCE_SERVICE_RESPONSE_CACHE_KEY';

const cache = new NodeCache({ stdTTL: 300 });

const getMaintenanceConfigResponse = async () => {
  const content = cache.get(MAINTENANCE_SERVICE_RESPONSE_CACHE_KEY);

  if (content || content === null) {
    return content;
  }
  const response = await MaintenanceService.getConfig();
  cache.set(MAINTENANCE_SERVICE_RESPONSE_CACHE_KEY, response?.data);

  return response?.data;
};

export const maintenanceMiddleware = async (
  req: Request,
  res: Response & { maintenance?: boolean },
  next: NextFunction,
  logError: (error: any) => void
): Promise<void> => {
  try {
    const { source } = req.query;
    const maintenanceConfigResponse = await getMaintenanceConfigResponse();
    if (!maintenanceConfigResponse) {
      return next();
    }
    const { blockAll, blockedSources } = maintenanceConfigResponse;
    if (blockAll || (blockedSources && blockedSources.includes(source))) {
      res.maintenance = true;
    }

    return next();
  } catch (error) {
    logError({
      message: `Failed to call maintenance config`,
      name: 'middlewares',
    });

    return next();
  }
};
