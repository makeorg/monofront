import axios, { AxiosResponse } from 'axios';

export default class MaintenanceApiService {
  static getMaintenanceConfig(): Promise<AxiosResponse> {
    return axios({
      method: 'GET',
      url: `${process.env.CONFIG_URL}`,
    });
  }
}
