import React from 'react';
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
import { NOTIF } from '@make.org/types/enums';
import { env } from '@make.org/assets/env';
import { SecureExpiredMessage } from '@make.org/components/Notifications/Banner/SecureExpired';
import {
  DESKTOP_DEVICE,
  MOBILE_DEVICE,
  PRIVACY_POLICY_DATE,
} from '@make.org/utils/constants/config';
import { simpleHash } from '@make.org/utils/helpers/simpleHash';
import webpackManifest from 'webpack-manifest';
import parser from 'ua-parser-js';
import ContextState from '@make.org/store';
import { TRANSLATION_NAMESPACE } from '@make.org/utils/i18n/constants';
import { StateRoot } from '@make.org/types';
import { Request, Response } from 'express';
import { Cookie } from 'universal-cookie';
import { AppContainer } from '../client/app';
import { CLIENT_DIR } from './paths';
import { logError, logInfo } from './ssr/helpers/ssr.helper';
import { ViewsService } from './service/ViewsService';

deepFreeze(initialState);

const statsFile = path.resolve(CLIENT_DIR, 'loadable-stats.json');

const htmlContent = fs.readFileSync(
  path.join(CLIENT_DIR, 'index.html'),
  'utf8'
);

const renderHtml = (
  reactApp: JSX.Element,
  appState: StateRoot,
  pwaManifest: any,
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
      `<head>${linkTags}<link rel="manifest" href="${pwaManifest}" />`
    )
    .replace('</head>', `${styles}</head>`)
    .replace('"__REDUX__"', JSON.stringify(appState))
    .replace(new RegExp('__LANG__', 'gi'), appState.appConfig.language)
    .replace(new RegExp('__API_URL__', 'gi'), env.apiUrl() || '')
    .replace(
      new RegExp('__PROXY_TARGET_API_URL__', 'gi'),
      env.proxyTargetApiUrl() || ''
    )
    .replace(new RegExp('__FRONT_URL__', 'gi'), env.frontUrl() || '')
    .replace(new RegExp('___NONCE_ID___', 'gi'), nonceId)
    .replace(new RegExp('___NODE_ENV___', 'gi'), env.nodeEnv() || 'production')
    .replace(new RegExp('___PORT___', 'gi'), env.port() || '')
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

  if (!country || !language) {
    logInfo({
      message: 'Country or language not found from request params',
      url: req.originalUrl,
      country: country || 'none',
      language: language || 'none',
      ...commonLogs,
    });
  }

  const { secureExpired, ...queryParams } = req.query;
  const countriesWithConsultations = await ViewsService.getCountries(
    country,
    language,
    () => {
      logInfo({
        message: 'ViewsService.getCountries return 404',
        url: req.originalUrl,
        ...commonLogs,
      });
    },
    () =>
      logError({
        message: `ViewsService.getCountries error`,
        url: req.originalUrl,
        ...commonLogs,
      })
  );

  const notificationBanner = secureExpired
    ? {
        id: NOTIF.SECURE_EXPIRED_MESSAGE,
        content: <SecureExpiredMessage />,
        level: NOTIF.NOTIFICATION_LEVEL_INFORMATION,
      }
    : {};

  const state: StateRoot = {
    ...initialState,
    ...routeState,
    appConfig: {
      ...initialState.appConfig,
      ...routeState?.appConfig,
      source: 'core',
      language,
      country,
      translations: i18n.getResourceBundle(language, TRANSLATION_NAMESPACE),
      queryParams,
      countriesWithConsultations,
      device: isMobileOrTablet ? MOBILE_DEVICE : DESKTOP_DEVICE,
      privacyPolicy: PRIVACY_POLICY_DATE,
    },
    notifications: {
      ...initialState.notifications,
      ...routeState?.notifications,
      banner: notificationBanner,
    },
  };

  const context = {};

  const ReactApp = (
    <CookiesProvider cookies={req.universalCookies}>
      <HeadProvider>
        <ContextState serverState={state}>
          <StaticRouter location={req.url} context={context}>
            <AppContainer />
          </StaticRouter>
        </ContextState>
      </HeadProvider>
    </CookiesProvider>
  );

  const pwaManifest = webpackManifest['favicon/manifest.json'];

  const reactHtml = renderHtml(ReactApp, state, pwaManifest, res);

  if (!reactHtml) {
    return res.status(404).end();
  }
  // add log here
  logInfo({
    message: 'app-served-from-server',
    url: req.originalUrl,
    ...commonLogs,
  });

  return res.send(reactHtml);
};
