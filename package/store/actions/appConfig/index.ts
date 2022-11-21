import { ReducerAction } from '@make.org/types';
import {
  SET_COUNTRY_CONFIGURATION,
  SET_DESKTOP_DEVICE,
  SET_LANGUAGE_CONFIGURATION,
  SET_MOBILE_DEVICE,
} from '../../actionTypes';

export const setCountryCode = (country: string): ReducerAction => ({
  type: SET_COUNTRY_CONFIGURATION,
  payload: { country },
});

export const setLanguageCode = (language: string): ReducerAction => ({
  type: SET_LANGUAGE_CONFIGURATION,
  payload: { language },
});

export const setDesktopDevice = (): ReducerAction => ({
  type: SET_DESKTOP_DEVICE,
});

export const setMobileDevice = (): ReducerAction => ({
  type: SET_MOBILE_DEVICE,
});
