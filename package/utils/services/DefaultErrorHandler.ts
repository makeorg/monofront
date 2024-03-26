import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { ClientLogger } from '@make.org/logger/clientLogger';

let unexpectedError = (error: ApiServiceError | Error) => {
  const Logger = ClientLogger.getInstance();
  try {
    Logger.logError(error);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    Logger.logError({
      message: `You should handle unexpected errors (default handler): ${e.message}`,
      name: 'services',
    });
  }
};

export const setUnexpectedError = (
  func: (apiServiceError: ApiServiceError | Error) => void
): void => {
  unexpectedError = func;
};

export const defaultUnexpectedError = (
  apiServiceError: ApiServiceError | Error
): void => unexpectedError(apiServiceError);
