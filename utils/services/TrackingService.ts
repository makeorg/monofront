import { env } from '@make.org/assets/env';
import {
  PerformanceTimingType,
  TrackingConfigurationParamType,
  TrackingAllEventsType,
  TrackingEventConfigurationType,
} from '@make.org/types';
import Cookies from 'universal-cookie';
import { USER_PREFERENCES_COOKIE } from '@make.org/utils/constants/cookies';
import { TrackingApiService } from '@make.org/api/TrackingApiService';
import trackingConfiguration from './trackingConfiguration.yaml';
import { FacebookTracking } from './Trackers/FacebookTracking';
import { TwitterTracking } from './Trackers/TwitterTracking.js';
import { trackingParamsService } from './TrackingParamsService';
import { defaultUnexpectedError } from './DefaultErrorHandler';

const validateParameters = (
  values: TrackingConfigurationParamType,
  expectedParameters: TrackingConfigurationParamType[] = []
) => {
  const keys = Object.keys(values);
  const expectedKeys = expectedParameters.map(param => param.key);
  const extraKeys = keys.filter(key => !expectedKeys.find(el => el === key));
  if (extraKeys.length) {
    throw new Error(
      `Tracking error : find unexpected tracking values "${extraKeys.toString()}"`
    );
  }
  expectedParameters.forEach(expectedParam => {
    const { key: expectedKey = '', optional } = expectedParam;
    if (!values[expectedKey] && optional !== true) {
      throw new Error(
        `Tracking error : required param not found "${expectedKey}"`
      );
    }
    if (
      expectedParam.values &&
      expectedParam.values.length &&
      !expectedParam.values.find(el => el === values[expectedKey])
    ) {
      throw new Error(
        `Tracking error : invalid "${
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
    const { key: eventName, parameters } = eventConfiguration;
    validateParameters(params || {}, parameters || []);

    return { eventName: eventName || '', parameters: params || undefined };
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
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);
  }
};

export const track = (
  eventName: string,
  parameters: TrackingConfigurationParamType
): Promise<any> => {
  const eventParameters = getEventParameters(parameters);

  if (env.isDev()) {
    // eslint-disable-next-line no-console
    console.info(
      `Tracking: event ${eventName} params ${JSON.stringify(eventParameters)}`
    );
    return Promise.resolve();
  }
  const params = {
    eventName,
    eventParameters,
    eventType: 'trackCustom',
  };

  return TrackingApiService.track(params);
};

const trackFacebookPixel = (
  eventName: string,
  parameters: TrackingConfigurationParamType
): void => {
  const eventParameters: TrackingConfigurationParamType =
    getEventParameters(parameters);

  FacebookTracking.trackCustom(eventName, eventParameters);
};

const trackTwitterPixel = (eventName: string | number): void => {
  TwitterTracking.track(eventName);
};

export const TrackingService = {
  trackPerformance,
  trackingEvent,
  track,
  trackFacebookPixel,
  trackTwitterPixel,
  sendAllTrackers: ({
    eventName,
    parameters,
  }: {
    eventName: string;
    parameters: TrackingConfigurationParamType;
  }): void => {
    const cookies = new Cookies();
    const preferencesCookie = cookies.get(USER_PREFERENCES_COOKIE);

    TrackingService.track(eventName, parameters);

    if (preferencesCookie?.facebook_tracking) {
      TrackingService.trackFacebookPixel(eventName, parameters);
    }

    if (preferencesCookie?.twitter_tracking) {
      TrackingService.trackTwitterPixel(Number(eventName));
    }
  },
};
