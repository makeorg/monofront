import axios, { AxiosResponse } from 'axios';

export default class MaintenanceApiService {
  static getMaintenanceConfig(): Promise<void | AxiosResponse> {
    return axios({
      method: 'GET',
      url: `${process.env.CONFIG_URL}`,
    }).catch(error => console.log(error));
  }
}
