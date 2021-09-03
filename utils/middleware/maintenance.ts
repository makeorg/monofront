import MaintenanceService from '@make.org/api/MaintenanceService';
import { NextFunction, Request, Response } from 'express';
import cache from 'memory-cache';

const MAINTENANCE_SERVICE_RESPONSE_CACHE_KEY =
  'MAINTENANCE_SERVICE_RESPONSE_CACHE_KEY';

const getMaintenanceConfigResponse = async () => {
  const content = cache.get(MAINTENANCE_SERVICE_RESPONSE_CACHE_KEY);

  if (content) {
    return content;
  }
  const response = await MaintenanceService.getMaintenanceConfig();
  cache.put(MAINTENANCE_SERVICE_RESPONSE_CACHE_KEY, response, 300000);

  return response;
};

export const maintenanceMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { source } = req.query;
  try {
    const maintenanceConfigResponse = await getMaintenanceConfigResponse();
    const { blockAll, blockedSources } = maintenanceConfigResponse;
    if (blockAll || blockedSources.includes(source)) {
      return res.redirect('/maintenance');
    }

    return next();
  } catch (error) {
    console.error(error);
    return next();
  }
};
