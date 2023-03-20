import React, { useState, useEffect } from 'react';
import { getHomeLink } from '@make.org/utils/helpers/url';
import {
  setCountryCode,
  setLanguageCode,
} from '@make.org/store/actions/appConfig';
import { LocaleType } from '@make.org/types/enums';
import { useHistory, useLocation } from 'react-router';
import { useAppContext } from '@make.org/store';
import { closePanel, removePanelContent } from '@make.org/store/actions/panel';
import { setLanguageInPreferenceCookie } from '@make.org/utils/helpers/clientCookies';
import { getCountriesAndLanguages } from '@make.org/front/client/helpers/LanguagesAndCountries';
import {
  getCountriesTransMap,
  getLanguagesTransMap,
} from '@make.org/front/client/helpers/translationsMap';
import { SwitchCountryLanguage as SwitchCountryLanguageComponent } from '@make.org/components/SwitchCountryLanguage';

export const SwitchCountryLanguage: React.FC = () => {
  const history = useHistory();
  const { dispatch, state } = useAppContext();
  const {
    country,
    countriesWithConsultations,
    language,
    availableTranslations,
  } = state.appConfig;

  const [countriesTransMap, setCountriesTransMap] = useState(
    getCountriesTransMap()
  );
  const [languagesTransMap, setLanguagesTransMap] = useState(
    getLanguagesTransMap()
  );

  useEffect(() => {
    setCountriesTransMap(getCountriesTransMap());
  }, [country]);

  useEffect(() => {
    setLanguagesTransMap(getLanguagesTransMap());
  }, [language]);

  const { countries, languages } = getCountriesAndLanguages(
    countriesWithConsultations,
    countriesTransMap,
    languagesTransMap,
    language,
    availableTranslations
  );

  const { search } = useLocation();

  const updateCountryLanguage = (newLanguage: string, newCountry: string) => {
    dispatch(closePanel());
    dispatch(removePanelContent());

    setLanguageInPreferenceCookie(newLanguage as keyof typeof LocaleType);

    dispatch(setCountryCode(newCountry));
    dispatch(setLanguageCode(newLanguage));

    if (newCountry !== country) {
      history.push(getHomeLink(newCountry));
      return;
    }
    if (newLanguage !== language) {
      const queryParams = new URLSearchParams(search);
      if (queryParams.has('lang')) {
        queryParams.delete('lang');
        history.replace({
          search: queryParams.toString(),
        });
      }
    }
  };

  return (
    <SwitchCountryLanguageComponent
      countries={countries}
      languages={languages}
      currentCountry={country}
      currentLanguage={language}
      updateCountryLanguage={updateCountryLanguage}
    />
  );
};
