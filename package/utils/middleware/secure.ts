import SecurityService from '@make.org/api/SecurityService';
import { NextFunction, Request, Response } from 'express';

export const secureMiddleware = async (
  req: Request,
  res: Response & { unsecure?: boolean },
  next: NextFunction
): Promise<void> => {
  const { hash } = req.query;

  if (!hash) {
    res.unsecure = true;
    return next();
  }
  const urlToCheck = req.originalUrl.slice(
    req.originalUrl.indexOf('?'),
    req.originalUrl.indexOf('&hash')
  );

  const formattedBracketsUrl = urlToCheck
    .replace('%5B', '[')
    .replace('%5D', ']');

  try {
    const checkHashStatus = await SecurityService.checkSecureHash(
      hash?.toString() || '',
      formattedBracketsUrl
    );
    if (checkHashStatus?.status !== 204) {
      res.unsecure = true;
    }
    return next();
  } catch (error) {
    res.unsecure = true;
    return next();
  }
};
