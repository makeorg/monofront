/* eslint-disable @typescript-eslint/ban-ts-comment */
import { env } from '@make.org/assets/env';
import { ILogger } from '@make.org/types';
import { snap } from '@make.org/utils/services/Trackers/snap.js';
import trackingConfiguration from '../trackingConfiguration.yaml';

let initialized = false;
declare global {
  interface Window {
    SNAP_PIXEL_ID?: string;
  }
}
const snapPixelId = env.isClientSide()
  ? window?.SNAP_PIXEL_ID
  : env.snapPixelId();

const snapchatEventMapping = {
  [trackingConfiguration.CLICK_SEQUENCE_FIRST_VOTE.key]: 'SIGN_UP',
};

const isSnapInitialized = (): boolean => initialized;

export const SnapchatTracking = {
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
      snap.load();

      if (externalId) {
        snap.track('init', snapPixelId, {
          uuid_c1: externalId,
        });
      } else {
        this.logger.logWarning({
          name: 'tracking-snapchat',
          message: 'Tracking is init without external id',
        });
        snap.track('init', snapPixelId);
      }
      initialized = true;
    } catch (e) {
      const error = e as string;
      this.logger.logError(error);
    }
  },

  isInitialized(): boolean {
    return isSnapInitialized();
  },

  pageView(externalId?: string): void {
    if (!isSnapInitialized()) {
      // eslint-disable-next-line no-console
      this.logger.logWarning({
        message:
          'Snapchat Tracking not initialized before using call SnapchatTracking.init with required params - event: PageView',
        name: 'tracking-init',
      });
      return;
    }

    if (env.isDev()) {
      // eslint-disable-next-line no-console
      console.info(
        `Tracking  Snapchat (${snapPixelId})
        track PageView`
      );

      return;
    }

    try {
      if (externalId) {
        snap.track('track', 'PAGE_VIEW', {
          uuid_c1: externalId,
        });
      } else {
        snap.track('track', 'PAGE_VIEW');
      }
    } catch (e) {
      const error = e as string;
      this.logger.logError(error);
    }
  },

  trackCustom(action: string, externalId?: string): void {
    // @ts-ignore
    if (snapchatEventMapping[action] === undefined) {
      return;
    }
    // @ts-ignore
    const eventName = snapchatEventMapping[action];

    if (!isSnapInitialized()) {
      // eslint-disable-next-line no-console
      this.logger.logWarning({
        message: `Snapchat Tracking not initialized before using call SnapchatTracking.init with required params - event: ${eventName}`,
        name: 'tracking-init',
      });
      return;
    }

    if (env.isDev()) {
      // eslint-disable-next-line no-console
      console.info(
        `Tracking Custom Snapchat (${snapPixelId})
        event => ${eventName}
        uuid_c1 => ${externalId}`
      );

      return;
    }

    // pixel Snapchat
    try {
      if (externalId) {
        snap.track('track', eventName, {
          uuid_c1: externalId,
        });
      } else {
        snap.track('track', eventName);
      }
    } catch (e) {
      const error = e as string;
      this.logger.logError(error);
    }
  },
};
