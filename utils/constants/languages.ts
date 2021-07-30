// REST TO DO
// import english from 'Server/staticData/i18n/en.json';
// import french from 'Server/staticData/i18n/fr.json';

import { LocaleType } from '../../types/enums';

// import german from 'Server/staticData/i18n/de.json';
const english = {};
const french = {};
const german = {};

export const translationRessources = {
  en: { translation: english },
  fr: { translation: french },
  de: { translation: german },
};

export const countriesConfiguration = [
  {
    countryCode: 'AT',
    language: LocaleType.de,
  },
  {
    countryCode: 'DE',
    language: LocaleType.de,
  },
  {
    countryCode: 'FR',
    language: LocaleType.fr,
  },
  {
    countryCode: 'LU',
    language: LocaleType.fr,
  },
];
