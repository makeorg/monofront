import React, { JSXElementConstructor, ReactElement } from 'react';
import fs from 'fs';
import path from 'path';
import { ChunkExtractor } from '@loadable/server';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { ServerStyleSheet } from 'styled-components';
import { HeadProvider } from 'react-head';
import webpackManifest from 'webpack-manifest';
import { Request, Response } from 'express';
import { Cookie } from 'universal-cookie';
import serialize from 'serialize-javascript';
import { env } from '../utils/env';
import { AppContainer } from '../client/app';
import { ASSEMBLY_CLIENT_DIR } from './paths';
import { AssemblyStateType } from '../types';
import AssemblyContextState, { initAssemblyEmptyState } from '../store/context';

const statsFile = path.resolve(ASSEMBLY_CLIENT_DIR, 'loadable-stats.json');

const htmlContent = fs.readFileSync(
  path.join(ASSEMBLY_CLIENT_DIR, 'index.html'),
  'utf8'
);

const renderHtml = (
  reactApp: JSX.Element,
  appState: AssemblyStateType,
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
    .replace('"___ASSEMBLY_STATE___"', serialize(appState, { isJSON: true }))
    .replace(
      /___CONTENT_URL_SERVER_SIDE___/gi,
      env.contentUrlServerSide() || ''
    )
    .replace(
      /___ASSEMBLY_URL_SERVER_SIDE___/gi,
      env.assemblyUrlServerSide() || ''
    )
    .replace(/___NODE_ENV___/gi, env.nodeEnv() || 'production')
    .replace(/___FRONT_URL___/gi, env.frontUrl() || '')
    .replace(/___NONCE_ID___/gi, nonceId)
    .replace(/___PORT___/gi, env.port() || '')
    .replace(/___MIXPANEL_TOKEN___/gi, env.mixPanelToken() || '')
    .replace(/___COOKIE_FIRST_TOKEN___/gi, env.cookieFirstToken() || '')
    .replace('</body>', `${scriptTags}</body>`);

  return content;
};

// @todo test this function!!
export const reactRender = async (
  req: Request & Cookie,
  res: Response,
  routeState?: AssemblyStateType
): Promise<any> => {
  const state: AssemblyStateType = routeState || initAssemblyEmptyState();

  const context = {};
  const headTags:
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>[]
    | undefined = [];

  const ReactApp = (
    <CookiesProvider cookies={req.universalCookies}>
      <HeadProvider headTags={headTags}>
        <AssemblyContextState serverState={state}>
          <StaticRouter location={req.url} context={context}>
            <AppContainer />
          </StaticRouter>
        </AssemblyContextState>
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
