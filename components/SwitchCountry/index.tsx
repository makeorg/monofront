import React from 'react';
import i18n from 'i18next';
import { getHomeLink } from '@make.org/utils/helpers/url';
import { setCountryCode } from '@make.org/store/actions/appConfig';
import {
  compareCountriesByName,
  getLanguageFromParams,
} from '@make.org/utils/helpers/countries';
import { modalClose } from '@make.org/store/actions/modal';
import { useAppContext } from '@make.org/store';
import {
  CountryLinkStyle,
  CountryListStyle,
  SelectedCountryIconStyle,
  SwitchCountryTitleStyle,
} from './style';

export const SwitchCountry: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { country, countriesWithConsultations } = state.appConfig;
  const countries: {
    isoCode: string;
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

  countriesWithConsultations.map(countryCode =>
    countries.push({
      isoCode: countryCode,
      name: countriesTransMap.get(countryCode) || countryCode,
    })
  );

  countries.sort(compareCountriesByName);

  const switchCountry = (countryCode: string) => {
    if (country === countryCode) {
      return () => null;
    }

    dispatch(setCountryCode(countryCode, getLanguageFromParams(countryCode)));

    return dispatch(modalClose());
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
            <CountryLinkStyle
              to={getHomeLink(item.isoCode)}
              onClick={() => switchCountry(item.isoCode)}
              className={item.isoCode === country ? 'selected' : ''}
              aria-current={item.isoCode === country}
              data-cy-link={`country_switch_${item.isoCode}`}
            >
              {item.name}
              {item.isoCode === country && (
                <SelectedCountryIconStyle aria-hidden focusable="false" />
              )}
            </CountryLinkStyle>
          </li>
        ))}
      </CountryListStyle>
    </nav>
  );
};
