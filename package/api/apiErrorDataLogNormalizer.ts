import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { DataLog } from '@make.org/logger/loggerNormalizer';

const formatApiServiceError = (error: ApiServiceError): DataLog => ({
  message: error.message,
  app_logName: error.name,
  app_fileName: error.fileName,
  app_lineNumber: error.lineNumber,
  app_columnNumber: error.columnNumber,
  stack: error.stack,
  app_status: error.status || 0,
  app_responseData: error.data || 'none',
  app_url: error.url || 'none',
  app_method: error.method || 'none',
  app_logId: error.logId,
  app_requestId: error.requestId,
});

export const apiErrorDataLogNormalizer = <T>(data: T): DataLog | undefined => {
  if (data instanceof ApiServiceError) {
    const formattedData = formatApiServiceError(data);

    return {
      ...formattedData,
      app_normalizer: 'apiErrorNormalizer',
    };
  }

  return undefined;
};
