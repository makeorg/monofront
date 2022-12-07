import { LocaleType } from '@make.org/types/enums';
import german from '@make.org/front/i18n/de.json';
import english from '@make.org/front/i18n/en.json';
import french from '@make.org/front/i18n/fr.json';
import ukrainian from '@make.org/front/i18n/uk.json';
import czech from '@make.org/front/i18n/cs.json';

export const translationRessources = {
  [LocaleType.en]: { translation: english },
  [LocaleType.fr]: { translation: french },
  [LocaleType.de]: { translation: german },
  [LocaleType.uk]: { translation: ukrainian },
  [LocaleType.cs]: { translation: czech },
};

export const translationRessoucesLanguages: string[] = Object.keys(
  translationRessources
);
