import { LocaleType } from '@make.org/types/enums';
import english from '@make.org/assembly-ui/i18n/en.json';
import french from '@make.org/assembly-ui/i18n/fr.json';
import spanish from '@make.org/assembly-ui/i18n/es.json';
import german from '@make.org/assembly-ui/i18n/de.json';
import staticEnglish from '@make.org/assembly-ui/client/pages/Static/i18n/en.json';
import staticFrench from '@make.org/assembly-ui/client/pages/Static/i18n/fr.json';
import staticSpanish from '@make.org/assembly-ui/client/pages/Static/i18n/es.json';
import staticGerman from '@make.org/assembly-ui/client/pages/Static/i18n/de.json';

export const translationRessources = {
  [LocaleType.en]: { common: english, static: staticEnglish },
  [LocaleType.fr]: { common: french, static: staticFrench },
  [LocaleType.es]: { common: spanish, static: staticSpanish },
  [LocaleType.de]: { common: german, static: staticGerman },
};
