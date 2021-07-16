import {
  acceptAllCookiesPreferences,
  rejectAllCookiesPreferences,
  setCookiesPreferencesInApp,
} from '../../../actions/user/cookiesPreferences';
import { cookiesPreferences } from './index';

describe('Cookies preferences reducer', () => {
  it('Return the initial state', () => {
    const expectedState = {
      facebook_tracking: false,
      twitter_tracking: false,
      facebook_sharing: false,
      twitter_sharing: false,
      linkedin_sharing: false,
    };

    expect(cookiesPreferences(undefined, {})).toEqual(expectedState);
  });

  it('Set Cookie preferences', () => {
    const previousState = {
      facebook_tracking: false,
      twitter_tracking: false,
      facebook_sharing: false,
      twitter_sharing: false,
      linkedin_sharing: false,
    };

    const expectedState = {
      facebook_tracking: true,
      twitter_tracking: false,
      facebook_sharing: true,
      twitter_sharing: false,
      linkedin_sharing: true,
    };

    expect(
      cookiesPreferences(
        previousState,
        setCookiesPreferencesInApp(expectedState)
      )
    ).toEqual(expectedState);
  });

  it('Accept All Cookie preferences', () => {
    const previousState = {
      facebook_tracking: false,
      twitter_tracking: false,
      facebook_sharing: false,
      twitter_sharing: false,
      linkedin_sharing: false,
    };

    const expectedState = {
      facebook_tracking: true,
      twitter_tracking: true,
      facebook_sharing: true,
      twitter_sharing: true,
      linkedin_sharing: true,
    };

    expect(
      cookiesPreferences(previousState, acceptAllCookiesPreferences())
    ).toEqual(expectedState);
  });

  it('Reject All Cookie preferences', () => {
    const previousState = {
      facebook_tracking: true,
      twitter_tracking: false,
      facebook_sharing: true,
      twitter_sharing: false,
      linkedin_sharing: true,
    };

    const expectedState = {
      facebook_tracking: false,
      twitter_tracking: false,
      facebook_sharing: false,
      twitter_sharing: false,
      linkedin_sharing: false,
    };

    expect(
      cookiesPreferences(previousState, rejectAllCookiesPreferences())
    ).toEqual(expectedState);
  });
});
