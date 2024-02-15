import { v4 as uuidv4 } from 'uuid';
import {
  ILogger,
  ITrackerProvider,
  TrackingValidationError,
} from './interface';
import { TrackConfigurationType, TrackingConsentType } from './types.js';

export class TrackingService {
  #trackConfiguration: TrackConfigurationType;

  #trackers: ITrackerProvider[];

  #consentIsdisabled = false;

  #logger: ILogger = {
    logError: data => console.error(data),
    logWarning: data => console.warn(data),
    logInfo: data => console.info(data),
  };

  constructor(
    trackConfiguration: TrackConfigurationType,
    trackers: ITrackerProvider[],
    logger?: ILogger
  ) {
    this.#trackConfiguration = trackConfiguration;
    this.#trackers = trackers;
    this.#logger = logger ?? this.#logger;
  }

  #validate(eventName: string, parameters: Record<string, string>) {
    const eventConfiguration = this.#trackConfiguration[eventName];
    const eventParameters = eventConfiguration?.parameters ?? [];

    if (!eventConfiguration) {
      throw new TrackingValidationError(
        `Tracking error: event not found "${eventName}"`
      );
    }

    eventParameters
      .filter(k => k.optional !== true)
      .forEach(param => {
        if (!parameters[param.key]) {
          throw new TrackingValidationError(
            `Tracking error: required param not found "${param.key}"`
          );
        }
      });

    eventConfiguration.parameters.forEach(param => {
      if (
        parameters[param.key] &&
        param.values &&
        param.values.length &&
        !param.values.find(el => el === parameters[param.key])
      ) {
        throw new TrackingValidationError(
          `Tracking error: invalid "${
            parameters[param.key]
          }" value. "${param.values.toString()}" expected.  (${param.key})`
        );
      }
    });

    Object.keys(parameters).forEach(paramName => {
      const found = eventConfiguration.parameters.find(
        v => v.key === paramName
      );
      if (!found) {
        throw new TrackingValidationError(
          `Tracking error: extra param found "${paramName}"`
        );
      }
    });
  }

  sendAllTrackers(eventName: string, parameters: Record<string, string>): void {
    try {
      this.#validate(eventName, parameters);
    } catch (e) {
      this.#logger.logError(e);

      return;
    }
    const eventId = uuidv4();
    this.#trackers.forEach(tracker => {
      const trackerRecipients = tracker.recipients ?? [];
      const eventConfigRecipients =
        this.#trackConfiguration[eventName]?.recipients ?? [];
      const eventConfigParameters =
        this.#trackConfiguration[eventName]?.parameters ?? [];

      if (
        !trackerRecipients.some(item => eventConfigRecipients.includes(item))
      ) {
        return;
      }

      const allowedParams = eventConfigParameters
        .filter(param => {
          const paramRecipients = param.recipients ?? [];
          return trackerRecipients.some(trackerRecipient =>
            paramRecipients.includes(trackerRecipient)
          );
        })
        .map(param => param.key);

      const filteredParams = Object.keys(parameters)
        .filter(key => allowedParams.includes(key))
        .reduce((obj: Record<string, string>, key: string) => {
          // eslint-disable-next-line no-param-reassign
          obj[key] = parameters[key];
          return obj;
        }, {} as Record<string, string>);

      tracker.send(eventId, eventName, filteredParams);
    });
  }

  updateConsent(consent: TrackingConsentType | null): void {
    if (this.#consentIsdisabled) {
      this.#trackers.forEach(tracker => {
        tracker.setEnabled(true);
      });
      return;
    }
    this.#trackers.forEach(tracker => {
      tracker.setEnabled(!!(consent && consent[tracker.consent]));
    });
  }
}
