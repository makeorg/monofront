import { LocaleType } from '@make.org/types/enums';
import english from '@make.org/assembly-ui/i18n/en.json';
import french from '@make.org/assembly-ui/i18n/fr.json';
import spanish from '@make.org/assembly-ui/i18n/es.json';
import german from '@make.org/assembly-ui/i18n/de.json';

export const translationRessources = {
  [LocaleType.en]: { common: english },
  [LocaleType.fr]: { common: french },
  [LocaleType.es]: { common: spanish },
  [LocaleType.de]: { common: german },
};
