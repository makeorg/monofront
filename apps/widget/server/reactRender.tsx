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
import { initialState } from '@make.org/store/initialState';
import { env } from '@make.org/assets/env';
import {
  DEFAULT_COUNTRY,
  DESKTOP_DEVICE,
  MOBILE_DEVICE,
  PRIVACY_POLICY_DATE,
} from '@make.org/utils/constants/config';
import { simpleHash } from '@make.org/utils/helpers/simpleHash';
import parser from 'ua-parser-js';
import ContextState from '@make.org/store';
import { TRANSLATION_NAMESPACE } from '@make.org/utils/i18n/constants';
import { StateRoot } from '@make.org/types';
import { Request, Response } from 'express';
import { Cookie } from 'universal-cookie';
import { getLanguageFromCountryCode } from '@make.org/utils/helpers/countries';
import deepFreeze from 'deep-freeze';
import { WIDGET_CLIENT_DIR } from './paths';
import { logError, logInfo } from './helpers/ssr.helper';
import App from '../client/App';

deepFreeze(initialState);

const statsFile = path.resolve(WIDGET_CLIENT_DIR, 'loadable-stats.json');

const htmlContent = fs.readFileSync(
  path.join(WIDGET_CLIENT_DIR, 'index.html'),
  'utf8'
);

const renderHtml = (
  reactApp: JSX.Element,
  appState: StateRoot,
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
    .replace('<head>', `<head>${linkTags}`)
    .replace('</head>', `${styles}</head>`)
    .replace('"__INITIAL_STATE__"', JSON.stringify(appState))
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
  const { ...queryParams } = req.query;
  const { country, questionSlug, hash, owner } = req.query;

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

  const language = getLanguageFromCountryCode(country || DEFAULT_COUNTRY);

  const state: StateRoot = {
    ...initialState,
    ...routeState,
    appConfig: {
      ...initialState.appConfig,
      ...routeState?.appConfig,
      source: 'widget',
      language,
      country: country || DEFAULT_COUNTRY,
      translations: i18n.getResourceBundle(language, TRANSLATION_NAMESPACE),
      queryParams,
      device: isMobileOrTablet ? MOBILE_DEVICE : DESKTOP_DEVICE,
      privacyPolicy: PRIVACY_POLICY_DATE,
    },
  };

  const context = {};
  const headTags:
    | ReactElement<unknown, string | JSXElementConstructor<any>>[]
    | undefined = [];

  const ReactApp = (
    <CookiesProvider cookies={req.universalCookies}>
      <HeadProvider headTags={headTags}>
        <ContextState serverState={state}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </ContextState>
      </HeadProvider>
    </CookiesProvider>
  );

  const reactHtml = renderHtml(ReactApp, state, res);

  if (!reactHtml) {
    return res.status(404).end();
  }

  if (!questionSlug || !country || !hash || !owner) {
    state.appConfig.maintenance = true;
    logError({
      message: 'Missing mandatory query params in request',
      url: req.originalUrl,
      ...commonLogs,
    });
    return res.send(reactHtml);
  }

  // add log here
  logInfo({
    message: 'app-served-from-server',
    url: req.originalUrl,
    ...commonLogs,
  });

  return res.send(reactHtml);
};
