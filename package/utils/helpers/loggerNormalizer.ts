import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { v4 as uuidv4 } from 'uuid';

export type DataLog = {
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

const formatError = (
  error: Error & {
    fileName?: string;
    lineNumber?: string;
    columnNumber?: string;
  }
): DataLog => ({
  message: error.message,
  app_logName: error.name,
  app_fileName: error.fileName,
  app_lineNumber: error.lineNumber,
  app_columnNumber: error.columnNumber,
  app_logId: uuidv4(),
  stack: error.stack,
});

export const errorNormalizer = <T>(data: T): DataLog | T => {
  if (data instanceof Error) {
    return formatError(data);
  }

  return data;
};

export const makeorgApiServiceErrorNormalizer = <T>(data: T): DataLog | T => {
  if (data instanceof ApiServiceError) {
    return formatApiServiceError(data);
  }

  return data;
};

export const stringNormalizer = <T>(data: T): DataLog | T => {
  if (typeof data === 'string') {
    return {
      message: data,
      stack: 'no-stack',
      app_logId: uuidv4(),
      app_logName: '-',
    };
  }

  return data;
};

export const objectNormalizer = <T>(data: T): DataLog | T => {
  if (typeof data === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataObj = data as any;
    const formatedData: {
      app_logId: string;
      app_logName: string;
      stack: string;
      message: string;
      name?: string;
      errorName?: string;
      logId?: string;
    } = {
      ...dataObj,
      app_logId: dataObj.app_logId || dataObj.logId || uuidv4(),
      app_logName:
        dataObj.app_logName || dataObj.name || dataObj.errorName || '-',
      stack: dataObj.stack || '-',
      message: dataObj.message || '-',
    };

    delete formatedData.name;
    delete formatedData.errorName;
    delete formatedData.logId;

    return formatedData;
  }

  return data;
};

export const defaultNormalizer = (data: unknown): DataLog => {
  try {
    return {
      message: JSON.stringify(data),
      app_logId: uuidv4(),
    };
  } catch (e: unknown) {
    const apiServiceError = e as ApiServiceError;
    return {
      message: apiServiceError.message,
      app_logId: uuidv4(),
    };
  }
};

export type DataNormalizer = { <T>(data: T): T | DataLog };

export const normalizeData = (
  data: unknown,
  dataNormalizers: DataNormalizer[] = []
): DataLog => {
  let formatedData;
  dataNormalizers.some(normalize => {
    const result = normalize(data);
    if (result !== undefined) {
      formatedData = result;

      return true;
    }

    return false;
  });

  return formatedData || defaultNormalizer(data);
};
