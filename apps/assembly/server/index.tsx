/* eslint-disable import/no-extraneous-dependencies */
import { env } from '@make.org/assembly/env';
import App from '@make.org/assembly/client/App';
import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import i18n from 'i18next';
import { TRANSLATION_COMMON_NAMESPACE } from '@make.org/utils/i18n/constants';
import { translationRessources } from '../i18n';

const AVAILABLE_LANGUAGES = ['fr', 'en'];

const getApp = () => {
  const app = express();
  i18n.init({
    interpolation: {
      escapeValue: false,
    },
    debug: true,
    lng: 'fr',
    resources: translationRessources,
    defaultNS: TRANSLATION_COMMON_NAMESPACE,
  });

  const htmlContent = fs.readFileSync(
    path.join('dist', 'client', 'index.html'),
    'utf8'
  );
  const sheet = new ServerStyleSheet();
  const styles = sheet.getStyleTags();

  const getContent = (body: string, language: string) =>
    htmlContent
      .replace(/<div id="app"><\/div>/, `<div id="app">${body}</div>`)
      .replace('</head>', `${styles}</head>`)
      .replace(/___API_URL___/gi, env.apiUrl() || '')
      .replace(/___PORT___/gi, env.port() || '')
      .replace(/___LANGUAGE___/gi, language);

  app.use(express.static('dist', { index: false }));

  app.get('/:language', async (req: Request, res: Response) => {
    const { language } = req.params;

    if (!AVAILABLE_LANGUAGES.includes(language)) {
      return res.status(404).send('NOT FOUND');
    }

    await i18n.changeLanguage(language);
    const body = ReactDOMServer.renderToString(sheet.collectStyles(<App />));
    const content = getContent(body, language);

    return res.send(content);
  });

  app.get('/robots.txt', (_: Request, res: Response) => {
    res.type('text/plain');
    return res.send('User-agent: *\nDisallow: /');
  });

  app.get('/', async (_: Request, res: Response) => {
    if (!htmlContent) {
      return res.status(404).send('NOT FOUND');
    }

    await i18n.changeLanguage('fr');
    const body = ReactDOMServer.renderToString(sheet.collectStyles(<App />));
    const content = getContent(body, 'fr');

    return res.send(content);
  });

  return app;
};

export const app = getApp();
