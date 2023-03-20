import { CountryType, LanguageType } from '@make.org/types/CountryLanguage';
import { LocaleType } from '@make.org/types/enums';

export const getCountriesAndLanguages = (
  countriesWithConsultations: string[],
  countriesTransMap: Map<string, string>,
  languagesTransMap: Map<string, string>,
  language: keyof typeof LocaleType,
  availableTranslations?: string[]
): {
  countries: CountryType[];
  languages: LanguageType[];
} => {
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

  countries.sort((a: CountryType, b: CountryType) =>
    new Intl.Collator(language).compare(a.name, b.name)
  );
  languages.sort((a: CountryType, b: CountryType) =>
    new Intl.Collator(language).compare(a.name, b.name)
  );

  return { countries, languages };
};
