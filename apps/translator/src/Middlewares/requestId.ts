import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const initialRequestId = req.headers['x-make-external-id'] as string;
  req.requestId = initialRequestId || uuidv4();
  res.locals.requestId = req.requestId;

  return next();
};
