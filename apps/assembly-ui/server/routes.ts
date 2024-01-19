import express, { Application, Response, Request } from 'express';
import serveStatic from 'serve-static';
import {
  LLM_PATH,
  // ROUTE_ASSEMBLY_ROOT,
  // ROUTE_ASSEMBLY_CUSTOMER,
  ROUTE_ASSEMBLY_EVENT,
  ROUTE_ASSEMBLY_NOT_FOUND,
  ROUTE_ASSEMBLY_PRIVACY_POLICY,
  ROUTE_ASSEMBLY_COOKIES,
  ROUTE_ASSEMBLY_LEGAL,
} from '../utils/routes';
import { defaultRoute } from './ssr/defaultRoute';
import { eventRoute } from './ssr/eventRoute';
import {
  ASSEMBLY_IMAGES_DIR,
  ASSEMBLY_ASSETS_DIR,
  ASSEMBLY_JS_DIR,
  ASSEMBLY_FAVICON_DIR,
} from './paths';
import * as technicalPages from './technicalPages';
import { getLLMAnswer } from './api/LLM';

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

  app.use(LLM_PATH, getLLMAnswer);

  // Assembly Routes
  app.get('/robots.txt', technicalPages.renderRobot);
  app.get('/.well-known/security.txt', technicalPages.renderSecurityTxt);
  app.get('/security.txt', technicalPages.renderSecurityTxt);
  app.get('/version', technicalPages.renderVersion);

  // Assembly redirect
  // app.get(ROUTE_ASSEMBLY_CUSTOMER, defaultRoute);
  // app.get(ROUTE_ASSEMBLY_ROOT, defaultRoute);
  app.get(ROUTE_ASSEMBLY_EVENT, eventRoute);
  app.get(ROUTE_ASSEMBLY_NOT_FOUND, defaultRoute);
  app.get(ROUTE_ASSEMBLY_PRIVACY_POLICY, defaultRoute);
  app.get(ROUTE_ASSEMBLY_LEGAL, defaultRoute);
  app.get(ROUTE_ASSEMBLY_COOKIES, defaultRoute);

  // not found
  app.get('*', (req: Request, res: Response) => {
    res.status(404);

    return defaultRoute(req, res);
  });
};
