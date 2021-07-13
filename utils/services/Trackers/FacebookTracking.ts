import { env } from '@make.org/assets/env';
import { fbq } from './fbq.js';

const makePixelId = '260470104426586';

let initialized = false;

type FacebookEventParams = {
  source?: string,
  location?: string,
  url?: string,
  country?: string,
  language?: string,
  referer?: string,
  question?: string,
  cardPosition?: string,
  sequenceId?: string,
  proposalId?: string,
  questionId?: string,
  questionSlug?: string,
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
  init(): void {
    fbq.load();
    fbq.track('init', makePixelId);
    initialized = true;
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

    fbq.track('track', 'PageView');
  },

  trackCustom(eventName: string, eventParameters: FacebookEventParams): void {
    if (!isFBInitialized()) {
      return;
    }

    if (env.isDev()) {
      // eslint-disable-next-line no-console
      console.info(
        `Tracking Custom Facebook (${makePixelId})
        event => ${eventName}
        params => ${JSON.stringify(eventParameters)}`
      );
      return;
    }

    fbq.track('trackSingleCustom', makePixelId, eventName, eventParameters);
  },
};
