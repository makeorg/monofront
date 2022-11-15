import format from 'date-fns/format';
import { LocaleType } from '@make.org/types/enums';

// for tests : see constants/__mocks__/config.js
export const SESSION_ID_COOKIE_KEY = 'x-session-id';
export const GOOGLE_LOGIN_ID =
  '810331964280-qtdupbrjusihad3b5da51i5p66qpmhmr.apps.googleusercontent.com';

export const DEFAULT_LANGUAGE: LocaleType = LocaleType.en;
export const DEFAULT_COUNTRY = 'FR';
export const NONE_COUNTRY = 'OO';

export const DESKTOP_DEVICE = 'DESKTOP';
export const MOBILE_DEVICE = 'MOBILE';

export const DEBOUNCE_TIMER = 250;

export const PRIVACY_POLICY_DATE = format(new Date('05/19/2021'), 'P');
export const GTU_DATE = '2021/10/18';
export const A11Y_DATE = '2020/10/4';

/** MAKE Informations */
export const CONTACT_EMAIL = 'contact@make.org';
export const CONTACT_EMAIL_DE = 'contact-de@make.org';
export const MAKE_PHONE_NUMBER = '(+33)1 84 25 15 74';
export const MAKE_ADDRESS = '13-15 Rue de la Bûcherie 75005 Paris';
export const MAKE_CAPITAL = '1.056.017,00 €';
export const MAKE_RCS = '820 016 095';
export const HOST_ADDRESS = 'OVH, 2 rue Kellermann, 59100 Roubaix';
export const HOST_PHONE_NUMBER = '(+33)8 99 70 17 61';
export const CNIL_NUMBER = '2005312';
export const ACCESSIBILITY_EMAIL = 'accessibility@make.org';

/** Social medias */
export const GOOGLE_LINK_FR = 'https://policies.google.com/privacy?hl=fr&gl=fr';
export const GOOGLE_LINK_DE = 'https://policies.google.com/privacy?hl=de&gl=de';
export const GOOGLE_LINK_EN = 'https://policies.google.com/privacy?hl=en&gl=en';
export const FACEBOOK_LINK_FR = 'https://fr-fr.facebook.com/policy.php';
export const FACEBOOK_LINK_EN = 'https://en-gb.facebook.com/policy.php';
export const TWITTER_LINK_FR = 'https://twitter.com/fr/privacy';
export const TWITTER_LINK_DE = 'https://twitter.com/de/privacy';
export const TWITTER_LINK_EN = 'https://twitter.com/en/privacy';
export const LINKEDIN_LINK_FR = 'https://fr.linkedin.com/legal/privacy-policy';
export const LINKEDIN_LINK_DE = 'https://de.linkedin.com/legal/privacy-policy';
export const LINKEDIN_LINK_EN = 'https://linkedin.com/legal/privacy-policy';
export const HOTJAR_LINK = 'https://www.hotjar.com/legal/policies/privacy/';

/** consultation page */
export const KEYWORD_THRESHOLD = 5;
