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
  scriptSrc: ["'self'", 'https://cdn.mxpnl.com', `'nonce-${res.locals.nonce}'`],
  styleSrc: ["'self'", "'unsafe-inline'"],
  imgSrc: [
    "'self'",
    'https://*.makeorg.tech',
    'https://*.make.org',
    'https://*.placebymake.org',
    'https://*.webflow.com',
    'data:',
  ],
  connectSrc: [
    "'self'",
    env.apiUrlClientSide() || '',
    env.frontUrl() || '',
    'https://*.makeorg.tech',
    'https://*.make.org',
    'https://*.placebymake.org',
    'https://api-eu.mixpanel.com',
  ],
  formAction: ["'self'"],
  frameSrc: ["'self'"],
  objectSrc: ["'none'"],
  mediaSrc: ["'none'"],
  manifestSrc: ["'self'"],
});

export const cspMiddleware = (
  req: IncomingMessage,
  res: ServerResponse & { locals: { nonce: string } },
  next: NextFunction
): void => {
  const defaultDirectives = getDefaultDirectives(res);
  csp({
    directives: {
      ...defaultDirectives,
      frameAncestors: ["'none'"],
      scriptSrc: [
        ...defaultDirectives.scriptSrc,
        'https://connect.facebook.net',
        'https://staticxx.facebook.com',
        'https://static.ads-twitter.com',
        'https://apis.google.com',
        'https://accounts.google.com',
        'https://analytics.twitter.com',
        'https://*.hotjar.com',
        'https://scripts.told.club/sdk/sdk.js',
      ],
      imgSrc: [
        ...defaultDirectives.imgSrc,
        'https://t.co',
        'https://*.facebook.com',
        'https://*.facebook.net',
        'https://analytics.twitter.com',
        'https://*.hotjar.com',
      ],
      connectSrc: [
        ...defaultDirectives.connectSrc,
        'https://*.facebook.com',
        'https://*.facebook.net',
        'https://*.twitter.com',
        'https://*.hotjar.com',
        'https://*.hotjar.io',
        'wss://*.hotjar.com',
        'https://api.told.club/graphql',
      ],
      formAction: [
        ...defaultDirectives.formAction,
        'https://www.facebook.com/tr/',
      ],
      frameSrc: [
        ...defaultDirectives.frameSrc,
        'https://*.facebook.com',
        'https://*.google.com',
        'https://*.hotjar.com',
        'https://widget.told.club',
      ],
      fontSrc: [...defaultDirectives.fontSrc, 'https://*.hotjar.com'],
    },
  })(req, res, next);
};

export const widgetCspMiddleware = (
  req: IncomingMessage,
  res: ServerResponse & { locals: { nonce: string } },
  next: NextFunction
): void => {
  csp({
    directives: {
      ...getDefaultDirectives(res),
    },
  })(req, res, next);
};
