import { Request, Response, NextFunction } from 'express';
import { setLanguage } from '@make.org/utils/helpers/countries';
import { LocaleType } from '@make.org/types/enums';
import { translationRessoucesLanguages } from '../../apps/front/i18n/index';
import { DEFAULT_LANGUAGE } from '../constants/config';

export const getCountryFromRequest = (req: Request): string => {
  const { country } = req.params;

  if (country) {
    return country;
  }

  return '';
};

export const countryLanguageMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Get country from parmas || headers detection values
  const country = getCountryFromRequest(req);
  const formattedCountry = country?.toUpperCase();

  // Check browser for listed languages and returns the first hit. If nothing corresponds, returns false

  const browserLanguage = (): LocaleType => {
    const language = (req.acceptsLanguages(translationRessoucesLanguages) ||
      DEFAULT_LANGUAGE) as keyof typeof LocaleType;

    return LocaleType[language];
  };

  req.params.country = formattedCountry;
  req.params.language = browserLanguage();
  setLanguage(browserLanguage(), true);

  return next();
};
