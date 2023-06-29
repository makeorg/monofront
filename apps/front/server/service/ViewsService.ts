import { ViewsApiService } from '@make.org/api/services/ViewsApiService';
import cache from 'memory-cache';
import { HomeViewType } from '@make.org/types/View';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { getLoggerInstance } from '@make.org/logger';
import hash from 'object-hash';

const clearCache = (): void => {
  cache.clear();
};

const getHome = async (
  country: string,
  notFound: () => void,
  unexpectedError: () => void,
  preferredLanguage: string
): Promise<void | HomeViewType> => {
  const args = [
    country,
    preferredLanguage,
    {
      'x-make-country': country,
      'x-make-client-language': preferredLanguage,
    },
  ] as const;

  const CACHE_KEY = hash(['GET_HOME', ...args]);
  const contentFromCache: HomeViewType = cache.get(CACHE_KEY);
  if (contentFromCache) {
    return contentFromCache;
  }

  try {
    const response = await ViewsApiService.getHome(...args);

    cache.put(CACHE_KEY, response && response.data, 300000);

    return response && response.data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 404) {
      return notFound();
    }
    getLoggerInstance().logError(
      apiServiceError.clone(
        `error in server/service/ViewsService/getHome: ${apiServiceError.message}`
      )
    );

    return unexpectedError();
  }
};

const getCountries = async (
  country: string,
  language: string,
  notFound: () => void,
  unexpectedError: () => void
): Promise<string[]> => {
  const CACHE_KEY = `GET_COUNTRIES`;
  const content = cache.get(CACHE_KEY);
  if (content) {
    return content;
  }

  try {
    const countries: string[] = [];
    const headers: Record<string, string> = {
      'x-make-country': '',
      'x-make-client-language': '',
    };

    if (country) {
      headers['x-make-country'] = country;
    }
    if (language) {
      headers['x-make-client-language'] = language;
    }

    const response = await ViewsApiService.getCountries(headers);

    if (!response) {
      return [];
    }
    // push country codes in array
    response.data.map(countryWithConsultations =>
      countries.push(countryWithConsultations.countryCode)
    );

    cache.put(CACHE_KEY, countries.sort(), 300000);

    return countries.sort();
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 404) {
      notFound();
      return [];
    }
    getLoggerInstance().logError(
      apiServiceError.clone(
        `error in server/service/ViewsService/getCountries: ${apiServiceError.message}`
      )
    );

    unexpectedError();

    return [];
  }
};

export const ViewsService = {
  getHome,
  getCountries,
  clearCache,
};
