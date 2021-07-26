import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookiesMiddleware from 'universal-cookie-express';
import favicon from 'serve-favicon';
import cors from 'cors';
import { ApiService } from '@make.org/api/ApiService';
import { ApiServiceServer } from '@make.org/api/ApiService/ApiService.server';
import { createProxyMiddleware } from 'http-proxy-middleware';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackManifest from 'webpack-manifest';
import { logInfo, logError, logWarning } from './ssr/helpers/ssr.helper';
import devConfig from '../webpack/config.babel.js';
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

  if (process.env.NODE_ENV === 'development') {
    app.use(cors());
    const compiler = webpack(devConfig as webpack.Configuration);

    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: '/',
        serverSideRender: true,
        writeToDisk(filePath: string) {
          return /loadable-stats/.test(filePath);
        },
      })
    );
    // app.use(webpackHotMiddleware(compiler as ICompiler));
  }

  const { hostname } = new URL(process.env.FRONT_URL || '');
  const apiProxy = createProxyMiddleware({
    target: process.env.PROXY_TARGET_API_URL,
    pathRewrite: { '^/api-local': '' },
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

  app.use('/api-local', apiProxy);
  app.use((req, res, next) => nonceUuidMiddleware(res, next));
  app.use(compression());
  app.use(bodyParser.json());
  app.use(favicon(`${CLIENT_DIR}/${webpackManifest[FAVICON_FILE]}`));
  app.use(cookiesMiddleware());
  app.use((req, res, next) => headersResponseMiddleware(res, next));

  // apply csp everywhere except on styleguide /doc
  app.use(/^(?!.*doc).*$/, cspMiddleware);

  initRoutes(app);

  return app;
};

export const app = getApp();
