import { LocaleType } from '@make.org/types/enums';
import english from '@make.org/assembly-ui/i18n/en.json';
import french from '@make.org/assembly-ui/i18n/fr.json';

export const translationRessources = {
  [LocaleType.en]: { common: english },
  [LocaleType.fr]: { common: french },
};
