import { MaintenanceService } from '@make.org/utils/services/Maintenance';
import { NextFunction, Request, Response } from 'express';
import cache from 'memory-cache';

const MAINTENANCE_SERVICE_RESPONSE_CACHE_KEY =
  'MAINTENANCE_SERVICE_RESPONSE_CACHE_KEY';

const getMaintenanceConfigResponse = async () => {
  const content = cache.get(MAINTENANCE_SERVICE_RESPONSE_CACHE_KEY);

  if (content) {
    return content;
  }
  const response = await MaintenanceService.getConfig();
  cache.put(MAINTENANCE_SERVICE_RESPONSE_CACHE_KEY, response, 300000);

  return response;
};

export const maintenanceMiddleware = async (
  req: Request,
  res: Response & { maintenance?: boolean },
  next: NextFunction,
  logError: (error: any) => void
): Promise<void> => {
  const { source } = req.query;
  try {
    const maintenanceConfigResponse = await getMaintenanceConfigResponse();
    const { blockAll, blockedSources } = maintenanceConfigResponse;
    if (blockAll || (blockedSources && blockedSources.includes(source))) {
      res.maintenance = true;
    }

    return next();
  } catch (error) {
    if (logError) {
      logError({
        message: `Failed to call maintenance config`,
        name: 'middlewares',
      });
    }
    return next();
  }
};
