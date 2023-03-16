import { LocaleType } from '@make.org/types/enums';
import german from '@make.org/front/i18n/de.json';
import english from '@make.org/front/i18n/en.json';
import french from '@make.org/front/i18n/fr.json';
import ukrainian from '@make.org/front/i18n/uk.json';
import czech from '@make.org/front/i18n/cs.json';
import spanish from '@make.org/front/i18n/es.json';
import polish from '@make.org/front/i18n/pl.json';
import italian from '@make.org/front/i18n/it.json';
import dutch from '@make.org/front/i18n/nl.json';
import finnish from '@make.org/front/i18n/fi.json';
import romanian from '@make.org/front/i18n/ro.json';
import bulgarian from '@make.org/front/i18n/bg.json';

export const translationRessources = {
  [LocaleType.en]: { translation: english },
  [LocaleType.fr]: { translation: french },
  [LocaleType.de]: { translation: german },
  [LocaleType.uk]: { translation: ukrainian },
  [LocaleType.cs]: { translation: czech },
  [LocaleType.es]: { translation: spanish },
  [LocaleType.pl]: { translation: polish },
  [LocaleType.it]: { translation: italian },
  [LocaleType.nl]: { translation: dutch },
  [LocaleType.fi]: { translation: finnish },
  [LocaleType.ro]: { translation: romanian },
  [LocaleType.bg]: { translation: bulgarian },
};

export const translationRessoucesLanguages: string[] = Object.keys(
  translationRessources
);
