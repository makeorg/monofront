import { Request, Response } from 'express';
import { getLoggerInstance } from '@make.org/logger';
import Cookies from 'universal-cookie';
import { reactRender } from '../reactRender';
import { ContentService } from '../api/Content';
import { EventRouteType } from '../../types';
import { ROUTE_ASSEMBLY_NOT_FOUND } from '../../utils/routes';

export const eventRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { customerSlug, eventSlug } = req.params;
  const logger = getLoggerInstance();

  const notFoundError = (endpoint: string, eventSlugOrId: string) => {
    logger.logError({
      message: `Not found error on ${endpoint} with slug or id : '${eventSlugOrId}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };

  const unexpectedError = (endpoint: string, eventSlugOrId: string) => {
    logger.logError({
      message: `Unexpected error on ${endpoint} with slug or id : '${eventSlugOrId}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };

  const customer = await ContentService.getCustomerBySlug(
    customerSlug,
    () => notFoundError('getCustomerBySlug', customerSlug),
    () => unexpectedError('getCustomerBySlug', customerSlug)
  );

  const event = await ContentService.getEventBySlug(
    eventSlug,
    () => notFoundError('getEventBySlug', eventSlug),
    () => unexpectedError('getEventBySlug', eventSlug)
  );

  if (!customer || !event) {
    logger.logError({
      message: `No customer with slug : '${customerSlug}' or event with slug : '${eventSlug}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
    return res.redirect(ROUTE_ASSEMBLY_NOT_FOUND);
  }

  const eventLinkedToCustomer = () => event.customerId === customer.id;

  if (!eventLinkedToCustomer) {
    logger.logError({
      message: `Event is not related to Customer - "id" received from customer is ${customer.id} while "customerId" received from event is ${event.customerId}`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
    return res.redirect(ROUTE_ASSEMBLY_NOT_FOUND);
  }

  const termQueries = await ContentService.getTermQueries(
    event.id,
    () => notFoundError('getTermQueries', event.id),
    () => unexpectedError('getTermQueries', event.id)
  );

  const generatedContents = await ContentService.getGeneratedContents(
    event.id,
    () => notFoundError('getGeneratedContents', event.id),
    () => unexpectedError('getGeneratedContents', event.id)
  );

  const noTermQueries = !termQueries || !termQueries?.length;
  const noGeneratedContents = !generatedContents || !generatedContents?.length;

  if (noTermQueries || noGeneratedContents) {
    logger.logError({
      message: `No Term Queries (length: ${termQueries?.length}) or Generated Contents (length: ${generatedContents?.length}) for event : ${event.slug} `,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
    return res.redirect(ROUTE_ASSEMBLY_NOT_FOUND);
  }

  const routeState: EventRouteType = {
    customer,
    event,
    termQueries,
    generatedContents,
  };

  return reactRender(
    req as Request & { universalCookies: Cookies },
    res,
    routeState
  );
};
