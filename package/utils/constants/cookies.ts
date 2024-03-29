import { StateTrackingConsent } from '@make.org/types';

export const ACCEPT_ALL_PREFERENCES: StateTrackingConsent = {
  facebook_tracking: true,
  twitter_tracking: true,
  facebook_sharing: true,
  twitter_sharing: true,
  linkedin_sharing: true,
};

export const REJECT_ALL_PREFRENCES: StateTrackingConsent = {
  facebook_tracking: false,
  twitter_tracking: false,
  facebook_sharing: false,
  twitter_sharing: false,
  linkedin_sharing: false,
};

export const ENABLE_MIXPANEL = true;
