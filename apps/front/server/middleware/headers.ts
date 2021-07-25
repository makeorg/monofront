import { Response, NextFunction } from 'express';

export const headersResponseMiddleware = (
  res: Response,
  next: NextFunction
): void => {
  res.setHeader('Server', 'Express');
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
  res.setHeader('X-Frame-Options', 'deny');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '0');
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');

  return next();
};
