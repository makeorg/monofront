import express, { Response } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookiesMiddleware from 'universal-cookie-express';
import favicon from 'serve-favicon';
import cors from 'cors';
import { ApiService } from '@make.org/api/ApiService';
import { ApiServiceServer } from '@make.org/api/ApiService/ApiService.server';
import { createProxyMiddleware } from 'http-proxy-middleware';
import webpackManifest from 'webpack-manifest';
import { env } from '@make.org/assets/env';
import { logInfo, logError, logWarning } from './ssr/helpers/ssr.helper';
import { initRoutes } from './routes';
import { serverInitI18n } from './i18n';
import { cspMiddleware } from './middleware/contentSecurityPolicy';
import { headersResponseMiddleware } from './middleware/headers';
import { nonceUuidMiddleware } from './middleware/nonceUuid';
import { CLIENT_DIR, FAVICON_FILE } from './paths';

serverInitI18n();
ApiService.strategy = new ApiServiceServer();
// App
const getApp = () => {
  const app = express();

  if (env.isDev()) {
    app.use(cors());
  }

  const { hostname } = new URL(env.frontUrl() || '');
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
  app.use((req, res, next) => nonceUuidMiddleware(res, next));
  app.use(compression());
  app.use(bodyParser.json());
  app.use(favicon(`${CLIENT_DIR}/${webpackManifest[FAVICON_FILE]}`));
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
