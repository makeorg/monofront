import {
  DESKTOP_DEVICE,
  MOBILE_DEVICE,
} from '@make.org/utils/constants/config';
import i18n from 'i18next';
import { TRANSLATION_NAMESPACE } from '@make.org/utils/i18n/constants';
import { Reducer, ReducerAction, StateConfig } from '@make.org/types';
import {
  SET_COUNTRY_CONFIGURATION,
  SET_LANGUAGE_CONFIGURATION,
  SET_DESKTOP_DEVICE,
  SET_MOBILE_DEVICE,
} from '../../actionTypes';

// TO DO
export const appConfig_state: StateConfig = {
  source: 'widget',
  language: 'fr',
  country: 'FR',
  translations: {},
  queryParams: {},
  countriesWithConsultations: [],
  device: '',
  privacyPolicy: '',
  customData: {},
};

export const appConfig_reducer: Reducer = (
  state = appConfig_state,
  action: ReducerAction
) => {
  switch (action.type) {
    case SET_LANGUAGE_CONFIGURATION:
      return {
        ...state,
        language: action.payload.language,
        translations: i18n.getResourceBundle(
          action.payload.language,
          TRANSLATION_NAMESPACE
        ),
      };
    case SET_COUNTRY_CONFIGURATION:
      return {
        ...state,
        country: action.payload.country,
        language: action.payload.language,
        translations: i18n.getResourceBundle(
          action.payload.language,
          TRANSLATION_NAMESPACE
        ),
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
