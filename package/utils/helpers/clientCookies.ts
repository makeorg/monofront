import { FacebookTracking } from '@make.org/utils/services/Trackers/FacebookTracking';
import { StateTrackingConsent } from '@make.org/types';
import Cookies from 'universal-cookie';
import { MixpanelTracking } from '@make.org/utils/services/Trackers/MixpanelTracking';
import { COOKIE, LocaleType } from '@make.org/types/enums';
import { env } from '@make.org/assets/env';
import { hotjar } from 'react-hotjar';
import { twitter } from '@make.org/utils/services/Trackers/twttr.js';
import { TwitterPixel } from '@make.org/utils/services/Trackers/TwitterTracking';

declare global {
  interface Window {
    HOTJAR_TOKEN?: string;
  }
}

// set cookie expiration for user preferences (1 year)
const today = new Date();
const nextYear = new Date();
const nextMonth = new Date();
nextYear.setFullYear(today.getFullYear() + 1);
nextMonth.setMonth(today.getMonth() + 1);
const cookies = new Cookies();

export const getLanguageFromPreferencesCookie = (): keyof typeof LocaleType =>
  cookies.get(COOKIE.USER_PREFERENCES)?.language;

export const setCookieWithTrackingConsent = (
  trackingConsent: StateTrackingConsent
): void => {
  cookies.set(
    COOKIE.USER_PREFERENCES,
    JSON.stringify({
      tracking_consent: trackingConsent,
      language: getLanguageFromPreferencesCookie(),
    }),
    {
      path: '/',
      expires: nextYear,
    }
  );
};

export const setLanguageInPreferenceCookie = (
  languageCookie: keyof typeof LocaleType,
  trackingConsent: StateTrackingConsent
): void => {
  cookies.set(
    COOKIE.USER_PREFERENCES,
    JSON.stringify({
      tracking_consent: trackingConsent,
      language: languageCookie,
    }),
    {
      path: '/',
      expires: nextYear,
    }
  );
};

export const initTrackersFromPreferences = (
  trackingConsent: StateTrackingConsent,
  visitorId?: string,
  enableMixPanel?: boolean
): void => {
  const hotjarToken = env.isClientSide()
    ? window?.HOTJAR_TOKEN
    : env.hotjarToken();
  const hotjarVersion = 6;

  hotjar.initialize(Number(hotjarToken), hotjarVersion);

  const shouldInitFbPixel =
    trackingConsent.facebook_tracking && !FacebookTracking.isInitialized();

  if (shouldInitFbPixel && visitorId) {
    FacebookTracking.init(visitorId);
    FacebookTracking.pageView();
  }

  if (shouldInitFbPixel && !visitorId) {
    FacebookTracking.init();
    FacebookTracking.pageView();
  }

  if (trackingConsent.twitter_tracking && !twitter.initialized()) {
    TwitterPixel.init();
  }

  if (enableMixPanel) {
    MixpanelTracking.init();
  }
};

export const removeTrackersFromPreferences = (
  trackingConsent: StateTrackingConsent
): void => {
  const disableFBTacking =
    !trackingConsent.facebook_tracking && FacebookTracking.isInitialized();
  const disableTWTracking =
    !trackingConsent.twitter_tracking && twitter.initialized();

  if (disableFBTacking || disableTWTracking) {
    window.location.reload();
  }
};

export const setDemographicsCookie = (): void => {
  cookies.set(COOKIE.DEMOGRAPHICS, JSON.stringify(true), {
    path: '/',
    expires: nextMonth,
  });
};
