import axios, { AxiosResponse } from 'axios';

export default class MaintenanceApiService {
  static getMaintenanceConfig(): Promise<AxiosResponse | null> {
    if (!process.env.CONFIG_URL) {
      return Promise.resolve(null);
    }

    return axios({
      method: 'GET',
      url: `${process.env.CONFIG_URL}`,
    });
  }
}
