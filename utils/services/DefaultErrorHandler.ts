import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { Logger } from './Logger';

let unexpectedError = (error: ApiServiceError | Error) => {
  const message = 'You should handle unexpected errors (default handler)';
  try {
    if (error instanceof Error) {
      Logger.logError(`${message}: ${error.message}`);
    }
  } catch (e) {
    Logger.logError(message);
  }
};

export const setUnexpectedError = (func: (apiServiceError: ApiServiceError | Error) => void): void => {
  unexpectedError = func;
};

export const defaultUnexpectedError = (apiServiceError: ApiServiceError | Error): void => unexpectedError(apiServiceError);
