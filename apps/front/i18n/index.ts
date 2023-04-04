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

import staticGerman from '@make.org/front/client/pages/Static/i18n/de.json';
import staticEnglish from '@make.org/front/client/pages/Static/i18n/en.json';
import staticFrench from '@make.org/front/client/pages/Static/i18n/fr.json';
import staticUkrainian from '@make.org/front/client/pages/Static/i18n/uk.json';
import staticCzech from '@make.org/front/client/pages/Static/i18n/cs.json';
import staticSpanish from '@make.org/front/client/pages/Static/i18n/es.json';
import staticPolish from '@make.org/front/client/pages/Static/i18n/pl.json';
import staticItalian from '@make.org/front/client/pages/Static/i18n/it.json';
import staticDutch from '@make.org/front/client/pages/Static/i18n/nl.json';
import staticFinnish from '@make.org/front/client/pages/Static/i18n/fi.json';
import staticRomanian from '@make.org/front/client/pages/Static/i18n/ro.json';
import staticBulgarian from '@make.org/front/client/pages/Static/i18n/bg.json';

export const translationRessources = {
  [LocaleType.en]: { common: english, static: staticEnglish },
  [LocaleType.fr]: { common: french, static: staticFrench },
  [LocaleType.de]: { common: german, static: staticGerman },
  [LocaleType.uk]: { common: ukrainian, static: staticUkrainian },
  [LocaleType.cs]: { common: czech, static: staticCzech },
  [LocaleType.es]: { common: spanish, static: staticSpanish },
  [LocaleType.pl]: { common: polish, static: staticPolish },
  [LocaleType.it]: { common: italian, static: staticItalian },
  [LocaleType.nl]: { common: dutch, static: staticDutch },
  [LocaleType.fi]: { common: finnish, static: staticFinnish },
  [LocaleType.ro]: { common: romanian, static: staticRomanian },
  [LocaleType.bg]: { common: bulgarian, static: staticBulgarian },
};

export const translationRessoucesLanguages: string[] = Object.keys(
  translationRessources
);
