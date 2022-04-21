/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// todo fix types
import { env } from '@make.org/assets/env';
import {
  PerformanceTimingType,
  TrackingConfigurationParamType,
  TrackingAllEventsType,
  TrackingEventConfigurationType,
} from '@make.org/types';
import Cookies from 'universal-cookie';
import { TrackingApiService } from '@make.org/api/TrackingApiService';
import { COOKIE } from '@make.org/types/enums';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { v4 as uuidv4 } from 'uuid';
import trackingConfiguration from './trackingConfiguration.yaml';
import { FacebookTracking } from './Trackers/FacebookTracking';
import { TwitterTracking } from './Trackers/TwitterTracking';
import { trackingParamsService } from './TrackingParamsService';
import { defaultUnexpectedError } from './DefaultErrorHandler';
import { MixpanelTracking } from './Trackers/MixpanelTracking';
import { Logger } from './Logger';
import { ExpressService } from './Express';

export class TrackingValidationError extends Error {}

const validateParameters = (
  values: TrackingConfigurationParamType,
  expectedParameters: TrackingConfigurationParamType[] = [],
  eventName: string
) => {
  const keys = Object.keys(values);
  const expectedKeys = expectedParameters.map(param => param.key);
  const extraKeys = keys.filter(key => !expectedKeys.find(el => el === key));
  if (extraKeys.length) {
    throw new TrackingValidationError(
      `Tracking error : find unexpected tracking values "${extraKeys.toString()}" for "${eventName}"`
    );
  }
  expectedParameters.forEach(expectedParam => {
    const { key: expectedKey = '', optional } = expectedParam;
    //@ts-ignore
    if (!values[expectedKey] && optional !== true) {
      throw new TrackingValidationError(
        `Tracking error : required param not found "${expectedKey}"`
      );
    }
    if (
      expectedParam.values &&
      expectedParam.values.length &&
      //@ts-ignore
      !expectedParam.values.find(el => el === values[expectedKey])
    ) {
      throw new TrackingValidationError(
        `Tracking error : invalid "${
          //@ts-ignore
          values[expectedKey]
        }" value. "${expectedParam.values.toString()}" expected.`
      );
    }
  });
};

const trackingEvent: TrackingAllEventsType = {};
Object.keys(trackingConfiguration).forEach(key => {
  const eventConfiguration: TrackingEventConfigurationType =
    trackingConfiguration[key];
  trackingEvent[key] = params => {
    const {
      key: eventName,
      parameters,
      protected_parameters: protectedParameters,
    } = eventConfiguration;
    try {
      validateParameters(params || {}, parameters || [], eventName);
    } catch (e: unknown) {
      const error = e as TrackingValidationError;
      Logger.logError({
        name: 'tracking',
        message: error.message,
        app_trackingEvent: eventName || '-',
        app_trackingParams: JSON.stringify(params || {}),
        app_trackingParamsConfig: JSON.stringify(parameters || []),
        stack: error.stack,
      });

      throw e;
    }

    return {
      eventName: eventName || '',
      parameters: params || {},
      protectedParameters: protectedParameters || [],
    };
  };
});

const getEventParameters = (parameters: TrackingConfigurationParamType) => {
  const { parameters: defaultParameters } = trackingEvent.COMMON_PARAMETERS(
    trackingParamsService.all()
  );
  return {
    ...defaultParameters,
    ...parameters,
  };
};

const trackPerformance = async (
  applicationName: string,
  timings: PerformanceTimingType
): Promise<void> => {
  try {
    await TrackingApiService.trackPerformance(applicationName, timings);
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);
  }
};

export const track = (
  eventName: string,
  parameters: TrackingConfigurationParamType
): Promise<void> => {
  if (env.isDev()) {
    // eslint-disable-next-line no-console
    console.info(
      `Tracking: event ${eventName} params ${JSON.stringify(parameters)}`
    );
    return Promise.resolve();
  }
  const params = {
    eventName,
    eventParameters: parameters,
    eventType: 'trackCustom',
  };

  return TrackingApiService.track(params).then();
};

export const TrackingService = {
  trackPerformance,
  trackingEvent,
  sendAllTrackers: ({
    eventName,
    parameters,
    protectedParameters = [],
  }: {
    eventName: string;
    parameters: TrackingConfigurationParamType;
    protectedParameters: string[];
  }): void => {
    const cookies = new Cookies();
    const preferencesCookie = cookies.get(COOKIE.USER_PREFERENCES);
    const externalTrackingParameters = Object.keys(parameters)
      .filter(key => !protectedParameters.includes(key))
      .reduce(
        (obj, key) => ({
          ...obj,
          //@ts-ignore
          [key]: parameters[key],
        }),
        {}
      );

    // API tracking
    track(eventName, getEventParameters(parameters));

    const eventId = uuidv4();

    // Facebook
    if (preferencesCookie?.facebook_tracking) {
      FacebookTracking.trackCustom(
        eventName,
        eventId,
        getEventParameters(externalTrackingParameters)
      );
    }

    // Facebook API conversion
    if (preferencesCookie?.facebook_tracking) {
      ExpressService.sendFbEventConversion(
        eventName,
        eventId,
        getEventParameters(externalTrackingParameters),
        trackingParamsService.url,
        trackingParamsService.visitorId
      );
    }

    // Twitter
    if (preferencesCookie?.twitter_tracking) {
      TwitterTracking.track(eventName);
    }

    // Mixpanel
    if (!trackingParamsService.visitorId) {
      Logger.logError({
        name: 'tracking',
        message: `Tracking event "${eventName}" failed due to lack of unique id`,
      });
    }

    // Todo handle MixpanelTracking init
    MixpanelTracking.track(
      eventName,
      // @ts-ignore
      getEventParameters({
        ...parameters,
        // @ts-ignore
        distinctId: trackingParamsService.visitorId,
      })
    );
  },
};
