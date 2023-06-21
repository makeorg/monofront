import { Request, Response, NextFunction } from 'express';
import { getBaseLoggerInstance } from '../Logger/logger';
import { configuration } from '../configuration';
import { UNSECURED_ROUTES } from '../Routes';

export const appNameHeaderMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (UNSECURED_ROUTES.includes(req.path)) {
    return next();
  }
  const logger = getBaseLoggerInstance();

  const application = req.headers['x-make-app-name'] || 'none';

  if (application === 'none') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('Header requirements. Missing application name.');
  }

  if (!configuration.allowedFromApplication.includes(application?.toString())) {
    logger.logError({
      name: 'not-allowed',
      message: 'Application not allowed',
      'from-app-name': application?.toString(),
    });
    return res
      .status(401)
      .set('Content-Type', 'text/plain')
      .send(`application "${application}" not allowed`);
  }

  res.locals.fromAppName = application;

  return next();
};
