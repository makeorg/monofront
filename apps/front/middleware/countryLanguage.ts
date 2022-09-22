import { Request, Response, NextFunction } from 'express';
import { setLanguage } from '@make.org/utils/helpers/countries';
import { LocaleType, COOKIE } from '@make.org/types/enums';
import { Cookie } from 'universal-cookie';
import { translationRessoucesLanguages } from '@make.org/front/i18n/index';
import { DEFAULT_LANGUAGE } from '@make.org/utils/constants/config';

export const getCountryFromRequest = (req: Request): string => {
  const { country } = req.params;

  if (country) {
    return country;
  }

  return '';
};

const setCookieLanguage = (req: Request & Cookie, language: string): void => {
  const preferences = req.universalCookies.get(COOKIE.USER_PREFERENCES) || {};

  req.universalCookies.set(COOKIE.USER_PREFERENCES, {
    ...preferences,
    language,
  });
};

export const getUserLanguage = (
  req: Request & Cookie
): keyof typeof LocaleType => {
  if (translationRessoucesLanguages.includes(req.query?.lang)) {
    setCookieLanguage(req, req.query.lang);

    return LocaleType[req.query.lang as keyof typeof LocaleType];
  }

  const cookieLanguage = req.universalCookies.get(COOKIE.USER_PREFERENCES)
    ?.language as keyof typeof LocaleType;

  if (translationRessoucesLanguages.includes(cookieLanguage)) {
    return cookieLanguage;
  }

  const language = (req.acceptsLanguages(translationRessoucesLanguages) ||
    DEFAULT_LANGUAGE) as keyof typeof LocaleType;
  setCookieLanguage(req, language);

  return LocaleType[language];
};

export const countryLanguageMiddleware = (
  req: Request & Cookie,
  res: Response,
  next: NextFunction
): void => {
  // Get country from parmas || headers detection values
  const country = getCountryFromRequest(req);
  const formattedCountry = country?.toUpperCase();

  // Check browser for listed languages and returns the first hit. If nothing corresponds, returns false
  const userLanguage = getUserLanguage(req);

  req.params.country = formattedCountry;
  req.params.language = userLanguage;
  setLanguage(userLanguage, true);

  return next();
};
