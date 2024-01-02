import { getLoggerInstance } from '@make.org/logger';
import axios from 'axios';
import { Request, Response } from 'express';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { env } from '../../utils/env';

const ANSWER_PATH = '/answer';

export const getLLMAnswer = async (
  req: Request,
  res: Response
): Promise<Response | null> => {
  const logger = getLoggerInstance();

  const { eventId, question, mode, language } = req.query;

  try {
    const responseStream = await axios(
      `${env.assemblyUrlServerSide()}${ANSWER_PATH}`,
      {
        method: 'GET',
        params: {
          eventId,
          question,
          mode,
          language,
        },
        headers: {
          'x-make-app-name': 'assembly-front',
        },
        withCredentials: false,
        responseType: 'stream',
      }
    );

    res.setHeader('Content-Type', `application/x-ndjson`);
    res.setHeader('Transfer-Encoding', 'chunked');
    responseStream.data.on('data', (chunk: any) => {
      res.write(chunk);
      res.flush();
    });

    responseStream.data.on('end', () => res.end());

    return null;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 404) {
      logger.logWarning({
        name: 'llm-service',
        message: `Call to llm service not found with eventId: "${eventId}" and language: "${language}".`,
        app_event_id: eventId,
        app_language: language,
      });

      return null;
    }

    logger.logError({
      name: 'llm-service',
      message: `Call to llm service fail with eventId: "${eventId}" and language: "${language}".`,
      app_event_id: eventId,
      app_language: language,
    });

    return null;
  }
};
