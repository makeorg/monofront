import { Request, Response } from 'express';
import { getLoggerInstance } from '@make.org/logger';
import { reactRender } from '../reactRender';
import { ContentService } from '../api/Content';
import { AssemblyStateType } from '../../types';
import { ROUTE_ASSEMBLY_NOT_FOUND } from '../../utils/routes';

export const eventRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { eventSlugOrId } = req.params;
  const logger = getLoggerInstance();

  const notFoundError = (endpoint: string) => {
    logger.logError({
      message: `Not found error on ${endpoint} with event slug or id : '${eventSlugOrId}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };

  const unexpectedError = (endpoint: string) => {
    logger.logError({
      message: `Unexpected error on ${endpoint} with event slug or id : '${eventSlugOrId}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };

  const event = await ContentService.getEvent(
    eventSlugOrId,
    () => notFoundError('getEvent'),
    () => unexpectedError('getEvent')
  );

  const termQueries = await ContentService.getTermQueries(
    eventSlugOrId,
    () => notFoundError('getTermQueries'),
    () => unexpectedError('getTermQueries')
  );

  const generatedContents = await ContentService.getGeneratedContents(
    eventSlugOrId,
    () => notFoundError('getGeneratedContents'),
    () => unexpectedError('getGeneratedContents')
  );

  if (!event || !termQueries || !generatedContents) {
    return res.redirect(ROUTE_ASSEMBLY_NOT_FOUND);
  }

  const routeState: AssemblyStateType = {
    event,
    termQueries,
    generatedContents,
  };

  return reactRender(req, res, routeState);
};
