/* eslint-disable import/no-extraneous-dependencies */
import { env } from '@make.org/assembly/env';
import App from '@make.org/assembly/client/App';
import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

const getApp = () => {
  const app = express();

  const htmlContent = fs.readFileSync(
    path.join('dist', 'client', 'index.html'),
    'utf8'
  );
  const sheet = new ServerStyleSheet();
  const styles = sheet.getStyleTags();

  const getContent = (body: string, language?: string) =>
    htmlContent
      .replace(/<div id="app"><\/div>/, `<div id="app">${body}</div>`)
      .replace('</head>', `${styles}</head>`)
      .replace(/___API_URL___/gi, env.apiUrl() || '')
      .replace(/___PORT___/gi, env.port() || '');

  app.use(express.static('dist', { index: false }));

  app.get('/robots.txt', (_: Request, res: Response) => {
    res.type('text/plain');
    return res.send('User-agent: *\nDisallow: /');
  });

  app.get('/', async (_: Request, res: Response) => {
    if (!htmlContent) {
      return res.status(404).send('NOT FOUND');
    }

    // await i18n.changeLanguage('fr');
    const body = ReactDOMServer.renderToString(sheet.collectStyles(<App />));
    const content = getContent(body);

    return res.send(content);
  });

  return app;
};

export const app = getApp();
