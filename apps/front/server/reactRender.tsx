import React, { JSXElementConstructor, ReactElement } from 'react';
import fs from 'fs';
import path from 'path';
import { ChunkExtractor } from '@loadable/server';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { ServerStyleSheet } from 'styled-components';
import { HeadProvider } from 'react-head';
import i18n from 'i18next';
import deepFreeze from 'deep-freeze';
import { initialState } from '@make.org/store/initialState';
import { env } from '@make.org/assets/env';
import {
  DESKTOP_DEVICE,
  MOBILE_DEVICE,
  PRIVACY_POLICY_DATE,
} from '@make.org/utils/constants/config';
import { simpleHash } from '@make.org/utils/helpers/simpleHash';
import webpackManifest from 'webpack-manifest';
import parser from 'ua-parser-js';
import ContextState from '@make.org/store';
import { TRANSLATION_COMMON_NAMESPACE } from '@make.org/utils/i18n/constants';
import { StateRoot, StateTrackingConsent } from '@make.org/types';
import { Request, Response } from 'express';
import { Cookie } from 'universal-cookie';
import serialize from 'serialize-javascript';
import { COOKIE } from '@make.org/types/enums';
import { trackingConsent_state } from '@make.org/store/reducers/user/trackingConsent';
import { ServerLogger } from '@make.org/logger/serverLogger';
import { AppContainer } from '../client/app';
import { ViewsService } from './service/ViewsService';
import { translationRessoucesLanguages } from '../i18n';
import { APP_CLIENT_DIR } from './paths';

deepFreeze(initialState);

const statsFile = path.resolve(APP_CLIENT_DIR, 'loadable-stats.json');

const htmlContent = fs.readFileSync(
  path.join(APP_CLIENT_DIR, 'index.html'),
  'utf8'
);

const renderHtml = (
  reactApp: JSX.Element,
  appState: StateRoot,
  metaTags: any,
  pwaManifest: unknown,
  res: Response
) => {
  if (!htmlContent) {
    return false;
  }

  const extractor = new ChunkExtractor({ statsFile });

  const sheet = new ServerStyleSheet();

  const jsx = extractor.collectChunks(reactApp);

  const body = ReactDOMServer.renderToString(sheet.collectStyles(jsx));
  const styles = sheet.getStyleTags();
  const scriptTags = extractor.getScriptTags();
  const linkTags = extractor.getLinkTags();
  const nonceId = res.locals.nonce;

  const content = htmlContent
    .replace(/<div id="app"><\/div>/, `<div id="app">${body}</div>`)
    .replace(
      '<head>',
      `<head>${ReactDOMServer.renderToString(
        metaTags
      )}${linkTags}<link rel="manifest" href="${pwaManifest}" />`
    )
    .replace('</head>', `${styles}</head>`)
    .replace('"__INITIAL_STATE__"', serialize(appState, { isJSON: true }))
    .replace(/__LANG__/gi, appState.appConfig.language)
    .replace(/___API_URL_CLIENT_SIDE___/gi, env.apiUrlClientSide() || '')
    .replace(/___FB_PIXEL_ID___/gi, env.fbPixelId() || '')
    .replace(/___TW_PIXEL_ID___/gi, env.twPixelId() || '')
    .replace(/__FRONT_URL__/gi, env.frontUrl() || '')
    .replace(/___NONCE_ID___/gi, nonceId)
    .replace(/___NODE_ENV___/gi, env.nodeEnv() || 'production')
    .replace(/___PORT___/gi, env.port() || '')
    .replace(/___HOTJAR_TOKEN___/gi, env.hotjarToken() || '')
    .replace(/___TOLD_TOKEN___/gi, env.toldToken() || '')
    .replace('</body>', `${scriptTags}</body>`);

  return content;
};

declare global {
  interface Window {
    INITIAL_STATE?: StateRoot;
  }
}

// @todo test this function!!
export const reactRender = async (
  req: Request & Cookie,
  res: Response,
  routeState: StateRoot
): Promise<any> => {
  const { country, language } = req.params;
  const { browser, os, device, ua } = parser(req.headers['user-agent']);
  const isMobileOrTablet = device.type === 'mobile' || device.type === 'tablet';
  const commonLogs = {
    name: 'react-render',
    app_browser_name: browser.name,
    app_browser_version: browser.version,
    app_os_name: os.name,
    app_os_version: os.version,
    app_device_model: device.model,
    app_device_type: device.type,
    app_device_vendor: device.vendor,
    app_browser_raw: ua,
    app_browser_hash: simpleHash(ua),
  };

  const logger = ServerLogger.getInstance();
  if (res.statusCode !== 404 && !(country && language)) {
    logger.logInfo({
      message: 'Country or language not found from request params',
      url: req.originalUrl,
      country: country || 'none',
      language: language || 'none',
      ...commonLogs,
    });
  }

  const { ...queryParams } = req.query;
  const countriesWithConsultations = await ViewsService.getCountries(
    country,
    language,
    () => {
      logger.logInfo({
        message: 'ViewsService.getCountries return 404',
        url: req.originalUrl,
        ...commonLogs,
      });
    },
    () =>
      logger.logError({
        message: `ViewsService.getCountries error`,
        url: req.originalUrl,
        ...commonLogs,
      })
  );

  // get tracking consent from cookie
  const preferencesFromCookie: {
    language: string;
    tracking_consent: StateTrackingConsent;
  } = req.universalCookies.get(COOKIE.USER_PREFERENCES);
  const baseState = {
    ...initialState,
    ...routeState,
  };

  const state: StateRoot = {
    ...baseState,
    appConfig: {
      ...baseState.appConfig,
      source: 'core',
      language,
      country,
      translations: i18n.getResourceBundle(
        language,
        TRANSLATION_COMMON_NAMESPACE
      ),
      queryParams,
      availableTranslations: translationRessoucesLanguages,
      countriesWithConsultations,
      device: isMobileOrTablet ? MOBILE_DEVICE : DESKTOP_DEVICE,
      privacyPolicy: PRIVACY_POLICY_DATE,
    },
    modal: {
      ...baseState.modal,
      showCookies: !preferencesFromCookie.tracking_consent,
    },
    user: {
      ...baseState.user,
      trackingConsent:
        preferencesFromCookie?.tracking_consent || trackingConsent_state,
    },
  };

  const context = {};
  const headTags:
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>[]
    | undefined = [];

  const ReactApp = (
    <CookiesProvider cookies={req.universalCookies}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore: remove after upgrade to react18 */}
      <HeadProvider headTags={headTags}>
        <ContextState serverState={state}>
          <StaticRouter location={req.url} context={context}>
            <AppContainer />
          </StaticRouter>
        </ContextState>
      </HeadProvider>
    </CookiesProvider>
  );

  const pwaManifest = webpackManifest['favicon/manifest.json'];

  const reactHtml = renderHtml(ReactApp, state, headTags, pwaManifest, res);

  if (!reactHtml) {
    return res.status(404).end();
  }

  return res.send(reactHtml);
};
