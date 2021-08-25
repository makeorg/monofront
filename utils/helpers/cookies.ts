import { USER_PREFERENCES_COOKIE } from '@make.org/utils/constants/cookies';
import { FacebookTracking } from '@make.org/utils/services/Trackers/FacebookTracking';
import { StateUserCookiesPreferences } from '@make.org/types';
import Cookies from 'universal-cookie';
import { MixpanelTracking } from '@make.org/utils/services/Trackers/MixpanelTracking';
import { TwitterUniversalTag } from '../services/Trackers/TwitterTracking.js';
import { TWITTER_SCRIPT, twttr } from '../services/Trackers/twttr.js';

// set cookie expiration for user preferences (1 year)
const today = new Date();
const nextYear = new Date();
nextYear.setFullYear(today.getFullYear() + 1);
const cookies = new Cookies();

export const setPreferencesCookie = (
  preferences: StateUserCookiesPreferences
): void => {
  cookies.set(USER_PREFERENCES_COOKIE, JSON.stringify(preferences), {
    path: '/',
    expires: nextYear,
  });
};

export const initTrackersFromPreferences = (
  cookiePreferences: StateUserCookiesPreferences
): void => {
  const body = document.querySelector('body');
  const twitterScript = document.createElement('script');
  twitterScript.setAttribute('type', 'text/javascript');
  twitterScript.setAttribute('async', 'true');
  twitterScript.src = TWITTER_SCRIPT;

  if (
    cookiePreferences?.facebook_tracking &&
    !FacebookTracking.isInitialized()
  ) {
    FacebookTracking.init();
  }

  if (cookiePreferences?.twitter_tracking && !twttr.initialized()) {
    if (body) {
      body.appendChild(twitterScript);
    }
    TwitterUniversalTag.init();
  }

  // allways init mixpanel
  MixpanelTracking.init();
};

export const removeTrackersFromPreferences = (
  cookiePreferences: StateUserCookiesPreferences
): void => {
  const disableFBTacking =
    !cookiePreferences.facebook_tracking && FacebookTracking.isInitialized();
  const disableTWTracking =
    !cookiePreferences.twitter_tracking && twttr.initialized();

  if (disableFBTacking || disableTWTracking) {
    window.location.reload();
  }
};
