import express, { Application, Response, Request } from 'express';
import serveStatic from 'serve-static';
import { IConversionServerService } from '@make.org/tracking/interface';
import {
  FbConversionEventClientType,
  TwConversionEventClientType,
} from '@make.org/tracking/types';
import {
  LLM_PATH,
  DOCUMENTS_PATH,
  // ROUTE_ASSEMBLY_ROOT,
  // ROUTE_ASSEMBLY_CUSTOMER,
  ROUTE_ASSEMBLY_EVENT,
  ROUTE_ASSEMBLY_NOT_FOUND,
  ROUTE_ASSEMBLY_PRIVACY_POLICY,
  ROUTE_ASSEMBLY_COOKIES,
  ROUTE_ASSEMBLY_LEGAL,
  ROUTE_ASSEMBLY_ABOUT,
  ROUTE_ASSEMBLY_FB_CONVERSION,
  ROUTE_ASSEMBLY_TW_CONVERSION,
  ROUTE_ASSEMBLY_CONSENT,
  ROUTE_ASSEMBLY_LOGGER,
  ROUTE_ASSEMBLY_EVENT_DOCUMENT_SOURCES,
} from '../utils/routes';
import { defaultRoute } from './ssr/defaultRoute';
import { eventRoute } from './ssr/eventRoute';
import { documentSourcesRoute } from './ssr/documentSourcesRoute';
import {
  ASSEMBLY_IMAGES_DIR,
  ASSEMBLY_ASSETS_DIR,
  ASSEMBLY_JS_DIR,
  ASSEMBLY_FAVICON_DIR,
} from './paths';
import * as technicalPages from './technicalPages';
import * as conversionApi from './conversionApi';
import { getLLMAnswer } from './api/LLM';
import { getDocumentSources } from './api/Sources';
import { consentRoute } from './ssr/consentRoute';
import { loggerRoute } from './ssr/loggerRoute';

function setCustomCacheControl(res: Response, path: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: remove comment after upgrade
  if (serveStatic.mime.lookup(path) !== 'text/html') {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.removeHeader('Expires');
    res.removeHeader('Pragma');
  }
}

export const initRoutes = (
  app: Application,
  {
    fbConversionService,
    twConversionService,
  }: {
    fbConversionService: IConversionServerService<FbConversionEventClientType>;
    twConversionService: IConversionServerService<TwConversionEventClientType>;
  }
): void => {
  // Static files
  app.use(
    '/beta/favicon',
    express.static(ASSEMBLY_FAVICON_DIR, {
      setHeaders: setCustomCacheControl,
    })
  );

  app.use(
    '/beta/assets',
    express.static(ASSEMBLY_ASSETS_DIR, {
      setHeaders: setCustomCacheControl,
    })
  );

  app.use(
    '/beta/js',
    express.static(ASSEMBLY_JS_DIR, {
      setHeaders: setCustomCacheControl,
    })
  );

  app.use(
    '/beta/images',
    express.static(ASSEMBLY_IMAGES_DIR, {
      setHeaders: setCustomCacheControl,
    })
  );

  app.use(LLM_PATH, getLLMAnswer);

  app.use(DOCUMENTS_PATH, getDocumentSources);
  // Assembly Routes
  app.get('/robots.txt', technicalPages.renderRobot);
  app.get('/.well-known/security.txt', technicalPages.renderSecurityTxt);
  app.get('/security.txt', technicalPages.renderSecurityTxt);
  app.get('/version', technicalPages.renderVersion);
  app.post(
    ROUTE_ASSEMBLY_FB_CONVERSION,
    conversionApi.renderConversionFacebook(fbConversionService)
  );
  app.post(
    ROUTE_ASSEMBLY_TW_CONVERSION,
    conversionApi.renderConversionTwitter(twConversionService)
  );
  app.post(ROUTE_ASSEMBLY_CONSENT, consentRoute);
  app.post(ROUTE_ASSEMBLY_LOGGER, loggerRoute);

  // Assembly redirect
  // app.get(ROUTE_ASSEMBLY_CUSTOMER, defaultRoute);
  // app.get(ROUTE_ASSEMBLY_ROOT, defaultRoute);
  app.get(ROUTE_ASSEMBLY_EVENT, eventRoute);
  app.get(ROUTE_ASSEMBLY_EVENT_DOCUMENT_SOURCES, documentSourcesRoute);
  app.get(ROUTE_ASSEMBLY_NOT_FOUND, defaultRoute);
  app.get(ROUTE_ASSEMBLY_PRIVACY_POLICY, defaultRoute);
  app.get(ROUTE_ASSEMBLY_LEGAL, defaultRoute);
  app.get(ROUTE_ASSEMBLY_COOKIES, defaultRoute);
  app.get(ROUTE_ASSEMBLY_ABOUT, defaultRoute);

  // not found
  app.get('*', (req: Request, res: Response) => {
    res.status(404);

    return defaultRoute(req, res);
  });
};
