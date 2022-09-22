import { LocaleType } from '@make.org/types/enums';

type SortType = {
  isoCode: string;
  name: string;
};

type LanguagesType = {
  isoCode: keyof typeof LocaleType;
  name: string;
};

export const getCountriesAndLanguages = (
  countriesWithConsultations: string[],
  countriesTransMap: Map<string, string>,
  languagesTransMap: Map<string, string>,
  language: keyof typeof LocaleType,
  availableTranslations?: string[]
): {
  countries: SortType[];
  languages: LanguagesType[];
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

  countries.sort((a: SortType, b: SortType) =>
    new Intl.Collator(language).compare(a.name, b.name)
  );
  languages.sort((a: SortType, b: SortType) =>
    new Intl.Collator(language).compare(a.name, b.name)
  );

  return { countries, languages };
};
