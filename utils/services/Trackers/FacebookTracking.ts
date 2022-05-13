import { env } from '@make.org/assets/env';
import { TrackingConfigurationParamType } from '@make.org/types';
import { Logger } from '../Logger';
import { fbq } from './fbq.js';

let initialized = false;
declare global {
  interface Window {
    FB_PIXEL_ID?: string;
  }
}
const makePixelId = env.isClientSide() ? window?.FB_PIXEL_ID : env.fbPixelId();

type FacebookEventParams = {
  source?: string;
  location?: string;
  url?: string;
  country?: string;
  language?: string;
  referer?: string;
  question?: string;
  cardPosition?: string;
  sequenceId?: string;
  proposalId?: string;
  questionId?: string;
  questionSlug?: string;
};

export const isFBInitialized = (): boolean => {
  if (!initialized) {
    // eslint-disable-next-line no-console
    console.warn(
      'Facebook Tracking not initialized before using call FacebookTracking.init with required params'
    );
  }

  return initialized;
};

export const FacebookTracking = {
  init(uniqueCustomerId: string): void {
    try {
      fbq.load();
      fbq.track('init', makePixelId, { external_id: uniqueCustomerId });
      initialized = true;
    } catch (e) {
      const error = e as string;
      Logger.logError(error);
    }
  },

  isInitialized(): boolean {
    if (isFBInitialized()) {
      return true;
    }

    return false;
  },

  pageView(): void {
    if (!isFBInitialized()) {
      return;
    }

    if (env.isDev()) {
      return;
    }

    try {
      fbq.track('track', 'PageView');
    } catch (e) {
      const error = e as string;
      Logger.logError(error);
    }
  },

  trackCustom(
    eventName: string,
    eventId: string,
    eventParameters: FacebookEventParams | TrackingConfigurationParamType
  ): void {
    if (!isFBInitialized()) {
      return;
    }

    if (env.isDev()) {
      // eslint-disable-next-line no-console
      console.info(
        `Tracking Custom Facebook (${makePixelId})
        event => ${eventName}
        eventId => ${eventId}
        params => ${JSON.stringify(eventParameters)}`
      );
      return;
    }

    try {
      fbq.track('trackSingleCustom', makePixelId, eventName, eventParameters, {
        eventID: eventId,
      });
    } catch (e) {
      const error = e as string;
      Logger.logError(error);
    }
  },
};
