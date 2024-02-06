import { v4 as uuidv4 } from 'uuid';
import { TrackerProviderType, TrackingValidationError } from './interface';
import { TrackConfigurationType } from './types.js';

export class TrackingService {
  #trackConfiguration: TrackConfigurationType;

  #trackers: TrackerProviderType[];

  constructor(
    trackConfiguration: TrackConfigurationType,
    trackers: TrackerProviderType[]
  ) {
    this.#trackConfiguration = trackConfiguration;
    this.#trackers = trackers;
  }

  #validate(eventName: string, parameters: Record<string, string>) {
    const eventConfiguration = this.#trackConfiguration[eventName];

    if (!eventConfiguration) {
      throw new TrackingValidationError(
        `Tracking error : event not found "${eventName}"`
      );
    }

    eventConfiguration.parameters
      .filter(k => k.optional !== true)
      .forEach(param => {
        if (!parameters[param.key]) {
          throw new TrackingValidationError(
            `Tracking error : required param not found "${param.key}"`
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
          `Tracking error : invalid "${
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
          `Tracking error : extra param found "${paramName}"`
        );
      }
    });
  }

  sendAllTrackers(eventName: string, parameters: Record<string, string>): void {
    this.#validate(eventName, parameters);
    this.#trackers.forEach(tracker => {
      const allowedParams = this.#trackConfiguration[eventName]?.parameters
        .filter(k =>
          k.recipients.some(item => tracker.recipients.includes(item))
        )
        .map(k => k.key);

      const filteredParams = Object.keys(parameters)
        .filter(key => allowedParams.includes(key))
        .reduce((obj: Record<string, string>, key: string) => {
          // eslint-disable-next-line no-param-reassign
          obj[key] = parameters[key];
          return obj;
        }, {} as Record<string, string>);

      tracker.send(uuidv4(), eventName, filteredParams);
    });
  }
}
