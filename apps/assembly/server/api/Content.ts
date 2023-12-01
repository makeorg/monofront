import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { getLoggerInstance } from '@make.org/logger';
import NodeCache from 'node-cache';
import hash from 'object-hash';
import {
  TermQueryType,
  EventType,
  GeneratedContentType,
} from '../../types/index.d';
import { ContentApiService } from './services/ContentApiService';

const cache = new NodeCache({ stdTTL: 300 });

const clearCache = (): void => {
  cache.flushAll();
};

/**
 * Get event by his slug or his id
 * @param  {String} eventSlugOrId
 * @param  {Function} notFound
 * @param  {Function} unexpectedError
 *
 * @return {Promise}
 */
const getEvent = async (
  eventSlugOrId: string,
  notFound: () => void,
  unexpectedError: () => void
): Promise<void | EventType> => {
  const EVENT_CACHE_KEY = hash(['GET_EVENT', [...eventSlugOrId]]);
  const eventFromCache: EventType | undefined = cache.get(EVENT_CACHE_KEY);

  if (eventFromCache) {
    return eventFromCache;
  }

  try {
    const response = await ContentApiService.getEvent(eventSlugOrId);

    const { id, eventLanguage, name, introMediaUrl } =
      response && response.data;
    const event: EventType = {
      id,
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
 * @param  {String} eventSlugOrId
 * @param  {Function} notFound
 * @param  {Function} unexpectedError
 *
 * @return {Promise}
 */
const getTermQueries = async (
  eventSlugOrId: string,
  notFound: () => void,
  unexpectedError: () => void
): Promise<void | TermQueryType[]> => {
  const TERM_QUERIES_CACHE_KEY = hash(['GET_TERM_QUERIES', [...eventSlugOrId]]);
  const termQueriesFromCache: TermQueryType[] | undefined = cache.get(
    TERM_QUERIES_CACHE_KEY
  );

  if (termQueriesFromCache) {
    return termQueriesFromCache;
  }

  try {
    const response = await ContentApiService.getTermQueries(eventSlugOrId);
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
 * @param  {String} eventSlugOrId
 * @param  {Function} notFound
 * @param  {Function} unexpectedError
 *
 * @return {Promise}
 */
const getGeneratedContents = async (
  eventSlugOrId: string,
  notFound: () => void,
  unexpectedError: () => void
): Promise<void | GeneratedContentType[]> => {
  const GENERATED_CONTENTS_CACHE_KEY = hash([
    'GET_GENERATED_CONTENT',
    [...eventSlugOrId],
  ]);
  const generatedContentsFromCache: GeneratedContentType[] | undefined =
    cache.get(GENERATED_CONTENTS_CACHE_KEY);

  if (generatedContentsFromCache) {
    return generatedContentsFromCache;
  }

  try {
    const response = await ContentApiService.getGeneratedContents(
      eventSlugOrId
    );
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
  getEvent,
  getTermQueries,
  getGeneratedContents,
  clearCache,
};
