import { Request, Response } from 'express';
import { createInitialState } from '@make.org/store/initialState';
import { ServerLogger } from '@make.org/logger/serverLogger';
import { reactRender } from '../reactRender';

export const maintenanceRoute = async (
  req: Request,
  res: Response & { unsecure?: boolean; maintenance?: boolean }
): Promise<void | string> => {
  const initialState = createInitialState();
  initialState.appConfig.maintenance = true;

  ServerLogger.getInstance().logWarning({
    message: `Maintenance on source : "${req.query.source}"`,
    name: 'server-side',
    url: req.url,
    query: req.query,
  });

  return reactRender(req, res, initialState);
};
