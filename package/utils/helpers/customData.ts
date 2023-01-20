import { apiClient } from '@make.org/api/ApiService/ApiService.client';

/** Default prefix matching custom data params in query params */
const paramPrefix = 'cs_';

/** Storage key for default storage */
const sessionStorageKey = 'app-custom-data';

/**
 * Extract custom data from queryParams using custom data prefix
 */
const getCustomDataFromQueryParams = (
  queryParams: Record<string, string>
): Record<string, string> => {
  if (!queryParams) {
    return {};
  }
  const customData: Record<string, string> = {};
  Object.keys(queryParams).forEach(key => {
    const isValidKey =
      key.startsWith(paramPrefix) && key.length > paramPrefix.length;
    const isValidValue =
      typeof queryParams[key] === 'string' &&
      queryParams[key].trim().length > 0;

    if (isValidKey && isValidValue) {
      customData[key.substr(paramPrefix.length)] = queryParams[key].trim();
    }
  });

  return customData;
};

/*
 * Get stored custom data formatted to be used as header data
 */
const escapeValue = (value: string): string =>
  value.replace(/=/g, '%3D').replace(/,/g, '%2C');

const formatdDataForHeader = (customData: Record<string, string>): string =>
  Object.keys(customData)
    .map(key => {
      const value: string =
        typeof customData[key] === 'string'
          ? customData[key]
          : 'invalid_value_type';

      return `${escapeValue(key)}=${escapeValue(value)}`;
    })
    .join(',');

export const getAll = (): Record<string, string> => {
  try {
    return JSON.parse(sessionStorage.getItem(sessionStorageKey) || '{}') || {};
  } catch (e) {
    return {};
  }
};

const saveAll = (customData: Record<string, string>, merge = true): boolean => {
  try {
    const newCustomData = merge
      ? {
          ...getAll(),
          ...customData,
        }
      : customData;
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(newCustomData));
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Store custom params from queryParams
 * Old params values are conserved but override by the new values
 */
export const setDataFromQueryParams = (
  queryParams: Record<string, string>
): void => {
  const dataFromQueryParams = getCustomDataFromQueryParams(queryParams);
  saveAll(dataFromQueryParams);
};

export const updateRequestContextCustomData = (
  customData: Record<string, string>
): void => {
  apiClient.customData = formatdDataForHeader(customData);
};
