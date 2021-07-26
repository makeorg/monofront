// @flow
import React from 'react';
import { Link } from 'react-head';
import { getLanguageFromCountryCode } from '@make.org/utils/helpers/countries';
import { env } from '@make.org/assets/env';
import { isHomepageWithLocale } from '@make.org/utils/routes';
import { useLocation } from 'react-router';
import { useAppContext } from '@make.org/store';

export const X_DEFAULT_LANG_COUNTRIES = [
  { language: 'fr', country: 'FR' },
  { language: 'en', country: 'GB' },
  { language: 'x-default', country: 'FR' },
];

export const Hreflang = () => {
  const { pathname } = useLocation();
  const { state } = useAppContext();
  const { countriesWithConsultations } = state.appConfig;

  if (!isHomepageWithLocale(pathname)) {
    return null;
  }

  const countries: string[] = countriesWithConsultations || [];

  const countryLanguageList = countries.map(countryWhitConsultations => ({
    language: getLanguageFromCountryCode(countryWhitConsultations),
    country: countryWhitConsultations,
  }));

  return (
    <>
      {countryLanguageList.map(countryLanguage => (
        <Link
          key={`${
            countryLanguage.language
          }-${countryLanguage.country.toLowerCase()}`}
          rel="alternate"
          hrefLang={`${
            countryLanguage.language
          }-${countryLanguage.country.toLowerCase()}`}
          href={`${env.frontUrl()}/${countryLanguage.country}`}
        />
      ))}
      {X_DEFAULT_LANG_COUNTRIES.map(countryLanguage => (
        <Link
          key={countryLanguage.language}
          rel="alternate"
          hrefLang={`${countryLanguage.language}`}
          href={`${env.frontUrl()}/${countryLanguage.country}`}
        />
      ))}
    </>
  );
};
