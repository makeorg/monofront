import { AxiosResponse } from 'axios';
import { ExpressApiServiceShared } from './ApiService/ExpressApiService.shared';

const PATH_RESULTS_CONFIGURATION = '/api/results/:questionSlug';

/* @todo this service is only used by 'front' app
 * Delete it when 'results page' is automated
 * Or refactor it to define the service and his layers in the 'front' app
 */
export class ExpressApiService {
  static getResults(questionSlug: string): Promise<void | AxiosResponse> {
    return ExpressApiServiceShared.callApi(
      PATH_RESULTS_CONFIGURATION.replace(':questionSlug', questionSlug),
      {
        method: 'GET',
      }
    );
  }
}
