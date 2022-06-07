import express, { Application, Request, Response, NextFunction } from 'express';
import serveStatic from 'serve-static';
import { countryLanguageMiddleware } from '@make.org/utils/middleware/countryLanguage';
import { metricsMiddleware } from '@make.org/utils/middleware/metrics';
import {
  redirectToCountry,
  redirectCountryLanguageUrl,
} from '@make.org/utils/middleware/redirect';
import {
  ROUTE_COUNTRY,
  ROUTE_SEQUENCE,
  ROUTE_SEQUENCE_POPULAR,
  ROUTE_SEQUENCE_CONTROVERSIAL,
  ROUTE_SEQUENCE_KEYWORD,
  ROUTE_ACCOUNT_ACTIVATION,
  ROUTE_PROPOSAL,
  ROUTE_PASSWORD_RECOVERY,
  ROUTE_PARTICIPATE,
  ROUTE_EXPLORE,
  ROUTE_PROFILE,
  ROUTE_PROFILE_PROPOSALS,
  ROUTE_PROFILE_FAVOURITES,
  ROUTE_PROFILE_EDIT,
  ROUTE_ORGANISATION_PROFILE,
  ROUTE_ORGANISATION_PROPOSALS,
  ROUTE_ORGANISATION_VOTES,
  ROUTE_SEARCH,
  ROUTE_SEARCH_CONSULTATIONS,
  ROUTE_SEARCH_PROPOSALS,
  ROUTE_SEARCH_ORGANISATIONS,
  ROUTE_STATIC_LEGAL_FR,
  ROUTE_STATIC_CONTACT_FR,
  ROUTE_STATIC_DATA_FR,
  ROUTE_STATIC_GTU_FR,
  ROUTE_RESULTS,
  ROUTE_TOP_IDEAS,
  ROUTE_TOP_IDEA_DETAILS,
  ROUTE_PERSONALITY_PROFILE,
  ROUTE_PROFILE_OPINIONS,
  ROUTE_STATIC_GTU_EN,
  ROUTE_STATIC_DATA_EN,
  ROUTE_STATIC_LEGAL_EN,
  ROUTE_BROWSE_CONSULTATIONS,
  ROUTE_BROWSE_RESULTS,
  BASE_PREVIEW_PATH,
  ROUTE_COUNTRY_LANG,
  ROUTE_CONSULTATION,
  ROUTE_STATIC_COOKIES,
  ROUTE_STATIC_A11Y_FR,
  ROUTE_STATIC_LEGAL_DE,
  ROUTE_STATIC_DATA_DE,
  ROUTE_STATIC_GTU_DE,
  ROUTE_STATIC_A11Y_DE,
  ROUTE_STATIC_CONTACT_DE,
} from '@make.org/utils/routes';
import { fBConversionApi } from '@make.org/utils/services/FBApiConversion';
import { sequenceByKindRoute } from './ssr/sequenceByKindRoute';
import {
  APP_IMAGES_DIR,
  APP_REPORTS_DIR,
  APP_DOC_DIR,
  APP_ASSETS_DIR,
  APP_JS_DIR,
  APP_FAVICON_DIR,
  APP_CONVENTION_DIR,
} from './paths';
import { questionResults } from './api/question';
import { loggerApi } from './api/logger';
import * as technicalPages from './technicalPages';

import { accountActivationRoute } from './ssr/accountActivationRoute';
import { defaultRoute } from './ssr/defaultRoute';
import { questionRoute } from './ssr/questionRoute';
import { sequenceRoute } from './ssr/sequenceRoute';
import { passwordRecoveryRoute } from './ssr/passwordRecoveryRoute';
import { homepageRoute } from './ssr/homepageRoute';

function setCustomCacheControl(res: Response, path: string) {
  if (serveStatic.mime.lookup(path) !== 'text/html') {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.removeHeader('Expires');
    res.removeHeader('Pragma');
  }
}

function setAttachementContentDisposition(res: Response, path: string) {
  res.setHeader('Content-Disposition', 'attachment');
}

