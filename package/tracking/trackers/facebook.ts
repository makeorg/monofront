/* eslint-disable no-console */
import { fbq } from '../pixel/facebook';
import {
  ITrackerProvider,
  IConversionClientService,
  ILogger,
} from '../interface';
import { Recipient, TrackingConsentType } from '../types';

export class FacebookTracker implements ITrackerProvider {
  name = 'facebook';

  consent: keyof TrackingConsentType = 'advertising';

  recipients: (keyof typeof Recipient)[] = [];

  #pixelId: string;

  #conversionService: IConversionClientService;

  #externalId?: string;

  #isInitialized = false;

  #isEnabled = false;

  #logger: ILogger = {
    logError: data => console.error(data),
    logWarning: data => console.warn(data),
    logInfo: data => console.info(data),
  };

  constructor(
    pixelId: string,
    conversionService: IConversionClientService,
    recipients: (keyof typeof Recipient)[],
    externalId?: string,
    logger?: ILogger
  ) {
    this.#logger = logger ?? this.#logger;
    this.#pixelId = pixelId;
    this.#conversionService = conversionService;
    this.#externalId = externalId;
    this.recipients = recipients;

    if (!this.#pixelId) {
      this.#logger.logError({
        message: `PixelId is undefined on ${this.name} tracker.`,
        name: `${this.name}-tracker`,
      });
    }
  }

  #initPixel(): void {
    try {
      fbq.load();
      if (this.#externalId) {
        fbq.track('init', this.#pixelId, {
          external_id: this.#externalId,
        });
      } else {
        this.#logger.logWarning({
          name: `${this.name}-tracker`,
          message: 'Tracking is init without external id.',
        });
        fbq.track('init', this.#pixelId);
      }

      this.#isInitialized = true;
    } catch (e) {
      const error = e as string;
      this.#logger.logError(error);
    }
  }

  isInitialized(): boolean {
    return this.#isInitialized;
  }

  setEnabled(enabled: boolean): void {
    if (!this.#pixelId) {
      this.#logger.logWarning(
        `Trying to enable ${this.name} tracker but pixelId is undefined.`
      );
      return;
    }
    this.#isEnabled = enabled;
    if (!this.isInitialized() && enabled) {
      this.#initPixel();
      return;
    }
    try {
      if (this.isInitialized() && enabled) {
        fbq.grant();
      }
      if (this.isInitialized() && !enabled) {
        fbq.revoke();
      }
    } catch (e) {
      const error = e as string;
      this.#logger.logError(error);
    }
  }

  send(
    eventId: string,
    eventName: string,
    params: Record<string, string>
  ): void {
    this.trackCustom(
      eventName,
      eventId,
      params,
      undefined,
      this.#externalId ?? ''
    );
  }

  pageView(): void {
    if (!this.#isEnabled) {
      return;
    }
    if (!this.isInitialized()) {
      // eslint-disable-next-line no-console
      this.#logger.logWarning({
        message: `${this.name} tracker not initialized: event pageView fail.`,
        name: `${this.name}-tracker`,
      });
      return;
    }

    try {
      fbq.track('track', 'PageView');
    } catch (e) {
      const error = e as string;
      this.#logger.logError(error);
    }
  }

  trackCustom(
    eventName: string,
    eventId: string,
    eventParameters: Record<string, string>,
    url: string | undefined,
    uniqueUserId: string
  ): void {
    if (!this.#isEnabled) {
      return;
    }
    if (!this.isInitialized()) {
      this.#logger.logWarning({
        message: `${this.name} tracker not initialized: event "${eventName}" fail`,
        name: `${this.name}-tracker`,
      });
      return;
    }

    // pixel FB
    try {
      fbq.track(
        'trackSingleCustom',
        this.#pixelId,
        eventName,
        eventParameters,
        {
          eventID: eventId,
        }
      );
    } catch (e) {
      const error = e as string;
      this.#logger.logError(error);
    }

    // API conversion
    this.#conversionService.sendEventFromClient(
      eventName,
      eventId,
      eventParameters,
      uniqueUserId,
      eventParameters.url
    );
  }
}
