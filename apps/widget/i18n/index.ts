import { LocaleType } from '@make.org/types/enums';
import german from '@make.org/widget/i18n/de.json';
import english from '@make.org/widget/i18n/en.json';
import french from '@make.org/widget/i18n/fr.json';
import ukrainian from '@make.org/widget/i18n/uk.json';
import czech from '@make.org/widget/i18n/cs.json';
import spanish from '@make.org/widget/i18n/es.json';
import polish from '@make.org/widget/i18n/pl.json';
import italian from '@make.org/widget/i18n/it.json';
import dutch from '@make.org/widget/i18n/nl.json';
import finnish from '@make.org/widget/i18n/fi.json';
import romanian from '@make.org/widget/i18n/ro.json';
import bulgarian from '@make.org/widget/i18n/bg.json';

export const translationRessources = {
  [LocaleType.en]: { common: english },
  [LocaleType.fr]: { common: french },
  [LocaleType.de]: { common: german },
  [LocaleType.uk]: { common: ukrainian },
  [LocaleType.cs]: { common: czech },
  [LocaleType.es]: { common: spanish },
  [LocaleType.pl]: { common: polish },
  [LocaleType.it]: { common: italian },
  [LocaleType.nl]: { common: dutch },
  [LocaleType.fi]: { common: finnish },
  [LocaleType.ro]: { common: romanian },
  [LocaleType.bg]: { common: bulgarian },
};
