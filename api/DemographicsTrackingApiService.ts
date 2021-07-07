import { ApiService } from './ApiService';

export const DEMOGRAPHICS_TRACKING_PATH = '/tracking/demographics';

export type TypeDemographicName = 'age' | 'region' | 'gender';

type TypeDemographicTrack = {
  demographic: string,
  value: string,
  questionId: string,
  source: 'core',
  country: string,
  parameters: { [n: string]: string },
};

const SOURCE = 'core';

export class DemographicsTrackingApiService {
  static track(
    name: TypeDemographicName,
    value: string,
    parameters: { [n: string]: string } = {}
  ): Promise<any> {
    const contentObj: TypeDemographicTrack = {
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
