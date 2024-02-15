/* eslint-disable no-console */
import { ITrackerProvider, ILogger } from '../interface';
import { Recipient, TrackingConsentType } from '../types';
import { mixpnl } from '../pixel/mixpanel';

export class MixpanelTracker implements ITrackerProvider {
  name = 'mixpanel';

  consent: keyof TrackingConsentType = 'advertising';

  recipients: (keyof typeof Recipient)[] = [];

  #token: string;

  #isEnabled = false;

  #logger: ILogger = {
    logError: data => console.error(data),
    logWarning: data => console.warn(data),
    logInfo: data => console.info(data),
  };

  constructor(
    token: string,
    recipients: (keyof typeof Recipient)[],
    logger?: ILogger
  ) {
    this.#logger = logger ?? this.#logger;
    this.#token = token;
    this.recipients = recipients;
    if (!this.#token) {
      this.#logger.logError({
        message: `token is undefined on ${this.name} tracker.`,
        name: `${this.name}-tracker`,
      });
    }
  }

  #initPixel(): void {
    try {
      mixpnl.load(this.#token);
    } catch (e) {
      const error = e as string;
      this.#logger.logError(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  isInitialized(): boolean {
    return mixpnl.isLoaded();
  }

  setEnabled(enabled: boolean): void {
    if (!this.#token) {
      this.#logger.logWarning(
        `Trying to enable ${this.name} tracker but token is undefined.`
      );
      return;
    }
    this.#isEnabled = enabled;
    if (!this.isInitialized() && enabled) {
      this.#initPixel();
    }
    if (this.isInitialized() && !enabled) {
      try {
        mixpnl.revoke();
      } catch (e) {
        const error = e as string;
        this.#logger.logError(error);
      }
    }
  }

  send(
    eventId: string,
    eventName: string,
    params: Record<string, string>
  ): void {
    this.track(eventName, eventId, params);
  }

  track(
    eventName: string,
    eventId: string,
    eventParameters: Record<string, string>
  ): void {
    if (!this.#isEnabled) {
      return;
    }
    if (!this.isInitialized()) {
      this.#logger.logWarning({
        message: `${this.name} tracker not initialized - event: ${eventName} fail.`,
        name: `${this.name}-tracker`,
      });

      return;
    }

    try {
      mixpnl.track(eventName, eventParameters);
    } catch (e) {
      this.#logger.logError(e);
    }
  }
}
