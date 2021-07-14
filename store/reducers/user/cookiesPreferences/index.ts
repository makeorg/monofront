import {
  StateUserCookiesPreferences,
  Reducer,
  ReducerAction,
} from '@make.org/types';
import {
  ACCEPT_ALL_COOKIES_PREFERENCES,
  REJECT_ALL_COOKIES_PREFERENCES,
  SET_COOKIES_PREFERENCES,
} from '../../../actionTypes';

export const cookiesPreferences_state: StateUserCookiesPreferences = {
  facebook_tracking: false,
  twitter_tracking: false,
  facebook_sharing: false,
  twitter_sharing: false,
  linkedin_sharing: false,
};

export const cookiesPreferences_reducer: Reducer = (
  state: StateUserCookiesPreferences = cookiesPreferences_state,
  action: ReducerAction
): StateUserCookiesPreferences => {
  switch (action.type) {
    case SET_COOKIES_PREFERENCES:
      return {
        ...state,
        ...action.payload.cookiesPreferences,
      };
    case ACCEPT_ALL_COOKIES_PREFERENCES:
      return {
        ...state,
        facebook_tracking: true,
        twitter_tracking: true,
        facebook_sharing: true,
        twitter_sharing: true,
        linkedin_sharing: true,
      };
    case REJECT_ALL_COOKIES_PREFERENCES:
      return {
        ...state,
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
