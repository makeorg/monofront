import { createInitialState } from '@make.org/store/initialState';
import { Request, Response } from 'express';
import { getLanguageFromCountryCode } from '@make.org/utils/helpers/countries';
import { getLoggerInstance } from '@make.org/utils/helpers/logger';
import { ViewsService } from '../service/ViewsService';
import { reactRender } from '../reactRender';

export const homepageRoute = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { country } = req.params;
  const initialState = createInitialState();
  const logger = getLoggerInstance();

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
    getLanguageFromCountryCode(country),
    notFound,
    unexpectedError
  );

  if (!homepageData) {
    return reactRender(req, res.status(404), initialState);
  }

  initialState.views.homepage = {
    ...homepageData,
    country,
  };

  return reactRender(req, res, initialState);
};
