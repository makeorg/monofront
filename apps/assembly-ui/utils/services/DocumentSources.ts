import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { defaultUnexpectedError } from '@make.org/utils/services/DefaultErrorHandler';
import { DocumentSourceType } from '../../types';
import { DOCUMENTS_PATH } from '../routes';
import { env } from '../env';

const FRONT_URL = env.frontUrl() || window.FRONT_URL || '';

export const getEventSources = async (
  eventId: string
): Promise<DocumentSourceType[] | void> => {
  try {
    const params = new URLSearchParams({
      eventId,
    });

    const response = await fetch(`${FRONT_URL}${DOCUMENTS_PATH}?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;

    return defaultUnexpectedError(apiServiceError);
  }
};
