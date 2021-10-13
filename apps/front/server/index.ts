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
import { serverInitI18n } from './i18n';
import { initRoutes } from './routes';
import { APP_CLIENT_DIR, APP_FAVICON_FILE } from './paths';
import { logError, logInfo, logWarning } from './ssr/helpers/ssr.helper';

serverInitI18n();
ApiService.strategy = new ApiServiceServer();
// App
const getApp = () => {
  const app = express();

  if (env.isDev()) {
    app.use(cors());
  }

  const { hostname } = new URL(env.frontUrl() || '');

  if (env.proxyTargetApiUrl()) {
    const apiProxy = createProxyMiddleware({
      target: env.proxyTargetApiUrl() || '',
      pathRewrite: { '^/backend': '' },
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': hostname,
      },
      logLevel: 'error',
      secure: false,
      logProvider: () => ({
        log: logInfo,
        debug: logInfo,
        info: logInfo,
        warn: logWarning,
        error: logError,
      }),
    });
    app.use('/backend', apiProxy);
  }

  app.use((req, res, next) => nonceUuidMiddleware(res, next));
  app.use(compression());
  app.use(express.json());
  app.use(favicon(`${APP_CLIENT_DIR}/${webpackManifest[APP_FAVICON_FILE]}`));
  app.use(cookiesMiddleware());
  app.use((req, res, next) => headersResponseMiddleware(res, next));
  app.use((req, res, next) => {
    const localsResponse = res as Response & { locals: { nonce: string } };
    cspMiddleware(localsResponse, next);
  });

  initRoutes(app);

  return app;
};

export const app = getApp();
