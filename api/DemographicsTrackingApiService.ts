import { DemographicNameType, DemographicTrackType } from '@make.org/types';
import { AxiosResponse } from 'axios';
import { ApiService } from './ApiService';

export const DEMOGRAPHICS_TRACKING_PATH = '/tracking/demographics';

const SOURCE = 'core';

export class DemographicsTrackingApiService {
  static track(
    name: DemographicNameType,
    value: string,
    parameters: { [n: string]: string } = {}
  ): Promise<void | AxiosResponse> {
    const contentObj: DemographicTrackType = {
      demographic: name,
      value,
      questionId: ApiService.questionId,
      source: SOURCE,
      country: ApiService.country,
      parameters,
    };
    return ApiService.callApi(DEMOGRAPHICS_TRACKING_PATH, {
      method: 'POST',
      body: JSON.stringify(contentObj),
      allowedHeaders: [
        'x-make-country',
        'x-make-question-id',
        'x-make-app-name',
        'x-make-location',
        'x-make-external-id',
        'x-hostname',
      ],
      withCredentials: false,
    });
  }
}
