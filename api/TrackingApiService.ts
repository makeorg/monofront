import {
  PerformanceTimingType,
  TrackingApiServiceParamsType,
} from '@make.org/types';
import { AxiosPromise, AxiosResponse } from 'axios';
import { ApiService } from './ApiService';

const PATH_POST_TRACKING = '/tracking/front';
export const PATH_PERFORMANCE = '/tracking/performance';

export class TrackingApiService {
  static track = async (
    parameters: TrackingApiServiceParamsType
  ): Promise<AxiosResponse> =>
    ApiService.callApi(PATH_POST_TRACKING, {
      method: 'POST',
      body: JSON.stringify(parameters),
    });

  static trackPerformance(
    applicationName: string,
    timings: PerformanceTimingType
  ): AxiosPromise<AxiosResponse> {
    return ApiService.callApi(PATH_PERFORMANCE, {
      method: 'POST',
      body: JSON.stringify({ applicationName, timings }),
    });
  }
}
