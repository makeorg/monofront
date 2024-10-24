import csp from 'helmet-csp';
import { NextFunction } from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import { env } from '../../utils/env';

export const assemblyCspMiddleware = (
  req: IncomingMessage,
  res: ServerResponse & { locals: { nonce: string } },
  next: NextFunction
): void => {
  csp({
    directives: {
      baseUri: ["'self'"],
      defaultSrc: ["'none'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'none'"],
      manifestSrc: ["'self'"],
      frameAncestors: ["'none'"],
      scriptSrc: [
        "'self'",
        'https://cdn.mxpnl.com',
        `'nonce-${res.locals.nonce}'`,
        'https://connect.facebook.net',
        'https://staticxx.facebook.com',
        'https://static.ads-twitter.com',
        'https://analytics.twitter.com',
        'https://www.youtube.com',
        'https://*.cookiefirst.com',
        'https://scripts.told.club/sdk/sdk.js',
      ],
      imgSrc: [
        "'self'",
        'https://*.makeorg.tech',
        'https://*.make.org',
        'data:',
        'https://t.co',
        'https://*.facebook.com',
        'https://*.facebook.net',
        'https://analytics.twitter.com',
        'https://i.ytimg.com/vi/',
        'https://*.cookiefirst.com',
      ],
      connectSrc: [
        env.frontUrl() || '',
        env.apiUrlClientSide() || '',
        env.contentUrlServerSide() || '',
        'https://*.makeorg.tech',
        'https://*.make.org',
        'https://api-eu.mixpanel.com',
        'https://*.facebook.com',
        'https://*.facebook.net',
        'https://*.twitter.com',
        'https://noembed.com/embed',
        'https://*.cookiefirst.com',
        'https://api.told.club/graphql',
      ],
      formAction: ["'self'", 'https://www.facebook.com/tr/'],
      frameSrc: [
        "'self'",
        'https://*.hotjar.com',
        'https://www.youtube.com',
        'https://widget.told.club',
      ],
      fontSrc: ["'self'", 'https://*.hotjar.com', 'https://fonts.gstatic.com/'],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        'https://fonts.googleapis.com/',
        'https://*.cookiefirst.com',
      ],
    },
  })(req, res, next);
};
