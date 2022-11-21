import { ReducerAction, StateUserCookiesPreferences } from '@make.org/types';
import {
  ACCEPT_ALL_COOKIES_PREFERENCES,
  REJECT_ALL_COOKIES_PREFERENCES,
  SET_COOKIES_PREFERENCES,
} from '../../../actionTypes';

export const setCookiesPreferencesInApp = (
  cookiesPreferences: StateUserCookiesPreferences
): ReducerAction => ({
  type: SET_COOKIES_PREFERENCES,
  payload: { cookiesPreferences },
});

export const acceptAllCookiesPreferences = (): ReducerAction => ({
  type: ACCEPT_ALL_COOKIES_PREFERENCES,
});

export const rejectAllCookiesPreferences = (): ReducerAction => ({
  type: REJECT_ALL_COOKIES_PREFERENCES,
});
