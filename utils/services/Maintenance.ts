import MaintenanceApiService from '@make.org/api/MaintenanceApiService';
import { AxiosResponse } from 'axios';
import { getLoggerInstance } from '@make.org/utils/helpers/logger';

const getConfig = async (): Promise<null | AxiosResponse<any>> => {
  try {
    const response = await MaintenanceApiService.getMaintenanceConfig();

    return response;
  } catch (error: unknown) {
    const apiServiceError = error as Error;

    getLoggerInstance().logError({
      message: `Failed to get maintenance config - ${apiServiceError.message}`,
      name: 'services',
      stack: apiServiceError.stack,
    });

    return null;
  }
};

export const MaintenanceService = {
  getConfig,
};
