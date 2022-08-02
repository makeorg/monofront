import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import cache from 'memory-cache';
import { env } from '@make.org/assets/env';
import { APP_SERVER_DIR } from '../paths';

export const ALLOWED_URL = env.frontUrl();

export const questionResults = (
  req: Request,
  res: Response
): Response | void => {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_URL || '');
  res.setHeader('Content-Type', 'application/json');

  const { questionSlug } = req.params;

  if (!/^[a-z0-9-]+$/.test(questionSlug)) {
    return res.status(400).end();
  }

  const questionPath = path.join(
    APP_SERVER_DIR,
    'staticData/questionResults',
    `${questionSlug}.json`
  );

  const content = cache.get(questionPath);
  if (content) {
    return res.send(content);
  }

  try {
    const result = fs.readFileSync(path.join(questionPath), 'utf8');
    cache.put(questionPath, result);

    return res.send(result);
  } catch (error) {
    return res.status(404).end();
  }
};
