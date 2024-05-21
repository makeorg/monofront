import axios, { AxiosError } from 'axios';
import { Request, Response } from 'express';
import { ServerLogger } from '@make.org/logger/serverLogger';
import { env } from '../../utils/env';

const ANSWER_PATH = '/answer';

export const getLLMAnswer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const logger = ServerLogger.getInstance();

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
          'x-make-app-name': 'assembly-ui',
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
  } catch (e: unknown) {
    const error = e as AxiosError;
    if (error.response?.status === 404) {
      logger.logWarning({
        name: 'llm-service',
        message: `Call to llm service not found with eventId: "${eventId}" and language: "${language}".`,
        app_event_id: eventId,
        app_language: language,
      });

      res.status(404).end();
    }

    logger.logError({
      name: 'llm-service',
      message: `Call to llm service fail with eventId: "${eventId}" and language: "${language}".`,
      app_event_id: eventId,
      app_language: language,
      app_res_status: error.response?.status,
      app_error_message: error.message,
      app_req_url: error.config?.url,
      app_req_method: error.config?.method,
      app_req_params: error.config?.params,
    });

    res.status(500).end();
  }
};
