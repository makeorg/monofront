import { apiClient } from '@make.org/api/ApiService/ApiService.client';
import { ApiServiceHeadersType, QuestionType } from '@make.org/types';
import { getAppTrackingLocation } from '@make.org/utils/helpers/getLocationContext';
import { updateTrackingQuestionParam } from '@make.org/utils/helpers/question';
import { trackingParamsService } from '@make.org/utils/services/TrackingParamsService';

export const initTrackingParamsService = (
  source: string,
  country: string,
  language: string,
  question?: QuestionType
): void => {
  trackingParamsService.source = source;
  trackingParamsService.country = country;
  trackingParamsService.language = language;
  trackingParamsService.referrer =
    typeof window !== 'undefined' && !!window.document.referrer
      ? window.document.referrer
      : '';
  trackingParamsService.addBeforeGetListener({
    execute: () => {
      trackingParamsService.url =
        typeof window !== 'undefined' && window && window.location
          ? window.location.href
          : 'undefined';
      const location = getAppTrackingLocation(
        window?.location?.pathname,
        trackingParamsService.questionId
      );
      trackingParamsService.location = location;
    },
  });

  apiClient.addHeadersListener(
    'trackingServiceListener',
    (headers: ApiServiceHeadersType) => {
      if (headers['x-visitor-id']) {
        trackingParamsService.visitorId = headers['x-visitor-id'];
      }
    }
  );

  if (question) {
    updateTrackingQuestionParam(question);
  }
};
