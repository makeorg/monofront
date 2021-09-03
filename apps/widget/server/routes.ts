import express, { Application, Response } from 'express';
import serveStatic from 'serve-static';
import { metricsMiddleware } from '@make.org/utils/middleware/metrics';
import { WIDGET_IMAGES_DIR, WIDGET_ASSETS_DIR, WIDGET_JS_DIR } from './paths';
import { loggerApi } from './api/logger';
import * as technicalPages from './technicalPages';
import { mainRoute } from './mainRoute';

function setCustomCacheControl(res: Response, path: string) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'public, max-age=0');
  }
}

export const initRoutes = (app: Application): void => {
  // Static files
  app.use(
    '/assets',
    express.static(WIDGET_ASSETS_DIR, {
      maxAge: '1y',
      setHeaders: setCustomCacheControl,
    })
  );

  app.use(
    '/js',
    express.static(WIDGET_JS_DIR, {
      maxAge: '1y',
      setHeaders: setCustomCacheControl,
    })
  );

  app.use(
    '/images',
    express.static(WIDGET_IMAGES_DIR, {
      maxAge: '1y',
      setHeaders: setCustomCacheControl,
    })
  );

  app.post('/api/logger', loggerApi);

  // Widget Routes
  app.get('/', metricsMiddleware, mainRoute);
  app.get('/robots.txt', technicalPages.renderRobot);
  app.get('/.well-known/security.txt', technicalPages.renderSecurityTxt);
  app.get('/security.txt', technicalPages.renderSecurityTxt);
  app.get('/version', technicalPages.renderVersion);
};
