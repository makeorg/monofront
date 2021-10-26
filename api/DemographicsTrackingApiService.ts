import { ApiServiceResponse } from '@make.org/types';
import { ApiService } from './ApiService';

export const DEMOGRAPHICS_TRACKING_PATH_UNSECURE = '/tracking/demographics';
export const DEMOGRAPHICS_TRACKING_PATH = '/tracking/demographics-v2';

type TypeDemographicTrack = {
  demographic: string;
  value: string;
  questionId: string;
  source: string;
  country: string;
  parameters: { [n: string]: string };
  token?: string;
};

export class DemographicsTrackingApiService {
  static trackUnsecure(
    name: string,
    value: string,
    questionId: string,
    source: string,
    parameters: { [n: string]: string } = {}
  ): Promise<ApiServiceResponse> {
    const contentObj: TypeDemographicTrack = {
      demographic: name,
      value,
      questionId,
      source,
      country: ApiService.country,
      parameters,
    };

    return ApiService.callApi(DEMOGRAPHICS_TRACKING_PATH_UNSECURE, {
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

  static track(
    demographicsCardId: string,
    token: string,
    value: string,
    questionId: string,
    source: string,
    parameters: { [n: string]: string } = {}
  ): Promise<ApiServiceResponse> {
    const contentObj: TypeDemographicTrack = {
      demographic: demographicsCardId,
      value,
      questionId,
      source,
      country: ApiService.country,
      parameters,
      token,
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
