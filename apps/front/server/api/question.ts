import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import NodeCache from 'node-cache';
import { env } from '@make.org/assets/env';
import { QuestionService } from '@make.org/front/server/service/QuestionService';
import { ServerLogger } from '@make.org/logger/serverLogger';
import { APP_SERVER_DIR } from '../paths';

const ALLOWED_URL = env.frontUrl();
const cache = new NodeCache({ stdTTL: 300 });
const CACHE_NAME = 'RESULT';

const getFromJsonFile = async (questionId: string) => {
  const logger = ServerLogger.getInstance();
  const questionSlug = await QuestionService.getQuestionSlug(
    questionId,
    () => {
      logger.logError({
        name: 'question-result-service',
        message: `Json fallback. Question not found with questionId: "${questionId}"`,
        app_question_id: questionId,
      });
    },
    () => {
      logger.logError({
        name: 'question-result-service',
        message: `Json fallback. Fail to get question with questionId: "${questionId}"`,
        app_question_id: questionId,
      });
    }
  );

  if (!questionSlug) {
    return undefined;
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
    logger.logError({
      name: 'question-result-service',
      message: `Json fallback. Fail to get file with path: "${questionSlug}.json"`,
      app_file_path: `${questionSlug}.json`,
    });

    return undefined;
  }
};

export const questionResults = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const logger = ServerLogger.getInstance();
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_URL || '');
  res.setHeader('Content-Type', 'application/json');

  const { questionId } = req.params;
  if (!questionId) {
    return res.status(400).end();
  }
  const cacheKey = `${CACHE_NAME}:${questionId}`;

  const resultFromCache = cache.get(cacheKey);
  if (resultFromCache) {
    return res.send(resultFromCache);
  }

  try {
    const result =
      (await QuestionService.getQuestionResult(
        questionId,
        () => {
          logger.logWarning({
            name: 'question-result-service',
            message: `Result page not found in content with questionId: "${questionId}"`,
            app_question_id: questionId,
          });
        },
        () => {
          logger.logError({
            name: 'question-result-service',
            message: `Call to content service fail with questionId: "${questionId}"`,
            app_question_id: questionId,
          });
        }
      )) || (await getFromJsonFile(questionId)); // getFromJsonFile is a fallback. Consider it deprecated
    if (!result) {
      return res.status(404).end();
    }

    cache.set(cacheKey, result);

    return res.send(result);
  } catch (e) {
    const error = e as Error;
    logger.logError({
      name: 'question-result-service',
      message: error.message,
      app_question_id: questionId,
      stack: error.stack || '',
    });
    return res.status(500).end();
  }
};
