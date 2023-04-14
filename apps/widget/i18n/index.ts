import { LocaleType } from '@make.org/types/enums';
import german from '@make.org/widget/i18n/de.json';
import english from '@make.org/widget/i18n/en.json';
import french from '@make.org/widget/i18n/fr.json';

export const translationRessources = {
  [LocaleType.en]: { common: english },
  [LocaleType.fr]: { common: french },
  [LocaleType.de]: { common: german },
};
