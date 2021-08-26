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
import trackingConfiguration from './trackingConfiguration.yaml';
import { FacebookTracking } from './Trackers/FacebookTracking';
import { TwitterTracking } from './Trackers/TwitterTracking.js';
import { trackingParamsService } from './TrackingParamsService';
import { defaultUnexpectedError } from './DefaultErrorHandler';
import { MixpanelTracking } from './Trackers/MixpanelTracking';
import { Logger } from './Logger';

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
    const {
      key: eventName,
      parameters,
      protected_parameters: protectedParameters,
    } = eventConfiguration;

    validateParameters(params || {}, parameters || []);

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
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);
  }
};

export const track = (
  eventName: string,
  parameters: TrackingConfigurationParamType
): Promise<any> => {
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

  return TrackingApiService.track(params);
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
    protectedParameters: any;
  }): void => {
    const cookies = new Cookies();
    const preferencesCookie = cookies.get(COOKIE.USER_PREFERENCES);
    const externalTrackingParameters = Object.keys(parameters)
      .filter(key => !protectedParameters.includes(key))
      .reduce(
        (obj, key) => ({
          ...obj,
          [key]: parameters[key],
        }),
        {}
      );

    // API tracking
    track(eventName, getEventParameters(parameters));

    // Facebook
    if (preferencesCookie?.facebook_tracking) {
      FacebookTracking.trackCustom(
        eventName,
        getEventParameters(externalTrackingParameters)
      );
    }

    // Twitter
    if (preferencesCookie?.twitter_tracking) {
      TwitterTracking.track(eventName);
    }

    // Mixpanel
    if (!trackingParamsService.visitorId) {
      Logger.logError(
        `Tracking event "${eventName}" failed due to lack of unique id`
      );
      return;
    }

    MixpanelTracking.track(
      eventName,
      // todo fix type
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getEventParameters({
        ...externalTrackingParameters,
        distinctId: trackingParamsService.visitorId,
      })
    );
  },
};
