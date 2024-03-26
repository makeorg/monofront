import { env } from '@make.org/assets/env';
import { TrackingConfigurationParamType, ILogger } from '@make.org/types';
import { ExpressService } from '@make.org/utils/services/Express';
import { fbq } from '@make.org/utils/services/Trackers/fbq.js';

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

const isFBInitialized = (): boolean => initialized;

export const FacebookTracking = {
  logger: {
    // eslint-disable-next-line no-console
    logError: (error: unknown): void =>
      console.error('Logger not initialized', error),
    // eslint-disable-next-line no-console
    logInfo: (info: unknown): void =>
      console.log('Logger not initialized', info),
    // eslint-disable-next-line no-console
    logWarning: (warning: unknown): void =>
      console.warn('Logger not initialized', warning),
  },

  init(logger: ILogger, externalId?: string): void {
    this.logger = logger;
    try {
      fbq.load();
      if (externalId) {
        fbq.track('init', makePixelId, {
          external_id: externalId,
        });
      } else {
        this.logger.logWarning({
          name: 'tracking-facebook',
          messager: 'Tracking is init without external id',
        });
        fbq.track('init', makePixelId);
      }

      initialized = true;
    } catch (e) {
      const error = e as string;
      this.logger.logError(error);
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
      this.logger.logWarning({
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
      this.logger.logError(error);
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
      this.logger.logWarning({
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
      this.logger.logError(error);
    }

    // Facebook API conversion
    const expressService = new ExpressService(this.logger);
    expressService.sendFbEventConversion(
      eventName,
      eventId,
      eventParameters,
      url,
      vistorId
    );
  },
};
