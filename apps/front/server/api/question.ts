import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import NodeCache from 'node-cache';
import { env } from '@make.org/assets/env';
import { QuestionService } from '@make.org/front/server/service/QuestionService';
import { APP_SERVER_DIR } from '../paths';

const ALLOWED_URL = env.frontUrl();
const cache = new NodeCache({ stdTTL: 300 });
const CACHE_NAME = 'RESULT';

const getFromJsonFile = async (
  req: Request,
  res: Response,
  questionId: string
) => {
  const questionSlug = await QuestionService.getQuestionSlug(
    questionId,
    () => {
      res.status(404).end();
    },
    () => {
      res.status(500).end();
    }
  );

  if (!questionSlug) {
    return res;
  }
  const questionPath = path.join(
    APP_SERVER_DIR,
    'staticData/questionResults',
    `${questionSlug}.json`
  );

  try {
    const result = fs.readFileSync(path.join(questionPath), 'utf8');

    return result;
  } catch (error) {
    return undefined;
  }
};

export const questionResults = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_URL || '');
  res.setHeader('Content-Type', 'application/json');

  const { questionId } = req.params;
  const cacheKey = `${CACHE_NAME}:${questionId}`;

  const resultFromCache = cache.get(cacheKey);
  if (resultFromCache) {
    return res.send(resultFromCache);
  }

  try {
    const result = await QuestionService.getQuestionResult(
      questionId,
      () => getFromJsonFile(req, res, questionId), // fallback - deprecated
      () => null
    );
    if (!result) {
      return res.status(404).end();
    }

    cache.set(cacheKey, result);

    return res.send(result);
  } catch (e) {
    return res.status(500).end();
  }
};
