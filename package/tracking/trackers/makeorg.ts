/* eslint-disable no-console */
import { TrackingApiServiceParamsType } from '@make.org/types';
import { ITrackerProvider, IClientService, ILogger } from '../interface';
import { Recipient, TrackingConsentType } from '../types';

export class MakeorgTracker implements ITrackerProvider {
  name = 'make.org-internal';

  consent: keyof TrackingConsentType = 'necessary';

  recipients: (keyof typeof Recipient)[] = [];

  #clientService: IClientService;

  #apiUrl: string;

  #isEnabled = false;

  #logger: ILogger = {
    logError: (data: unknown) => console.error(data),
    logWarning: (data: unknown) => console.warn(data),
    logInfo: (data: unknown) => console.info(data),
  };

  constructor(
    clientService: IClientService,
    apiUrl: string,
    recipients: (keyof typeof Recipient)[],
    logger?: ILogger
  ) {
    this.#clientService = clientService;
    this.recipients = recipients;
    this.#logger = logger ?? this.#logger;
    this.#apiUrl = apiUrl;
    if (!this.#apiUrl) {
      this.#logger.logError({
        message: `Api url is undefined on ${this.name} tracker.`,
        name: `${this.name}-tracker`,
      });
    }
  }

  async #track(parameters: TrackingApiServiceParamsType): Promise<void> {
    if (!this.#isEnabled) {
      return;
    }
    this.#clientService
      .callApi(this.#apiUrl, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify(parameters),
      })
      .catch((e: unknown) => this.#logger.logError(e));
  }

  setEnabled(enabled: boolean): void {
    if (!this.#apiUrl) {
      this.#logger.logWarning(
        `Trying to enable ${this.name} tracker but api url is undefined.`
      );
      return;
    }
    this.#isEnabled = enabled;
  }

  send(
    eventId: string,
    eventName: string,
    params: Record<string, string>
  ): void {
    if (!this.#isEnabled) {
      return;
    }
    const parameters = {
      eventName,
      eventParameters: {
        event_id: eventId,
        ...params,
      },
      eventType: 'trackCustom',
    };

    this.#track(parameters);
  }
}
