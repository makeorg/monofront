import express, { Application, Response, Request } from 'express';
import serveStatic from 'serve-static';
import {
  // ROUTE_ASSEMBLY_ROOT,
  // ROUTE_ASSEMBLY_CUSTOMER,
  ROUTE_ASSEMBLY_EVENT,
  ROUTE_ASSEMBLY_NOT_FOUND,
} from '../utils/routes';
import { defaultRoute } from './ssr/defaultRoute';
import {
  ASSEMBLY_IMAGES_DIR,
  ASSEMBLY_ASSETS_DIR,
  ASSEMBLY_JS_DIR,
  ASSEMBLY_FAVICON_DIR,
} from './paths';
import * as technicalPages from './technicalPages';

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
    '/favicon',
    express.static(ASSEMBLY_FAVICON_DIR, {
      setHeaders: setCustomCacheControl,
    })
  );

  app.use(
    '/assets',
    express.static(ASSEMBLY_ASSETS_DIR, {
      setHeaders: setCustomCacheControl,
    })
  );

  app.use(
    '/js',
    express.static(ASSEMBLY_JS_DIR, {
      setHeaders: setCustomCacheControl,
    })
  );

  app.use(
    '/images',
    express.static(ASSEMBLY_IMAGES_DIR, {
      setHeaders: setCustomCacheControl,
    })
  );

  // app.use('/api');  Reactivate when need, it needs a middleware or crashes the app

  // Assembly Routes
  app.get('/robots.txt', technicalPages.renderRobot);
  app.get('/.well-known/security.txt', technicalPages.renderSecurityTxt);
  app.get('/security.txt', technicalPages.renderSecurityTxt);
  app.get('/version', technicalPages.renderVersion);

  // Assembly redirect
  // app.get(ROUTE_ASSEMBLY_CUSTOMER, defaultRoute);
  // app.get(ROUTE_ASSEMBLY_ROOT, defaultRoute);
  app.get(ROUTE_ASSEMBLY_EVENT, defaultRoute);
  app.get(ROUTE_ASSEMBLY_NOT_FOUND, defaultRoute);

  // not found
  app.get('*', (req: Request, res: Response) => {
    res.status(404);

    return defaultRoute(req, res);
  });
};
