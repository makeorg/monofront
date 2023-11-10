import { StateTrackingConsent, Reducer, ReducerAction } from '@make.org/types';
import {
  ACCEPT_ALL_TRACKING_CONSENT,
  REJECT_ALL_TRACKING_CONSENT,
  UPDATE_TRACKING_CONSENT,
} from '../../../actionTypes';

export const trackingConsent_state: StateTrackingConsent = {
  facebook_tracking: false,
  twitter_tracking: false,
  facebook_sharing: false,
  twitter_sharing: false,
  linkedin_sharing: false,
};

export const trackingConsent_reducer: Reducer = (
  // eslint-disable-next-line default-param-last
  state: StateTrackingConsent = trackingConsent_state,
  action: ReducerAction
): StateTrackingConsent => {
  switch (action.type) {
    case UPDATE_TRACKING_CONSENT:
      return {
        ...state,
        ...action.payload.consentUpdate,
      };
    case ACCEPT_ALL_TRACKING_CONSENT:
      return {
        facebook_tracking: true,
        twitter_tracking: true,
        facebook_sharing: true,
        twitter_sharing: true,
        linkedin_sharing: true,
      };
    case REJECT_ALL_TRACKING_CONSENT:
      return {
        facebook_tracking: false,
        twitter_tracking: false,
        facebook_sharing: false,
        twitter_sharing: false,
        linkedin_sharing: false,
      };

    default:
      return state;
  }
};
