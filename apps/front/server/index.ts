import express, { Response } from 'express';
import compression from 'compression';
import cookiesMiddleware from 'universal-cookie-express';
import favicon from 'serve-favicon';
import cors from 'cors';
import { ApiService } from '@make.org/api/ApiService';
import { ApiServiceServer } from '@make.org/api/ApiService/ApiService.server';
import { createProxyMiddleware } from 'http-proxy-middleware';
import webpackManifest from 'webpack-manifest';
import { env } from '@make.org/assets/env';
import { cspMiddleware } from '@make.org/utils/middleware/contentSecurityPolicy';
import { headersResponseMiddleware } from '@make.org/utils/middleware/headers';
import { nonceUuidMiddleware } from '@make.org/utils/middleware/nonceUuid';
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
import { ServerLogger } from '@make.org/logger/serverLogger';
import { serverInitI18n } from './i18n';
import { initRoutes } from './routes';
import {
  APP_BUILD_DIR,
  APP_CLIENT_DIR,
  APP_FAVICON_FILE,
  APP_JS_DIR,
  APP_MAP_DIR,
} from './paths';

serverInitI18n();
ApiService.strategy = new ApiServiceServer(env.apiUrlServerSide() as string);
// App
const getApp = () => {
  const app = express();

  getStackTransformer(APP_JS_DIR, APP_BUILD_DIR, APP_MAP_DIR).then(
    stackTransformer => {
      ServerLogger.init(
        'frontaccessible',
        [
          errorNormalizer,
          apiErrorDataLogNormalizer,
          stringNormalizer,
          objectNormalizer,
        ],
        [stackTransformer, oneLineTransformer],
        env.isDev()
      );
      ServerLogger.getInstance().logInfo('Logger is ready');
    }
  );

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
        log: m => ServerLogger.getInstance().logInfo(m),
        debug: m => ServerLogger.getInstance().logInfo(m),
        info: m => ServerLogger.getInstance().logInfo(m),
        warn: m => ServerLogger.getInstance().logWarning(m),
        error: m => ServerLogger.getInstance().logError(m),
      }),
    });
    app.use('/backend', apiProxy);
  }

  app.use((req, res, next) => nonceUuidMiddleware(res, next));
  app.use(compression());
  app.use(express.json());
  app.use(favicon(`${APP_CLIENT_DIR}/${webpackManifest[APP_FAVICON_FILE]}`));
  app.use(cookiesMiddleware());
  app.use((req, res, next) =>
    headersResponseMiddleware(
      {
        Server: 'MakeSSR',
        'X-Powered-By': 'MakeSSR',
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
    cspMiddleware(req, localsResponse, next);
  });

  initRoutes(app);

  return app;
};

export const app = getApp();
