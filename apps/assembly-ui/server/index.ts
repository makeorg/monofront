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

  app.use((req, res, next) => nonceUuidMiddleware(res, next));
  app.use(compression());
  app.use(express.json());
  app.use(
    favicon(`${ASSEMBLY_CLIENT_DIR}/${webpackManifest[ASSEMBLY_FAVICON_FILE]}`)
  );
  app.use(cookiesMiddleware());
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

  initRoutes(app);

  return app;
};

export const app = getApp();
