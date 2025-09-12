/* eslint-disable @typescript-eslint/ban-ts-comment */
import { env } from '@make.org/assets/env';
import { ILogger } from '@make.org/types';
import { ydot } from '@make.org/utils/services/Trackers/ydot.js';
import trackingConfiguration from '../trackingConfiguration.yaml';

let initialized = false;
declare global {
  interface Window {
    YDOT_PIXEL_ID?: string;
  }
}
const yDotProjectId = '10000';

const yDotPixelId = env.isClientSide()
  ? window?.YDOT_PIXEL_ID
  : env.yDotPixelId();

const YDotEventMapping = {
  [trackingConfiguration.CLICK_SEQUENCE_FIRST_VOTE.key]: 'First_Vote',
};

const isYDotInitialized = (): boolean => initialized;

export const YDotTracking = {
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
      ydot.load(yDotProjectId, yDotPixelId);

      initialized = true;
    } catch (e) {
      const error = e as string;
      this.logger.logError(error);
    }
  },

  isInitialized(): boolean {
    return isYDotInitialized();
  },

  trackCustom(action: string): void {
    // @ts-ignore
    if (YDotEventMapping[action] === undefined) {
      return;
    }
    // @ts-ignore
    const eventName = YDotEventMapping[action];

    if (!isYDotInitialized()) {
      // eslint-disable-next-line no-console
      this.logger.logWarning({
        message: `YDot Tracking not initialized before using call YDotTracking.init with required params - event: ${eventName}`,
        name: 'tracking-init',
      });
      return;
    }

    if (env.isDev()) {
      // eslint-disable-next-line no-console
      console.info(
        `Tracking Custom YDot (${yDotPixelId})
        event => ${eventName}`
      );

      return;
    }

    // pixel YDot
    try {
      ydot.track({
        projectId: yDotProjectId,
        properties: {
          pixelId: yDotPixelId,
          qstrings: {
            et: 'custom',
            ea: eventName,
          },
        },
      });
    } catch (e) {
      const error = e as string;
      this.logger.logError(error);
    }
  },
};
