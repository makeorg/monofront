import { NextFunction, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const nonceUuidMiddleware = (
  res: Response,
  next: NextFunction
): void => {
  res.locals.nonce = uuidv4();

  return next();
};
