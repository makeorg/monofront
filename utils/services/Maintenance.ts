import MaintenanceApiService from '@make.org/api/MaintenanceApiService';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { AxiosResponse } from 'axios';
import { Logger } from './Logger';

const getConfig = async (): Promise<void | AxiosResponse<any>> => {
  try {
    const response = await MaintenanceApiService.getMaintenanceConfig();

    return response;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;

    return Logger.logError({
      message: `Maintenance server getConfig error with status : ${apiServiceError.status}`,
      name: 'services',
    });
  }
};

export const MaintenanceService = {
  getConfig,
};
