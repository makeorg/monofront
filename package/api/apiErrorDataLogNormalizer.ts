import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { DataLog } from '@make.org/logger/loggerNormalizer';

const formatApiServiceError = (error: ApiServiceError): DataLog => ({
  message: error.message,
  app_logName: error.name,
  app_fileName: error.fileName,
  app_lineNumber: error.lineNumber,
  app_columnNumber: error.columnNumber,
  stack: error.stack,
  app_status: error.status,
  app_responseData: error.data,
  app_url: error.url,
  app_method: error.method,
  app_logId: error.logId,
  app_requestId: error.requestId,
});

export const apiErrorDataLogNormalizer = <T>(data: T): DataLog | undefined => {
  if (data instanceof ApiServiceError) {
    return formatApiServiceError(data);
  }

  return undefined;
};
