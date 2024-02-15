import express, { Response } from 'express';
import i18n from 'i18next';
import compression from 'compression';
import cookiesMiddleware from 'universal-cookie-express';
import favicon from 'serve-favicon';
import cors from 'cors';
import webpackManifest from 'webpack-manifest';
import { headersResponseMiddleware } from '@make.org/utils/middleware/headers';
import { nonceUuidMiddleware } from '@make.org/utils/middleware/nonceUuid';
import { TRANSLATION_COMMON_NAMESPACE } from '@make.org/utils/i18n/constants';
import {
  errorNormalizer,
  objectNormalizer,
  stringNormalizer,
} from '@make.org/logger/loggerNormalizer';
import { apiErrorDataLogNormalizer } from '@make.org/api/log/apiErrorDataLogNormalizer';
import {
  getStackTransformer,
  oneLineTransformer,
} from '@make.org/logger/loggerTransformer';
import { initLogger } from '@make.org/logger';
import { FacebookConversion } from '@make.org/tracking/apiConversion/facebookConversion';
import { ClientService } from '@make.org/tracking/apiConversion/clientService';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { TwitterConversion } from '@make.org/tracking/apiConversion/twitterConversion';
import { env } from '../utils/env';
import { translationRessources } from '../i18n';
import { initRoutes } from './routes';
import { DEFAULT_LANGUAGE } from '../utils/constants';
import {
  ASSEMBLY_BUILD_DIR,
  ASSEMBLY_CLIENT_DIR,
  ASSEMBLY_FAVICON_FILE,
  ASSEMBLY_JS_DIR,
  ASSEMBLY_MAP_DIR,
} from './paths';
import { assemblyCspMiddleware } from './middleware/contentSecurityPolicy';
import { assemblyCookiesMiddleware } from './middleware/assemblyCookies';

i18n.init({
  interpolation: {
    escapeValue: false,
  },
  lng: DEFAULT_LANGUAGE,
  debug: false,
  resources: translationRessources,
  defaultNS: TRANSLATION_COMMON_NAMESPACE,
});

// App
const getApp = () => {
  const app = express();

  getStackTransformer(
    ASSEMBLY_JS_DIR,
    ASSEMBLY_BUILD_DIR,
    ASSEMBLY_MAP_DIR
  ).then(stackTransformer =>
    initLogger(
      'assembly-ui',
      [
        errorNormalizer,
        apiErrorDataLogNormalizer,
        stringNormalizer,
        objectNormalizer,
      ],
      [stackTransformer, oneLineTransformer],
      env.isDev()
    )
  );

  if (env.isDev()) {
    app.use(cors());
  }

  if (env.useLocalProxy()) {
    const { hostname } = new URL(env.frontUrl() || '');
    const apiProxy = createProxyMiddleware({
      target: env.apiUrlServerSide() || '',
      pathRewrite: { '^/backend': '' },
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': hostname,
      },
      logLevel: 'error',
      secure: false,
      // @toDo: add a logProvider parameter
    });
    app.use('/backend', apiProxy);
  }

  app.use(compression());
  app.use(express.json());
  app.use((req, res, next) => nonceUuidMiddleware(res, next));

  const cookieRouteRegex = /^\/.*(?<!(txt|js|png|jpg|jpeg|gif|ico|json))$/;
  app.use(cookieRouteRegex, cookiesMiddleware());
  app.use(cookieRouteRegex, assemblyCookiesMiddleware());

  app.use(
    favicon(`${ASSEMBLY_CLIENT_DIR}/${webpackManifest[ASSEMBLY_FAVICON_FILE]}`)
  );
  app.use((req, res, next) =>
    headersResponseMiddleware(
      {
        Server: 'AssemblyUiSSR',
        'X-Powered-By': 'AssemblyUiSSR',
        'Strict-Transport-Security':
          'max-age=31536000; includeSubDomains; preload',
        'X-Content-Type-Options': 'nosniff',
        'X-XSS-Protection': '0',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'X-Frame-Options': 'deny',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Expires: '0',
        Pragma: 'no-cache',
      },
      res,
      next
    )
  );
  app.use((req, res, next) => {
    const localsResponse = res as Response & { locals: { nonce: string } };
    assemblyCspMiddleware(req, localsResponse, next);
  });

  const fbConversionService = new FacebookConversion(
    env.fbPixelId() ?? ''
  ).getServerConversion(new ClientService(), env.fbConversionToken() ?? '');
  const twConversionService = new TwitterConversion(
    env.twPixelId() ?? ''
  ).getServerConversion(new ClientService(), {
    consumerApiKey: env.twAPIKey(),
    consumerApiSecret: env.twAPISecret(),
    accessToken: env.twAccessToken(),
    tokenSecret: env.twTokenSecret(),
  });

  initRoutes(app, { fbConversionService, twConversionService });

  return app;
};

export const app = getApp();
