import { Logger } from './Logger';

let unexpectedError = error => {
  const message = 'You should handle unexpected errors (default handler)';
  try {
    if (!error.logged) {
      Logger.logError(error.clone(`${message}: ${error.message}`));
    }
  } catch (e) {
    Logger.logError(message);
  }
};

export const setUnexpectedError = (func: (apiServiceError: Object) => void) => {
  unexpectedError = func;
};

export const defaultUnexpectedError = apiServiceError =>
  unexpectedError(apiServiceError);
