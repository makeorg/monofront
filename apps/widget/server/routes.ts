import express, { Application, Response } from 'express';
import serveStatic from 'serve-static';
import { metricsMiddleware } from '@make.org/utils/middleware/metrics';
import { WIDGET_IMAGES_DIR, WIDGET_ASSETS_DIR, WIDGET_JS_DIR } from './paths';
import { loggerApi } from './api/logger';
import * as technicalPages from './technicalPages';
import { mainRoute } from './ssr/mainRoute';
import { maintenanceRoute } from './ssr/maintenanceRoute';

function setCustomCacheControl(res: Response, path: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: remove comment after upgrade
  if (serveStatic.mime.lookup(path) !== 'text/html') {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.removeHeader('Expires');
    res.removeHeader('Pragma');
  }
}

export const initRoutes = (app: Application): void => {
  // Static files
  app.use(
    '/assets',
    express.static(WIDGET_ASSETS_DIR, {
      setHeaders: setCustomCacheControl,
    })
  );

  app.use(
    '/js',
    express.static(WIDGET_JS_DIR, {
      setHeaders: setCustomCacheControl,
    })
  );

  app.use(
    '/images',
    express.static(WIDGET_IMAGES_DIR, {
      setHeaders: setCustomCacheControl,
    })
  );

  app.post('/api/logger', loggerApi);

  // Widget Routes
  app.get('/robots.txt', technicalPages.renderRobot);
  app.get('/.well-known/security.txt', technicalPages.renderSecurityTxt);
  app.get('/security.txt', technicalPages.renderSecurityTxt);
  app.get('/version', technicalPages.renderVersion);
  app.get('/demo', technicalPages.renderDemo);
  app.get('/maintenance', metricsMiddleware, maintenanceRoute);
  app.get('/', metricsMiddleware, mainRoute);
};
