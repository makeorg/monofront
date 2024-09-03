import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import NodeCache from 'node-cache';
import hash from 'object-hash';
import { ServerLogger } from '@make.org/logger/serverLogger';
import { DOCUMENT_PAGE_LIMIT } from '../../utils/constants';
import {
  TermQueryType,
  EventType,
  CustomerType,
  DocumentSourceType,
} from '../../types/index.d';
import { ContentApiService } from './services/ContentApiService';

const cache = new NodeCache({ stdTTL: 300 });

const clearCache = (): void => {
  cache.flushAll();
};

/**
 * Get all documment sources of an event by his id
 * @param  {String} eventId
 * @param  {Function} notFound
 * @param  {Function} unexpectedError
 *
 * @return {Promise}
 */
const getDocumentSources = async (
  eventId: string,
  notFound: () => void,
  unexpectedError: () => void
): Promise<void | DocumentSourceType[]> => {
  try {
    const response = await ContentApiService.getDocumentSources(
      eventId,
      0,
      DOCUMENT_PAGE_LIMIT
    );

    const documentSources: DocumentSourceType[] = [];

    if (!response || !response.data) {
      return documentSources;
    }

    response.data.map((documentSource: DocumentSourceType) => {
      const source = {
        name: documentSource.name,
        title: documentSource.title,
        type: documentSource.type,
        url: documentSource.url,
      };

      return documentSources.push(source);
    });

    return documentSources;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 404) {
      return notFound();
    }
    ServerLogger.getInstance().logError(
      apiServiceError.clone(
        `error in server/api/Content/getDocumentSources: ${apiServiceError.message}`
      )
    );

    return unexpectedError();
  }
};

/**
 * Get a customer by his slug
 * @param  {String} customerSlug
 * @param  {Function} notFound
 * @param  {Function} unexpectedError
 *
 * @return {Promise}
 */
const getCustomerBySlug = async (
  customerSlug: string,
  notFound: () => void,
  unexpectedError: () => void
): Promise<void | CustomerType> => {
  const CUSTOMER_CACHE_KEY = hash(['GET_CUSTOMER', [...customerSlug]]);
  const eventFromCache: CustomerType | undefined =
    cache.get(CUSTOMER_CACHE_KEY);

  if (eventFromCache) {
    return eventFromCache;
  }

  try {
    const response = await ContentApiService.getCustomers(customerSlug);

    const { id, slug, name } = response && response.data[0];
    const customer: CustomerType = {
      id,
      slug,
      name,
    };

    cache.set(CUSTOMER_CACHE_KEY, customer);

    return customer;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 404) {
      return notFound();
    }
    ServerLogger.getInstance().logError(
      apiServiceError.clone(
        `error in server/api/Content/getCustomerBySlug: ${apiServiceError.message}`
      )
    );

    return unexpectedError();
  }
};

/**
 * Get an event by his slug
 * @param  {String} eventSlug
 * @param  {Function} notFound
 * @param  {Function} unexpectedError
 *
 * @return {Promise}
 */
const getEventBySlug = async (
  eventSlug: string,
  notFound: () => void,
  unexpectedError: () => void
): Promise<void | EventType> => {
  const EVENT_CACHE_KEY = hash(['GET_EVENT', [...eventSlug]]);
  const eventFromCache: EventType | undefined = cache.get(EVENT_CACHE_KEY);

  if (eventFromCache) {
    return eventFromCache;
  }

  try {
    const response = await ContentApiService.getEvents(eventSlug);

    const {
      id,
      customerId,
      slug,
      eventLanguage,
      name,
      introduction,
      links,
      logoUrl,
      summaryTitle,
      summaryContent,
    } = response && response.data[0];

    const event: EventType = {
      id,
      customerId,
      slug,
      language: eventLanguage,
      name,
      introduction,
      links,
      logoUrl,
      summaryTitle,
      summaryContent,
    };

    cache.set(EVENT_CACHE_KEY, event);

    return event;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 404) {
      return notFound();
    }
    ServerLogger.getInstance().logError(
      apiServiceError.clone(
        `error in server/api/Content/getEvent: ${apiServiceError.message}`
      )
    );

    return unexpectedError();
  }
};

/**
 * Get all term queries of an event by his slug or his id
 * @param  {String} eventSlug
 * @param  {Function} notFound
 * @param  {Function} unexpectedError
 *
 * @return {Promise}
 */
const getTermQueries = async (
  eventId: string,
  notFound: () => void,
  unexpectedError: () => void
): Promise<void | TermQueryType[]> => {
  const TERM_QUERIES_CACHE_KEY = hash(['GET_TERM_QUERIES', [...eventId]]);
  const termQueriesFromCache: TermQueryType[] | undefined = cache.get(
    TERM_QUERIES_CACHE_KEY
  );

  if (termQueriesFromCache) {
    return termQueriesFromCache;
  }

  try {
    const response = await ContentApiService.getTermQueries(eventId, 0, 30);
    const termQueries: TermQueryType[] = [];

    if (!response || !response.data) {
      return termQueries;
    }

    response.data.map((termQuery: TermQueryType) => {
      const term = {
        title: termQuery.title,
        value: termQuery.value,
        type: termQuery.type,
      };

      return termQueries.push(term);
    });

    cache.set(TERM_QUERIES_CACHE_KEY, termQueries);

    return termQueries;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 404) {
      return notFound();
    }
    ServerLogger.getInstance().logError(
      apiServiceError.clone(
        `error in server/api/Content/getTermQueries: ${apiServiceError.message}`
      )
    );

    return unexpectedError();
  }
};

export const ContentService = {
  getDocumentSources,
  getCustomerBySlug,
  getEventBySlug,
  getTermQueries,
  clearCache,
};
