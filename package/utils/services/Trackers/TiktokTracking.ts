/* eslint-disable @typescript-eslint/ban-ts-comment */
import { env } from '@make.org/assets/env';
import { ILogger } from '@make.org/types';
import { ttq } from '@make.org/utils/services/Trackers/tiktok.js';

let initialized = false;
declare global {
  interface Window {
    TIKTOK_PIXEL_ID?: string;
  }
}

const tiktokPixelId = env.isClientSide()
  ? window?.TIKTOK_PIXEL_ID
  : env.tiktokPixelId();

const isTiktokInitialized = (): boolean => initialized;

export const TiktokTracking = {
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

  init(logger: ILogger): void {
    this.logger = logger;

    try {
      ttq.load(tiktokPixelId);
      initialized = true;
    } catch (e) {
      const error = e as string;
      this.logger.logError(error);
    }
  },

  isInitialized(): boolean {
    return isTiktokInitialized();
  },

  pageView(): void {
    if (!isTiktokInitialized()) {
      // eslint-disable-next-line no-console
      this.logger.logWarning({
        message: 'Tiktok Tracking not initialized before using method page()',
        name: 'tracking-init',
      });
      return;
    }

    if (env.isDev()) {
      // eslint-disable-next-line no-console
      console.info(`Tracking Tiktok (${tiktokPixelId}) page()`);

      return;
    }

    try {
      ttq.page();
    } catch (e) {
      const error = e as string;
      this.logger.logError(error);
    }
  },

  track(eventName: string): void {
    if (!isTiktokInitialized()) {
      // eslint-disable-next-line no-console
      this.logger.logWarning({
        message: `Tiktok Tracking not initialized before using call TiktokTracking.init with required params - event: ${eventName}`,
        name: 'tracking-init',
      });
      return;
    }

    if (env.isDev()) {
      // eslint-disable-next-line no-console
      console.info(
        `Tracking Custom Tiktok (${tiktokPixelId}) event => ${eventName}`
      );

      return;
    }

    try {
      ttq.track(eventName);
    } catch (e) {
      const error = e as string;
      this.logger.logError(error);
    }
  },
};
