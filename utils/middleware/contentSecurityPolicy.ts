import csp from 'helmet-csp';
import { env } from '@make.org/assets/env';
import { NextFunction } from 'express';
import { IncomingMessage, ServerResponse } from 'http';

const getDefaultDirectives = (
  res: ServerResponse & { locals: { nonce: string } }
) => ({
  baseUri: ["'self'"],
  defaultSrc: ["'none'"],
  fontSrc: ["'self'"],
  scriptSrc: [
    "'self'",
    'https://connect.facebook.net',
    'https://staticxx.facebook.com',
    'https://static.ads-twitter.com',
    'https://apis.google.com',
    'https://analytics.twitter.com',
    'https://sc-static.net',
    'https://cdn.mxpnl.com',
    `'nonce-${res.locals.nonce}'`,
  ],
  styleSrc: ["'self'", "'unsafe-inline'"],
  imgSrc: [
    "'self'",
    'https://t.co',
    'https://*.makeorg.tech',
    'https://*.make.org',
    'https://*.placebymake.org',
    'https://*.webflow.com',
    'https://*.facebook.com',
    'https://*.facebook.net',
    'data:',
  ],
  connectSrc: [
    "'self'",
    env.apiUrlClientSide() || '',
    env.frontUrl() || '',
    'https://*.makeorg.tech',
    'https://*.make.org',
    'https://*.placebymake.org',
    'https://*.facebook.com',
    'https://*.facebook.net',
    'https://api-eu.mixpanel.com',
  ],
  formAction: ["'self'", 'https://www.facebook.com/tr/'],
  frameSrc: ['https://*.facebook.com', 'https://*.google.com', "'self'"],
  objectSrc: ["'none'"],
  mediaSrc: ["'none'"],
  manifestSrc: ["'self'"],
});

export const cspMiddleware = (
  req: IncomingMessage,
  res: ServerResponse & { locals: { nonce: string } },
  next: NextFunction
): void => {
  csp({
    directives: { ...getDefaultDirectives(res), frameAncestors: ["'none'"] },
  })(req, res, next);
};

export const widgetCspMiddleware = (
  req: IncomingMessage,
  res: ServerResponse & { locals: { nonce: string } },
  next: NextFunction
): void => {
  csp({
    directives: getDefaultDirectives(res),
  })(req, res, next);
};
