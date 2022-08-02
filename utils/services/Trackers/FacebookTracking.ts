import { env } from '@make.org/assets/env';
import { TrackingConfigurationParamType } from '@make.org/types';
import { ExpressService } from '@make.org/utils/services/Express';
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

export const isFBInitialized = (): boolean => initialized;

export const FacebookTracking = {
  init(externalId?: string): void {
    try {
      fbq.load();
      if (externalId) {
        fbq.track('init', makePixelId, {
          external_id: externalId,
        });
      } else {
        Logger.logWarning({
          name: 'tracking-facebook',
          messager: 'Tracking is init without external id',
        });
        fbq.track('init', makePixelId);
      }

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
      // eslint-disable-next-line no-console
      Logger.logWarning({
        message:
          'Facebook Tracking not initialized before using call FacebookTracking.init with required params - event: PageView',
        name: 'tracking-init',
      });
      return;
    }

    if (env.isDev()) {
      // eslint-disable-next-line no-console
      console.info(
        `Tracking  Facebook (${makePixelId})
        track PageView`
      );

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
    eventParameters: FacebookEventParams | TrackingConfigurationParamType,
    url: string | undefined,
    vistorId: string
  ): void {
    if (!isFBInitialized()) {
      // eslint-disable-next-line no-console
      Logger.logWarning({
        message: `Facebook Tracking not initialized before using call FacebookTracking.init with required params - event: ${eventName}`,
        name: 'tracking-init',
      });
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

    // pixel FB
    try {
      fbq.track('trackSingleCustom', makePixelId, eventName, eventParameters, {
        eventID: eventId,
      });
    } catch (e) {
      const error = e as string;
      Logger.logError(error);
    }

    // Facebook API conversion
    ExpressService.sendFbEventConversion(
      eventName,
      eventId,
      eventParameters,
      url,
      vistorId
    );
  },
};
