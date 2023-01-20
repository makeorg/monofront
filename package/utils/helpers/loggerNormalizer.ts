import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';

type DataLog = {
  message: string;
  app_logId: string;
  name?: string;
  app_logName?: string;
  app_fileName?: string;
  app_lineNumber?: string;
  app_columnNumber?: string;
  stack?: string;
  app_status?: number;
  app_responseData?: unknown;
  app_url?: string;
  app_method?: string;
  app_requestId?: string;
};

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

export const makeorgApiServiceErrorNormalizer = <T>(
  data: T
): DataLog | undefined => {
  if (data instanceof ApiServiceError) {
    return formatApiServiceError(data);
  }

  return undefined;
};
