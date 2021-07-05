// REST TO DO

import english from 'Server/staticData/i18n/en.json';
import french from 'Server/staticData/i18n/fr.json';
import german from 'Server/staticData/i18n/de.json';

export const translationRessources = {
  en: { translation: english },
  fr: { translation: french },
  de: { translation: german },
};

export const countriesConfiguration = [
  {
    countryCode: 'AT',
    language: 'de',
  },
  {
    countryCode: 'DE',
    language: 'de',
  },
  {
    countryCode: 'FR',
    language: 'fr',
  },
  {
    countryCode: 'LU',
    language: 'fr',
  },
];
