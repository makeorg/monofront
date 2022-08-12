import React, { useState } from 'react';
import i18n from 'i18next';
import { getHomeLink } from '@make.org/utils/helpers/url';
import {
  setCountryCode,
  setLanguageCode,
} from '@make.org/store/actions/appConfig';
import { LocaleType } from '@make.org/types/enums';
import { compareCountriesByName } from '@make.org/utils/helpers/countries';
import { useHistory } from 'react-router';
import { modalClose } from '@make.org/store/actions/modal';
import { useAppContext } from '@make.org/store';
import { trackClickConfirmLanguageCountry } from '@make.org/utils/services/Tracking';
import {
  CountryListStyle,
  SelectedCountryIconStyle,
  SwitchCountryTitleStyle,
} from './style';

// @todo the file name and components name will need to be changed/updated in the ticket with styles.

export const SwitchCountry: React.FC = () => {
  const history = useHistory();
  const { dispatch, state } = useAppContext();
  const {
    country,
    countriesWithConsultations,
    language,
    availableTranslations,
  } = state.appConfig;
  const [newLanguage, setNewLanguage] = useState(language);
  const [newCountry, setNewCountry] = useState(country);
  const countries: {
    isoCode: string;
    name: string;
  }[] = [];
  const languages: {
    isoCode: keyof typeof LocaleType;
    name: string;
  }[] = [];

  const countriesTransMap = new Map([
    ['AT', i18n.t('countries.AT')],
    ['BE', i18n.t('countries.BE')],
    ['BG', i18n.t('countries.BG')],
    ['BR', i18n.t('countries.BR')],
    ['CA', i18n.t('countries.CA')],
    ['CH', i18n.t('countries.CH')],
    ['CN', i18n.t('countries.CN')],
    ['CY', i18n.t('countries.CY')],
    ['CZ', i18n.t('countries.CZ')],
    ['DE', i18n.t('countries.DE')],
    ['DK', i18n.t('countries.DK')],
    ['EE', i18n.t('countries.EE')],
    ['ES', i18n.t('countries.ES')],
    ['FI', i18n.t('countries.FI')],
    ['FR', i18n.t('countries.FR')],
    ['GB', i18n.t('countries.GB')],
    ['GR', i18n.t('countries.GR')],
    ['HR', i18n.t('countries.HR')],
    ['HU', i18n.t('countries.HU')],
    ['IE', i18n.t('countries.IE')],
    ['IN', i18n.t('countries.IN')],
    ['IS', i18n.t('countries.IS')],
    ['IT', i18n.t('countries.IT')],
    ['JP', i18n.t('countries.JP')],
    ['LI', i18n.t('countries.LI')],
    ['LT', i18n.t('countries.LT')],
    ['LU', i18n.t('countries.LU')],
    ['LV', i18n.t('countries.LV')],
    ['MT', i18n.t('countries.MT')],
    ['NL', i18n.t('countries.NL')],
    ['NO', i18n.t('countries.NO')],
    ['PL', i18n.t('countries.PL')],
    ['PT', i18n.t('countries.PT')],
    ['RO', i18n.t('countries.RO')],
    ['RU', i18n.t('countries.RU')],
    ['SE', i18n.t('countries.SE')],
    ['SI', i18n.t('countries.SI')],
    ['SK', i18n.t('countries.SK')],
    ['US', i18n.t('countries.US')],
  ]);

  const languagesTransMap = new Map([
    ['fr', i18n.t('languages.fr')],
    ['en', i18n.t('languages.en')],
    ['de', i18n.t('languages.de')],
  ]);
  countriesWithConsultations.map(countryCode =>
    countries.push({
      isoCode: countryCode,
      name: countriesTransMap.get(countryCode) || countryCode,
    })
  );

  availableTranslations?.map(langue =>
    languages.push({
      isoCode: langue as keyof typeof LocaleType,
      name: languagesTransMap.get(langue) || langue,
    })
  );

  countries.sort(compareCountriesByName);
  languages.sort(compareCountriesByName);

  const updateCountryLanguage = () => {
    dispatch(setCountryCode(newCountry));
    dispatch(setLanguageCode(newLanguage));
    trackClickConfirmLanguageCountry(newCountry, newLanguage);
    dispatch(modalClose());
    return history.replace(getHomeLink(newCountry));
  };

  return (
    <nav
      aria-labelledby="switch_country_title"
      data-cy-container="country_switch_nav"
    >
      <SwitchCountryTitleStyle id="switch_country_title">
        {i18n.t('main_footer.country')}
      </SwitchCountryTitleStyle>
      <CountryListStyle>
        {countries.map(item => (
          <li key={item.isoCode}>
            <button
              type="button"
              onClick={() => setNewCountry(item.isoCode)}
              className={item.isoCode === country ? 'selected' : ''}
              aria-current={item.isoCode === country}
              data-cy-button={`country_switch_${item.isoCode}`}
            >
              {item.name}
              {item.isoCode === newCountry && (
                <SelectedCountryIconStyle aria-hidden focusable="false" />
              )}
            </button>
          </li>
        ))}
      </CountryListStyle>
      <SwitchCountryTitleStyle id="switch_language_title">
        Change langue
      </SwitchCountryTitleStyle>
      <CountryListStyle>
        {languages.map(item => (
          <li key={item.isoCode}>
            <button
              type="button"
              onClick={() => setNewLanguage(item.isoCode)}
              className={item.isoCode === language ? 'selected' : ''}
              aria-current={item.isoCode === language}
              data-cy-button={`language_switch_${item.isoCode}`}
            >
              {item.name}
              {item.isoCode === newLanguage && (
                <SelectedCountryIconStyle aria-hidden focusable="false" />
              )}
            </button>
          </li>
        ))}
      </CountryListStyle>
      <button
        type="button"
        onClick={() => {
          updateCountryLanguage();
        }}
        data-cy-button="confirm-country-language-switch"
      >
        valider
      </button>
    </nav>
  );
};
