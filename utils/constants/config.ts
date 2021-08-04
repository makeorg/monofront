import format from 'date-fns/format';

// for tests : see constants/__mocks__/config.js
export const SESSION_ID_COOKIE_KEY = 'x-session-id';
export const APP_NAME = 'main-front';
export const GOOGLE_LOGIN_ID =
  '810331964280-qtdupbrjusihad3b5da51i5p66qpmhmr.apps.googleusercontent.com';

export const DEFAULT_LANGUAGE = 'en';
export const DEFAULT_COUNTRY = 'FR';
export const NONE_COUNTRY = 'OO';

export const DESKTOP_DEVICE = 'DESKTOP';
export const MOBILE_DEVICE = 'MOBILE';

export const DEBOUNCE_TIMER = 250;
export const CONTACT_EMAIL = 'contact@make.org';
export const CONTACT_EMAIL_DE = 'contact-de@make.org';

export const PRIVACY_POLICY_DATE = format(new Date('05/19/2021'), 'P');
export const GTU_DATE = new Date(2017, 9, 30);
export const A11Y_DATE = new Date(2020, 10, 4);
