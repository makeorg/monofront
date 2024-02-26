import { NextFunction, Request, Response } from 'express';
import { CookiesManager } from '../cookiesManager';

export const assemblyCookiesMiddleware =
  () =>
  (req: Request, res: Response, next: NextFunction): void => {
    CookiesManager.renew(req);

    return next();
  };
