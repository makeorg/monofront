import express, { Response } from 'express';
import compression from 'compression';
import favicon from 'serve-favicon';
import cors from 'cors';
import { ApiService } from '@make.org/api/ApiService';
import { ApiServiceServer } from '@make.org/api/ApiService/ApiService.server';
import { createProxyMiddleware } from 'http-proxy-middleware';
import webpackManifest from 'webpack-manifest';
import { env } from '@make.org/assets/env';
import { widgetCspMiddleware } from '@make.org/utils/middleware/contentSecurityPolicy';
import { headersResponseMiddleware } from '@make.org/utils/middleware/headers';
import { nonceUuidMiddleware } from '@make.org/utils/middleware/nonceUuid';
import { secureMiddleware } from '@make.org/utils/middleware/secure';
import { maintenanceMiddleware } from '@make.org/utils/middleware/maintenance';
import { getLoggerInstance, initLogger } from '@make.org/logger';
import {
  errorNormalizer,
  objectNormalizer,
  stringNormalizer,
} from '@make.org/logger/loggerNormalizer';

import {
  getStackTransformer,
  oneLineTransformer,
} from '@make.org/logger/loggerTransformer';
import { apiErrorDataLogNormalizer } from '@make.org/api/log/apiErrorDataLogNormalizer';
import { initRoutes } from './routes';
import { serverInitI18n } from './i18n';
import {
  WIDGET_BUILD_DIR,
  WIDGET_CLIENT_DIR,
  WIDGET_FAVICON_FILE,
  WIDGET_JS_DIR,
  WIDGET_MAP_DIR,
} from './paths';

serverInitI18n();
ApiService.strategy = new ApiServiceServer(env.apiUrlServerSide() as string);
// App
const getApp = () => {
  const app = express();

  getStackTransformer(WIDGET_JS_DIR, WIDGET_BUILD_DIR, WIDGET_MAP_DIR).then(
    stackTransformer =>
      initLogger(
        'make-widget',
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
  const logger = getLoggerInstance();

  if (env.isDev()) {
    app.use(cors());
  }

  const { hostname } = new URL(env.frontUrl() || '');

  if (env.useLocalProxy()) {
    const apiProxy = createProxyMiddleware({
      target: env.apiUrlServerSide() || '',
      pathRewrite: { '^/backend': '' },
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': hostname,
      },
      logLevel: 'error',
      secure: false,
      logProvider: () => ({
        log: logger.logInfo,
        debug: logger.logInfo,
        info: logger.logInfo,
        warn: logger.logWarning,
        error: logger.logError,
      }),
    });
    app.use('/backend', apiProxy);
  }

  app.use((req, res, next) => nonceUuidMiddleware(res, next));
  app.use(compression());
  app.use(express.json());
  app.use(
    favicon(`${WIDGET_CLIENT_DIR}/${webpackManifest[WIDGET_FAVICON_FILE]}`)
  );
  app.use(secureMiddleware);
  app.use((req, res, next) =>
    maintenanceMiddleware(req, res, next, logger.logError)
  );
  app.use((req, res, next) =>
    headersResponseMiddleware(
      {
        Server: 'MakeSSR',
        'X-Powered-By': 'MakeSSR',
        'Strict-Transport-Security':
          'max-age=31536000; includeSubDomains; preload',
        'X-Content-Type-Options': 'nosniff',
        'X-XSS-Protection': '0',
        'Referrer-Policy': 'no-referrer-when-downgrade',
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
    widgetCspMiddleware(req, localsResponse, next);
  });

  initRoutes(app);

  return app;
};

export const app = getApp();
