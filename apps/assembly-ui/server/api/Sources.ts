import { ServerLogger } from '@make.org/logger/serverLogger';
import { Request, Response } from 'express';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { ContentService } from './Content';

export const getDocumentSources = async (
  req: Request,
  res: Response
): Promise<Response | null> => {
  const logger = ServerLogger.getInstance();
  const { eventId } = req.query;

  try {
    const documentSources = await ContentService.getDocumentSources(
      eventId as string,
      () => res.status(404),
      () => res.status(500)
    );

    if (documentSources) {
      res.send(documentSources);
    }

    return res.end();
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 404) {
      logger.logWarning({
        name: 'content-service',
        message: `Call to content service not found with eventId: "${eventId}".`,
        app_event_id: eventId,
      });

      return null;
    }

    logger.logError({
      name: 'content-service',
      message: `Call to content service fail with eventId: "${eventId}".`,
      app_event_id: eventId,
    });

    return null;
  }
};
