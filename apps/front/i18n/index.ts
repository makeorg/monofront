import { LocaleType } from '@make.org/types/enums';
import german from './de.json';
import english from './en.json';
import french from './fr.json';

export const translationRessources = {
  [LocaleType.en]: { translation: english },
  [LocaleType.fr]: { translation: french },
  [LocaleType.de]: { translation: german },
};

export const translationRessoucesLanguages: string[] = Object.keys(
  translationRessources
);
