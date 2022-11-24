import { Response, NextFunction } from 'express';

interface HeaderArray {
  readonly [name: string]: string;
}

export const headersResponseMiddleware = (
  headers: HeaderArray,
  res: Response,
  next: NextFunction
): void => {
  Object.keys(headers).forEach(key => res.setHeader(key, headers[key]));

  return next();
};
