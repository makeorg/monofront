import { createInitialState } from '@make.org/store/initialState';
import { Request, Response } from 'express';
import { ServerLogger } from '@make.org/logger/serverLogger';
import { ViewsService } from '../service/ViewsService';
import { reactRender } from '../reactRender';

export const homepageRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { country, language } = req.params;
  const initialState = createInitialState();
  const logger = ServerLogger.getInstance();

  const notFound = () => {
    logger.logError({
      message: `Views not found on homepageRoute country='${country}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };
  const unexpectedError = () => {
    logger.logError({
      message: `Unexpected Error on homepageRoute country='${country}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };

  const homepageData = await ViewsService.getHome(
    country,
    notFound,
    unexpectedError,
    language
  );

  if (!homepageData) {
    return reactRender(req, res.status(404), initialState);
  }

  initialState.views.homepage = {
    ...homepageData,
    country,
    language,
  };

  return reactRender(req, res, initialState);
};
