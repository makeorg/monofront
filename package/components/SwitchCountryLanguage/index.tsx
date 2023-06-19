import React, { useState, useCallback } from 'react';
import i18n from 'i18next';
import { LocaleType, FORM } from '@make.org/types/enums';
import { trackClickConfirmLanguageCountry } from '@make.org/utils/services/Tracking';
import { CountryType, LanguageType } from '@make.org/types/CountryLanguage';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  SwitchCountryLanguageTitleStyle,
  MultilingualRadioAsTransparentButtonLabelStyle,
  MultilingualRadioListWrapperStyle,
  MultilingualRadioItemWrapperStyle,
  SwitchCountrySubtitleStyle,
  CountryLanguageSwitchRedButtonStyle,
  SwitchCountryLanguageContainerStyle,
} from './style';

type Props = {
  countries: CountryType[];
  languages: LanguageType[];
  currentCountry: string;
  currentLanguage: keyof typeof LocaleType;
  updateCountryLanguage: (language: string, country: string) => void;
};

export const SwitchCountryLanguage: React.FC<Props> = ({
  countries,
  languages,
  currentCountry,
  currentLanguage,
  updateCountryLanguage,
}) => {
  const [country, setNewCountry] = useState(currentCountry);
  const [language, setNewLanguage] = useState(currentLanguage);

  const selectedRef = useCallback(node => {
    if (node !== null && node.offsetParent !== null) {
      const parent = node.offsetParent;
      const offset = node.offsetTop;
      const height = parent?.clientHeight;
      const countryDivHeight = node.offsetHeight;

      parent.scrollTop = offset - height / 2 + countryDivHeight / 2;
    }
  }, []);

  const onSubmit = () => {
    trackClickConfirmLanguageCountry(country, language);
    updateCountryLanguage(language, country);
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
      onSubmit={onSubmit}
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
              ref={item.isoCode === language ? selectedRef : null}
              tabIndex={0}
              key={item.isoCode}
              lang={item.isoCode}
              className={item.isoCode === language ? 'selected' : ''}
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
                  defaultChecked={item.isoCode === language}
                  data-cy-radio={`language_switch_${item.isoCode}`}
                />
              </ScreenReaderItemStyle>
              <MultilingualRadioAsTransparentButtonLabelStyle
                className={item.isoCode === language ? 'selected' : ''}
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
              className={item.isoCode === country ? 'selected' : ''}
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
                  defaultChecked={item.isoCode === country}
                  data-cy-radio={`country_switch_${item.isoCode}`}
                />
              </ScreenReaderItemStyle>
              <MultilingualRadioAsTransparentButtonLabelStyle
                className={item.isoCode === country ? 'selected' : ''}
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
