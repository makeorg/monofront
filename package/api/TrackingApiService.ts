import {
  PerformanceTimingType,
  TrackingApiServiceParamsType,
} from '@make.org/types';
import { AxiosResponse } from 'axios';
import { ApiService } from './ApiService';

const PATH_POST_TRACKING = '/tracking/front';
const PATH_PERFORMANCE = '/tracking/performance';

export class TrackingApiService {
  static track = async (
    parameters: TrackingApiServiceParamsType
  ): Promise<void | AxiosResponse> =>
    ApiService.callApi(PATH_POST_TRACKING, {
      method: 'POST',
      body: JSON.stringify(parameters),
    });

  static trackPerformance(
    applicationName: string,
    timings: PerformanceTimingType
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(PATH_PERFORMANCE, {
      method: 'POST',
      body: JSON.stringify({ applicationName, timings }),
    });
  }
}