export const initRoutes = (app: Application): void => {
  // Static files
  app.use(
    '/favicon',
    express.static(APP_FAVICON_DIR, {
      setHeaders: setCustomCacheControl,
    })
  );

  app.use(
    '/assets',
    express.static(APP_ASSETS_DIR, {
      setHeaders: setCustomCacheControl,
    })
  );

  app.use(
    '/js',
    express.static(APP_JS_DIR, {
      setHeaders: setCustomCacheControl,
    })
  );

  app.use(
    '/images',
    express.static(APP_IMAGES_DIR, {
      setHeaders: setCustomCacheControl,
    })
  );

  app.use(
    '/reports',
    express.static(APP_REPORTS_DIR, {
      setHeaders: setCustomCacheControl,
    })
  );

  app.use(
    '/convention',
    express.static(APP_CONVENTION_DIR, {
      setHeaders: setAttachementContentDisposition,
    })
  );

  app.use('/doc', express.static(APP_DOC_DIR));

  // API Routes
  app.get('/api/results/:questionSlug', questionResults);
  app.post('/api/logger', loggerApi);
  app.post('/api/conversion', fBConversionApi);

  const frontMiddlewares = [countryLanguageMiddleware, metricsMiddleware];

  // manage preview routes
  const addGetWithPreview = (
    path: string,
    customMiddleware: ((
      req: Request,
      res: Response,
      next: NextFunction
    ) => void)[],
    route: (req: Request, res: Response) => Promise<any>
  ) => {
    app.get(path, customMiddleware, route);
    app.get(`${BASE_PREVIEW_PATH}${path}`, customMiddleware, route);
  };

  // Front Routes
  app.get('/', redirectToCountry);
  app.get('/robots.txt', technicalPages.renderRobot);
  app.get('/.well-known/security.txt', technicalPages.renderSecurityTxt);
  app.get('/security.txt', technicalPages.renderSecurityTxt);
  app.get('/version', technicalPages.renderVersion);
  app.get(`${ROUTE_COUNTRY_LANG}`, redirectCountryLanguageUrl);
  app.get(`${ROUTE_COUNTRY_LANG}/*`, redirectCountryLanguageUrl);
  app.get(ROUTE_COUNTRY, frontMiddlewares, homepageRoute);

  app.get(ROUTE_BROWSE_CONSULTATIONS, frontMiddlewares, defaultRoute);
  app.get(ROUTE_BROWSE_RESULTS, frontMiddlewares, defaultRoute);
  app.get(ROUTE_CONSULTATION, frontMiddlewares, questionRoute);
  app.get(ROUTE_PARTICIPATE, frontMiddlewares, questionRoute);
  app.get(ROUTE_EXPLORE, frontMiddlewares, questionRoute);
  addGetWithPreview(ROUTE_RESULTS, frontMiddlewares, questionRoute);
  app.get(ROUTE_TOP_IDEAS, frontMiddlewares, questionRoute);
  app.get(ROUTE_TOP_IDEA_DETAILS, frontMiddlewares, questionRoute);
  app.get(ROUTE_SEQUENCE, frontMiddlewares, sequenceByKindRoute);
  app.get(ROUTE_SEQUENCE_POPULAR, frontMiddlewares, sequenceByKindRoute);
  app.get(ROUTE_SEQUENCE_CONTROVERSIAL, frontMiddlewares, sequenceByKindRoute);
  app.get(ROUTE_SEQUENCE_KEYWORD, frontMiddlewares, sequenceRoute);
  app.get(ROUTE_ACCOUNT_ACTIVATION, frontMiddlewares, accountActivationRoute);
  app.get(ROUTE_PROPOSAL, frontMiddlewares, defaultRoute);
  app.get(ROUTE_PASSWORD_RECOVERY, frontMiddlewares, passwordRecoveryRoute);

  app.get(ROUTE_ORGANISATION_PROFILE, frontMiddlewares, defaultRoute);
  app.get(ROUTE_ORGANISATION_PROPOSALS, frontMiddlewares, defaultRoute);
  app.get(ROUTE_ORGANISATION_VOTES, frontMiddlewares, defaultRoute);

  app.get(ROUTE_PERSONALITY_PROFILE, frontMiddlewares, defaultRoute);

  app.get(ROUTE_PROFILE_EDIT, frontMiddlewares, defaultRoute);
  app.get(ROUTE_PROFILE_PROPOSALS, frontMiddlewares, defaultRoute);
  app.get(ROUTE_PROFILE_FAVOURITES, frontMiddlewares, defaultRoute);
  app.get(ROUTE_PROFILE_OPINIONS, frontMiddlewares, defaultRoute);
  app.get(ROUTE_PROFILE, frontMiddlewares, defaultRoute);
  app.get(ROUTE_SEARCH, frontMiddlewares, defaultRoute);
  app.get(ROUTE_SEARCH_PROPOSALS, frontMiddlewares, defaultRoute);
  app.get(ROUTE_SEARCH_ORGANISATIONS, frontMiddlewares, defaultRoute);
  app.get(ROUTE_SEARCH_CONSULTATIONS, frontMiddlewares, defaultRoute);
  app.get(ROUTE_STATIC_COOKIES, frontMiddlewares, defaultRoute);

  // routes for fr language
  app.get(ROUTE_STATIC_LEGAL_FR, frontMiddlewares, defaultRoute);
  app.get(ROUTE_STATIC_DATA_FR, frontMiddlewares, defaultRoute);
  app.get(ROUTE_STATIC_GTU_FR, frontMiddlewares, defaultRoute);
  app.get(ROUTE_STATIC_A11Y_FR, frontMiddlewares, defaultRoute);
  app.get(ROUTE_STATIC_CONTACT_FR, frontMiddlewares, defaultRoute);

  // routes for en language
  app.get(ROUTE_STATIC_LEGAL_EN, frontMiddlewares, defaultRoute);
  app.get(ROUTE_STATIC_DATA_EN, frontMiddlewares, defaultRoute);
  app.get(ROUTE_STATIC_GTU_EN, frontMiddlewares, defaultRoute);

  // routes for de language
  app.get(ROUTE_STATIC_LEGAL_DE, frontMiddlewares, defaultRoute);
  app.get(ROUTE_STATIC_DATA_DE, frontMiddlewares, defaultRoute);
  app.get(ROUTE_STATIC_GTU_DE, frontMiddlewares, defaultRoute);
  app.get(ROUTE_STATIC_A11Y_DE, frontMiddlewares, defaultRoute);
  app.get(ROUTE_STATIC_CONTACT_DE, frontMiddlewares, defaultRoute);

  // not found
  app.get(
    `${ROUTE_COUNTRY}/*`,
    frontMiddlewares,
    (req: Request, res: Response) => {
      res.status(404);

      return defaultRoute(req, res);
    }
  );
  app.get('*', frontMiddlewares, (req: Request, res: Response) => {
    res.status(404);

    return defaultRoute(req, res);
  });
};
