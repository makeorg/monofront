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
        'https://analytics.twitter.com',
        'https://static.hotjar.com',
        'https://script.hotjar.com',
      ],
      imgSrc: [
        ...defaultDirectives.imgSrc,
        'https://t.co',
        'https://*.facebook.com',
        'https://*.facebook.net',
        'https://analytics.twitter.com',
      ],
      connectSrc: [
        ...defaultDirectives.connectSrc,
        'https://*.facebook.com',
        'https://*.facebook.net',
        'https://in.hotjar.com',
        'https://ws7.hotjar.com',
        'wss://ws7.hotjar.com',
      ],
      formAction: [
        ...defaultDirectives.formAction,
        'https://www.facebook.com/tr/',
      ],
      frameSrc: [
        ...defaultDirectives.frameSrc,
        'https://*.facebook.com',
        'https://*.google.com',
        'https://vars.hotjar.com/',
      ],
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
