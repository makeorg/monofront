/* eslint-disable no-console */
import { ITrackerProvider, ILogger } from '../interface';
import { Recipient, TrackingConsentType } from '../types';

export class FakeTracker implements ITrackerProvider {
  name = 'Fake';

  consent: keyof TrackingConsentType;

  enabled = true;

  recipients: (keyof typeof Recipient)[] = [];

  #logger: ILogger = {
    logError: data => console.log(data),
    logWarning: data => console.log(data),
    logInfo: data => console.log(data),
  };

  constructor(
    name: string,
    recipients: (keyof typeof Recipient)[],
    logger?: ILogger,
    consent: keyof TrackingConsentType = 'advertising'
  ) {
    this.name = name;
    this.recipients = recipients ?? this.recipients;
    this.#logger = logger ?? this.#logger;
    this.consent = consent;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  send(
    eventId: string,
    eventName: string,
    params: Record<string, string>
  ): void {
    this.#logger.logInfo({
      name: this.name,
      eventName,
      params,
      eventId,
    });
  }
}
