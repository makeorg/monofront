import { ApiServiceResponse } from '@make.org/types';
import { ApiService } from '@make.org/api/ApiService';

const DEMOGRAPHICS_TRACKING_PATH = '/tracking/demographics-v2';

type TypeDemographicTrack = {
  value: string | null;
  questionId: string;
  source: string;
  country: string;
  parameters: { [n: string]: string };
  token?: string;
  demographic?: string;
  demographicsCardId?: string;
  sessionId?: string;
};

export class DemographicsTrackingApiService {
  static track(
    demographicsCardId: string,
    value: string | null,
    questionId: string,
    source: string,
    country: string,
    parameters: { [n: string]: string },
    token: string,
    sessionId?: string
  ): Promise<ApiServiceResponse> {
    const contentObj: TypeDemographicTrack = {
      demographicsCardId,
      value,
      questionId,
      source,
      country,
      parameters,
      token,
      sessionId,
    };

    return ApiService.callApi(DEMOGRAPHICS_TRACKING_PATH, {
      method: 'POST',
      body: JSON.stringify(contentObj),
      allowedHeaders: [
        'x-make-country',
        'x-make-question-id',
        'x-make-app-name',
        'x-make-location',
        'x-hostname',
      ],
      withCredentials: false,
    });
  }
}
