import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { getLoggerInstance } from '@make.org/logger';
import NodeCache from 'node-cache';
import hash from 'object-hash';
import {
  TermQueryType,
  EventType,
  GeneratedContentType,
  CustomerType,
} from '../../types/index.d';
import { ContentApiService } from './services/ContentApiService';

const cache = new NodeCache({ stdTTL: 300 });

const clearCache = (): void => {
  cache.flushAll();
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
    getLoggerInstance().logError(
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

    const { id, customerId, slug, eventLanguage, name, introMediaUrl } =
      response && response.data[0];

    const event: EventType = {
      id,
      customerId,
      slug,
      language: eventLanguage,
      name,
      introMediaUrl,
    };

    cache.set(EVENT_CACHE_KEY, event);

    return event;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 404) {
      return notFound();
    }
    getLoggerInstance().logError(
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
    const response = await ContentApiService.getTermQueries(eventId);
    const termQueries: TermQueryType[] = [];

    if (!response || !response.data) {
      return termQueries;
    }

    response.data.map((termQuery: TermQueryType) => {
      const term = { title: termQuery.title, value: termQuery.value };

      return termQueries.push(term);
    });

    cache.set(TERM_QUERIES_CACHE_KEY, termQueries);

    return termQueries;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 404) {
      return notFound();
    }
    getLoggerInstance().logError(
      apiServiceError.clone(
        `error in server/api/Content/getTermQueries: ${apiServiceError.message}`
      )
    );

    return unexpectedError();
  }
};

/**
 * Get all generated contents of an event by his slug or his id
 * @param  {String} eventId
 * @param  {Function} notFound
 * @param  {Function} unexpectedError
 *
 * @return {Promise}
 */
const getGeneratedContents = async (
  eventId: string,
  notFound: () => void,
  unexpectedError: () => void
): Promise<void | GeneratedContentType[]> => {
  const GENERATED_CONTENTS_CACHE_KEY = hash([
    'GET_GENERATED_CONTENT',
    [...eventId],
  ]);
  const generatedContentsFromCache: GeneratedContentType[] | undefined =
    cache.get(GENERATED_CONTENTS_CACHE_KEY);

  if (generatedContentsFromCache) {
    return generatedContentsFromCache;
  }

  try {
    const response = await ContentApiService.getGeneratedContents(eventId);
    const generatedContents: GeneratedContentType[] = [];

    if (!response || !response.data) {
      return generatedContents;
    }

    response.data.map((genratedContent: GeneratedContentType) => {
      const content = {
        title: genratedContent.title,
        subtitle: genratedContent.subtitle,
        name: genratedContent.name,
        content: genratedContent.content,
        position: genratedContent.position,
      };

      return generatedContents.push(content);
    });

    cache.set(GENERATED_CONTENTS_CACHE_KEY, generatedContents);

    return generatedContents;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 404) {
      return notFound();
    }
    getLoggerInstance().logError(
      apiServiceError.clone(
        `error in server/api/Content/getGeneratedContents: ${apiServiceError.message}`
      )
    );

    return unexpectedError();
  }
};

export const ContentService = {
  getCustomerBySlug,
  getEventBySlug,
  getTermQueries,
  getGeneratedContents,
  clearCache,
};
