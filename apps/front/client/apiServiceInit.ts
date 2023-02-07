import { apiClient } from '@make.org/api/ApiService/ApiService.client';
import { updateRequestContextCustomData } from '@make.org/utils/helpers/customData';
import { getAppLocationContext } from '@make.org/utils/helpers/getLocationContext';
import { trackingParamsService } from '@make.org/utils/services/TrackingParamsService';

export const initApiService = (
  source: string,
  country: string,
  initialLanguage: string,
  customData: Record<string, string>
): void => {
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

    const { questionId, questionSlug, questionLanguage } =
      trackingParamsService.all();

    apiClient.customHeaders = {
      'x-make-question-id': questionId || '',
      'x-make-question-slug': questionSlug || '',
      'x-make-question-language': questionLanguage || '',
    };
    apiClient.url =
      typeof window !== 'undefined' && window && window.location
        ? window.location.href
        : 'undefined';
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
    updateRequestContextCustomData(customData);
  }
};
