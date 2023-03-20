import { LocaleType } from '@make.org/types/enums';

export type CountryType = {
  isoCode: string;
  name: string;
};

export type LanguageType = {
  isoCode: keyof typeof LocaleType;
  name: string;
};
