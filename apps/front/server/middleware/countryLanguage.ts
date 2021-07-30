import { Request, Response, NextFunction } from 'express';
import {
  getLanguageFromCountryCode,
  setLanguage,
} from '@make.org/utils/helpers/countries';
import { LocaleType } from '@make.org/types/enums';

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

  // Get language associated to the country
  const language = getLanguageFromCountryCode(country);

  req.params.country = formattedCountry;
  req.params.language = language;
  setLanguage(language, country, true);

  return next();
};
