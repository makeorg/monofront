/* eslint-disable no-console */
import {
  ITrackerProvider,
  ILogger,
  IConversionClientService,
} from '../interface';
import { twitterPixel } from '../pixel/twitter';
import { Recipient, TrackingConsentType } from '../types';

export class TwitterTracker implements ITrackerProvider {
  name = 'twitter';

  consent: keyof TrackingConsentType = 'advertising';

  recipients: (keyof typeof Recipient)[] = [];

  #pixelId: string;

  #isEnabled = false;

  #eventMapping: Record<string, string>;

  #conversionService: IConversionClientService;

  #logger: ILogger = {
    logError: data => console.error(data),
    logWarning: data => console.warn(data),
    logInfo: data => console.info(data),
  };

  constructor(
    pixelId: string,
    conversionService: IConversionClientService,
    recipients: (keyof typeof Recipient)[],
    eventMapping: Record<string, string>,
    logger?: ILogger
  ) {
    this.#pixelId = pixelId;
    this.recipients = recipients;
    this.#eventMapping = eventMapping;
    this.#logger = logger ?? this.#logger;
    this.#conversionService = conversionService;

    if (!this.#pixelId) {
      this.#logger.logError({
        message: `pixelId is undefined on ${this.name} tracker.`,
        name: `${this.name}-tracker`,
      });
    }
  }

  #initPixel(): void {
    try {
      twitterPixel.load(this.#pixelId);
    } catch (e) {
      const error = e as string;
      this.#logger.logError(error);
    }
  }

  #formatEventName(eventName: string): string {
    return `tw-${this.#pixelId}-${this.#eventMapping[eventName]}`;
  }

  // Conversion API requires Twitter Click ID (twclid) as the identifier for a conversion event
  // More informations : https://developer.twitter.com/en/docs/twitter-ads-api/measurement/web-conversions/conversion-ap
  #retrieveTwclid(): string | null {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const twclid = searchParams.get('twclid');

      return twclid;
    } catch (e) {
      const error = e as string;
      this.#logger.logError(error);

      return null;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  isInitialized(): boolean {
    return twitterPixel.isLoaded();
  }

  setEnabled(enabled: boolean): void {
    if (!this.#pixelId) {
      this.#logger.logWarning(
        `Trying to enable ${this.name} tracker but pixelId is undfined.`
      );
      return;
    }
    this.#isEnabled = enabled;
    if (!this.isInitialized() && enabled) {
      this.#initPixel();
    }
  }

  send(
    eventId: string,
    eventName: string,
    params: Record<string, string>
  ): void {
    this.#track(eventId, eventName, params);
  }

  async #track(
    eventId: string,
    eventName: string,
    params: Record<string, string>
  ): Promise<void> {
    if (!this.#isEnabled) {
      return;
    }
    if (!this.isInitialized()) {
      this.#logger.logWarning({
        message: `${this.name} tracker not initialized - event: ${eventName} fail.`,
        name: `${this.name}-tracker`,
      });
    }

    if (this.#eventMapping[eventName] === undefined) {
      return;
    }

    const twitterEventName = this.#formatEventName(eventName);

    if (!this.isInitialized()) {
      this.#logger.logError({
        message: `${this.name} tracker not initialized. Action : ${twitterEventName}.`,
        name: `${this.name}-tracker`,
      });

      return;
    }

    // pixel TW
    try {
      twitterPixel.track(twitterEventName, eventId);
    } catch (e) {
      const error = e as string;
      this.#logger.logError(error);
    }

    const twclid = this.#retrieveTwclid();

    this.#conversionService.sendEventFromClient(
      twitterEventName,
      eventId,
      params,
      twclid || undefined
    );
  }
}
