import { AxiosResponse } from 'axios';
import { ApiService } from './ApiService';

const PATH_MAINTENANCE_CONFIG = '/api/maintenance';

export default class MaintenanceService {
  static getMaintenanceConfig(): Promise<void | AxiosResponse> {
    return ApiService.callApi(PATH_MAINTENANCE_CONFIG, {
      method: 'GET',
    });
  }
}
