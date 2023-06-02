import { ApiServiceClient } from '@make.org/api/ApiService/ApiService.client';
import { getRequestContextCustomData } from '@make.org/utils/helpers/customData';
import { getAppLocationContext } from '@make.org/utils/helpers/getLocationContext';
import { trackingParamsService } from '@make.org/utils/services/TrackingParamsService';
import { env } from '@make.org/assets/env';
import { ApiService } from '@make.org/api/ApiService';

export const initApiService = (
  sessionId: string,
  source: string,
  country: string,
  initialLanguage: string,
  customData: Record<string, string>
): ApiServiceClient => {
  const API_URL: string =
    typeof window !== 'undefined'
      ? env.apiUrlClientSide() || window?.API_URL_CLIENT_SIDE || ''
      : env.apiUrlServerSide() || '';

  const apiClient = new ApiServiceClient(API_URL);
  ApiService.strategy = apiClient;

  apiClient.sessionId = sessionId;
  apiClient.appname = 'main-front';
  apiClient.source = source;
  apiClient.country = country;
  apiClient.language = initialLanguage;
  apiClient.referrer =
    typeof window !== 'undefined' && !!window.document.referrer
      ? window.document.referrer
      : '';

  apiClient.addbeforeCallListener('globalCore', async () => {
    apiClient.location = getAppLocationContext(
      window?.location?.pathname,
      trackingParamsService.questionId
    );

    const {
      questionId,
      questionSlug,
      questionLanguage,
      country: currentCountry,
      language: currentLanguage,
    } = trackingParamsService.all();

    apiClient.customHeaders = {
      'x-make-question-id': questionId || '',
      'x-make-question-slug': questionSlug || '',
      'x-make-question-language': questionLanguage || '',
    };
    apiClient.url =
      typeof window !== 'undefined' && window && window.location
        ? window.location.href
        : 'undefined';
    apiClient.country = currentCountry || '';
    apiClient.language = currentLanguage || '';
  });

  apiClient.addAfterCallListener(
    'trackingServiceListener',
    async (url, options, headers) => {
      if (headers['x-visitor-id']) {
        trackingParamsService.visitorId = headers['x-visitor-id'];
      }
    }
  );

  if (customData) {
    apiClient.customData = getRequestContextCustomData(customData);
  }

  return apiClient;
};
