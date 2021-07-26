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

  countriesWithConsultations.map(countryCode =>
    countries.push({
      isoCode: countryCode,
      name: i18n.t(`countries.${countryCode}`),
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
              className={item.isoCode === country && 'selected'}
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
