import React, { useState, useEffect, useCallback } from 'react';
import i18n from 'i18next';
import { getHomeLink } from '@make.org/utils/helpers/url';
import {
  setCountryCode,
  setLanguageCode,
} from '@make.org/store/actions/appConfig';
import { LocaleType, FORM } from '@make.org/types/enums';
import { useHistory } from 'react-router';
import { useAppContext } from '@make.org/store';
import { closePanel, removePanelContent } from '@make.org/store/actions/panel';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { trackClickConfirmLanguageCountry } from '@make.org/utils/services/Tracking';
import {
  getCountriesTransMap,
  getLanguagesTransMap,
} from '../../helpers/translationsMap';
import {
  SwitchCountryLanguageTitleStyle,
  MultilingualRadioAsTransparentButtonLabelStyle,
  MultilingualRadioListWrapperStyle,
  MultilingualRadioItemWrapperStyle,
  SwitchCountrySubtitleStyle,
  CountryLanguageSwitchRedButtonStyle,
  SwitchCountryLanguageContainerStyle,
} from './style';

type SortType = {
  isoCode: string;
  name: string;
};

export const SwitchCountryLanguage: React.FC = () => {
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

  const selectedRef = useCallback(node => {
    if (node !== null && node.offsetParent !== null) {
      const parent = node.offsetParent;
      const offset = node.offsetTop;
      const height = parent?.clientHeight;
      const countryDivHeight = node.offsetHeight;

      parent.scrollTop = offset - height / 2 + countryDivHeight / 2;
    }
  }, []);

  const countries: {
    isoCode: string;
    name: string;
  }[] = [];
  const languages: {
    isoCode: keyof typeof LocaleType;
    name: string;
  }[] = [];

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

  countries.sort((a: SortType, b: SortType) =>
    new Intl.Collator(language).compare(a.name, b.name)
  );
  languages.sort((a: SortType, b: SortType) =>
    new Intl.Collator(language).compare(a.name, b.name)
  );

  const updateCountryLanguage = () => {
    dispatch(setCountryCode(newCountry));
    dispatch(setLanguageCode(newLanguage));
    trackClickConfirmLanguageCountry(newCountry, newLanguage);
    dispatch(closePanel());
    dispatch(removePanelContent());

    history.push(getHomeLink(newCountry));
  };

  const handleLanguageKeypress = (
    event: React.KeyboardEvent<HTMLLIElement>,
    isoCode: keyof typeof LocaleType
  ): void => {
    if (event.key === 'Enter') {
      setNewLanguage(isoCode);
    }
  };

  const handleCountryKeypress = (
    event: React.KeyboardEvent<HTMLLIElement>,
    isoCode: string
  ): void => {
    if (event.key === 'Enter') {
      setNewCountry(isoCode);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'country') {
      setNewCountry(value);
    }
    if (name === 'language') {
      setNewLanguage(value as keyof typeof LocaleType);
    }
  };

  return (
    <SwitchCountryLanguageContainerStyle
      onSubmit={updateCountryLanguage}
      id={FORM.COUNTRY_LANGUAGE_SWITCH_FORMNAME}
      aria-labelledby="switch_country_title"
      data-cy-container="country_language_switch_nav"
    >
      <div>
        <SwitchCountryLanguageTitleStyle>
          {i18n.t('language_switch.language_title')}
        </SwitchCountryLanguageTitleStyle>
        <MultilingualRadioListWrapperStyle className="languages-switch">
          {languages.map(item => (
            <MultilingualRadioItemWrapperStyle
              tabIndex={0}
              key={item.isoCode}
              className={item.isoCode === newLanguage ? 'selected' : ''}
              onKeyPress={event =>
                handleLanguageKeypress(
                  event as React.KeyboardEvent<HTMLLIElement>,
                  item.isoCode
                )
              }
            >
              <ScreenReaderItemStyle>
                <input
                  tabIndex={-1}
                  id={item.isoCode}
                  type="radio"
                  name="language"
                  value={item.isoCode}
                  onChange={onChange}
                  defaultChecked={item.isoCode === newLanguage}
                  data-cy-radio={`language_switch_${item.isoCode}`}
                />
              </ScreenReaderItemStyle>
              <MultilingualRadioAsTransparentButtonLabelStyle
                className={item.isoCode === newLanguage ? 'selected' : ''}
                htmlFor={item.isoCode}
              >
                {item.name}
              </MultilingualRadioAsTransparentButtonLabelStyle>
            </MultilingualRadioItemWrapperStyle>
          ))}
        </MultilingualRadioListWrapperStyle>
        <SwitchCountryLanguageTitleStyle>
          {i18n.t('language_switch.country_title')}
        </SwitchCountryLanguageTitleStyle>
        <SwitchCountrySubtitleStyle id="switch_country_title">
          {i18n.t('language_switch.country_subtitle')}
        </SwitchCountrySubtitleStyle>
        <MultilingualRadioListWrapperStyle className="countries-switch">
          {countries.map(item => (
            <MultilingualRadioItemWrapperStyle
              ref={item.isoCode === country ? selectedRef : null}
              tabIndex={0}
              key={item.isoCode}
              className={item.isoCode === newCountry ? 'selected' : ''}
              onKeyPress={event =>
                handleCountryKeypress(
                  event as React.KeyboardEvent<HTMLLIElement>,
                  item.isoCode
                )
              }
            >
              <ScreenReaderItemStyle>
                <input
                  id={item.isoCode}
                  tabIndex={-1}
                  type="radio"
                  name="country"
                  value={item.isoCode}
                  onChange={onChange}
                  data-cy-radio={`country_switch_${item.isoCode}`}
                  defaultChecked={item.isoCode === newCountry}
                />
              </ScreenReaderItemStyle>
              <MultilingualRadioAsTransparentButtonLabelStyle
                className={item.isoCode === newCountry ? 'selected' : ''}
                htmlFor={item.isoCode}
              >
                {item.name}
              </MultilingualRadioAsTransparentButtonLabelStyle>
            </MultilingualRadioItemWrapperStyle>
          ))}
        </MultilingualRadioListWrapperStyle>
      </div>
      <CountryLanguageSwitchRedButtonStyle
        type="submit"
        data-cy-button="confirm-country-language-switch"
      >
        {i18n.t('language_switch.confirm')}
      </CountryLanguageSwitchRedButtonStyle>
    </SwitchCountryLanguageContainerStyle>
  );
};
