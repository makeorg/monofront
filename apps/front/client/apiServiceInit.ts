import { apiClient } from '@make.org/api/ApiService/ApiService.client';
import { updateRequestContextCustomData } from '@make.org/utils/helpers/customData';
import { getAppLocationContext } from '@make.org/utils/helpers/getLocationContext';
import { trackingParamsService } from '@make.org/utils/services/TrackingParamsService';

export const initApiService = (
  source: string,
  country: string,
  language: string,
  customData: Record<string, string>
): void => {
  apiClient.source = source;
  apiClient.country = country;
  apiClient.language = language;
  apiClient.referrer =
    typeof window !== 'undefined' && !!window.document.referrer
      ? window.document.referrer
      : '';

  apiClient.addbeforeCallListener('globalCore', async (url, options) => {
    apiClient.location = getAppLocationContext(
      window?.location?.pathname,
      trackingParamsService.questionId
    );
    apiClient.customHeaders = {
      'x-make-question-id': trackingParamsService.questionId || '',
    };
    apiClient.url =
      typeof window !== 'undefined' && window && window.location
        ? window.location.href
        : 'undefined';
  });

  if (customData) {
    updateRequestContextCustomData(customData);
  }
};
