import React, { JSXElementConstructor, ReactElement } from 'react';
import fs from 'fs';
import path from 'path';
import { ChunkExtractor } from '@loadable/server';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';
import { HeadProvider } from 'react-head';
import i18n from 'i18next';
import { initialState } from '@make.org/store/initialState';
import { env } from '@make.org/assets/env';
import {
  DEFAULT_COUNTRY,
  DEFAULT_LANGUAGE,
  DESKTOP_DEVICE,
  MOBILE_DEVICE,
  PRIVACY_POLICY_DATE,
} from '@make.org/utils/constants/config';
import parser from 'ua-parser-js';
import ContextState from '@make.org/store';
import { TRANSLATION_NAMESPACE } from '@make.org/utils/i18n/constants';
import { StateRoot } from '@make.org/types';
import { Request, Response } from 'express';
import { Cookie } from 'universal-cookie';
import { setLanguage } from '@make.org/utils/helpers/countries';
import deepFreeze from 'deep-freeze';
import { getLoggerInstance } from '@make.org/logger';
import { WIDGET_CLIENT_DIR } from './paths';
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

  try {
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
      .replace(/__LANG__/gi, appState.appConfig.language)
      .replace(/___API_URL_CLIENT_SIDE___/gi, env.apiUrlClientSide() || '')
      .replace(/___NONCE_ID___/gi, nonceId)
      .replace(/___NODE_ENV___/gi, env.nodeEnv() || 'production')
      .replace(/___PORT___/gi, env.port() || '')
      .replace('</body>', `${scriptTags}</body>`);

    return content;
  } catch (error) {
    getLoggerInstance().logError(error);

    return 'Unexpected error';
  }
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
  // @todo refacto query, why 2 lines ?
  const { ...queryParams } = req.query;
  const { country, questionSlug, hash, language } = req.query;

  const { device } = parser(req.headers['user-agent']);
  const isMobileOrTablet = device.type === 'mobile' || device.type === 'tablet';

  const availableLanguage = language || DEFAULT_LANGUAGE;

  setLanguage(availableLanguage, true);

  const state: StateRoot = {
    ...initialState,
    ...routeState,
    appConfig: {
      ...initialState.appConfig,
      ...routeState?.appConfig,
      source: 'widget',
      language: availableLanguage,
      country: country || DEFAULT_COUNTRY,
      translations: i18n.getResourceBundle(
        availableLanguage,
        TRANSLATION_NAMESPACE
      ),
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: remove comment after upgrade to react18
    <HeadProvider headTags={headTags}>
      <ContextState serverState={state}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </ContextState>
    </HeadProvider>
  );

  const reactHtml = renderHtml(ReactApp, state, res);

  if (!reactHtml) {
    return res.status(404).end();
  }

  if (!questionSlug || !country || !hash) {
    state.appConfig.maintenance = true;
  }

  return res.send(reactHtml);
};
