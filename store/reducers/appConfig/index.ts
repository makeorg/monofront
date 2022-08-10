import {
  DEFAULT_COUNTRY,
  DEFAULT_LANGUAGE,
  DESKTOP_DEVICE,
  MOBILE_DEVICE,
} from '@make.org/utils/constants/config';
import i18n from 'i18next';
import { TRANSLATION_NAMESPACE } from '@make.org/utils/i18n/constants';
import { Reducer, ReducerAction, StateConfig } from '@make.org/types';
import { setCountry, setLanguage } from '@make.org/utils/helpers/countries';
import {
  SET_COUNTRY_CONFIGURATION,
  SET_LANGUAGE_CONFIGURATION,
  SET_DESKTOP_DEVICE,
  SET_MOBILE_DEVICE,
} from '../../actionTypes';

// TO DO
export const appConfig_state: StateConfig = {
  source: '',
  language: DEFAULT_LANGUAGE,
  country: DEFAULT_COUNTRY,
  translations: {},
  queryParams: {},
  countriesWithConsultations: [],
  device: '',
  privacyPolicy: '',
  customData: {},
};

export const appConfig_reducer: Reducer = (
  // eslint-disable-next-line default-param-last
  state = appConfig_state,
  action: ReducerAction
) => {
  switch (action.type) {
    case SET_LANGUAGE_CONFIGURATION:
      setLanguage(action.payload.language);
      return {
        ...state,
        language: action.payload.language,
        translations: i18n.getResourceBundle(
          action.payload.language,
          TRANSLATION_NAMESPACE
        ),
      };
    case SET_COUNTRY_CONFIGURATION:
      setCountry(action.payload.country);
      return {
        ...state,
        country: action.payload.country,
      };
    case SET_DESKTOP_DEVICE:
      return {
        ...state,
        device: DESKTOP_DEVICE,
      };
    case SET_MOBILE_DEVICE:
      return {
        ...state,
        device: MOBILE_DEVICE,
      };
    default:
      return state;
  }
};
