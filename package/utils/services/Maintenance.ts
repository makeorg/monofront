import MaintenanceApiService from '@make.org/api/services/MaintenanceApiService';
import { AxiosResponse } from 'axios';
import { getLoggerInstance } from '@make.org/logger';

const getConfig = async (): Promise<null | AxiosResponse> => {
  try {
    const response = await MaintenanceApiService.getMaintenanceConfig();
    if (response === null) {
      getLoggerInstance().logError({
        message: `Failed to get maintenance config. Default configuration will be used.`,
        name: 'services',
      });
    }

    return response;
  } catch (error: unknown) {
    const serviceError = error as Error;

    getLoggerInstance().logError({
      message: `Failed to get maintenance config - ${serviceError.message}`,
      name: 'services',
      stack: serviceError.stack,
    });

    return null;
  }
};

export const MaintenanceService = {
  getConfig,
};
