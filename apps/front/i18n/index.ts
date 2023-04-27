import { LocaleType } from '@make.org/types/enums';

import bulgarian from '@make.org/front/i18n/bg.json';
import croatian from '@make.org/front/i18n/hr.json';
import czech from '@make.org/front/i18n/cs.json';
import danish from '@make.org/front/i18n/da.json';
import dutch from '@make.org/front/i18n/nl.json';
import english from '@make.org/front/i18n/en.json';
import estonian from '@make.org/front/i18n/et.json';
import finnish from '@make.org/front/i18n/fi.json';
import french from '@make.org/front/i18n/fr.json';
import german from '@make.org/front/i18n/de.json';
import greek from '@make.org/front/i18n/el.json';
import hungarian from '@make.org/front/i18n/hu.json';
import italian from '@make.org/front/i18n/it.json';
import latvian from '@make.org/front/i18n/lv.json';
import lithuanian from '@make.org/front/i18n/lt.json';
import polish from '@make.org/front/i18n/pl.json';
import portuguese from '@make.org/front/i18n/pt.json';
import romanian from '@make.org/front/i18n/ro.json';
import slovak from '@make.org/front/i18n/sk.json';
import slovenian from '@make.org/front/i18n/sl.json';
import spanish from '@make.org/front/i18n/es.json';
import swedish from '@make.org/front/i18n/sv.json';
import ukrainian from '@make.org/front/i18n/uk.json';

import staticBulgarian from '@make.org/front/client/pages/Static/i18n/bg.json';
import staticCzech from '@make.org/front/client/pages/Static/i18n/cs.json';
import staticDutch from '@make.org/front/client/pages/Static/i18n/nl.json';
import staticEnglish from '@make.org/front/client/pages/Static/i18n/en.json';
import staticFinnish from '@make.org/front/client/pages/Static/i18n/fi.json';
import staticFrench from '@make.org/front/client/pages/Static/i18n/fr.json';
import staticGerman from '@make.org/front/client/pages/Static/i18n/de.json';
import staticItalian from '@make.org/front/client/pages/Static/i18n/it.json';
import staticPolish from '@make.org/front/client/pages/Static/i18n/pl.json';
import staticRomanian from '@make.org/front/client/pages/Static/i18n/ro.json';
import staticSpanish from '@make.org/front/client/pages/Static/i18n/es.json';
import staticUkrainian from '@make.org/front/client/pages/Static/i18n/uk.json';

export const translationRessources = {
  [LocaleType.bg]: { common: bulgarian, static: staticBulgarian },
  [LocaleType.cs]: { common: czech, static: staticCzech },
  [LocaleType.da]: { common: danish, static: staticEnglish },
  [LocaleType.de]: { common: german, static: staticGerman },
  [LocaleType.da]: { common: danish, static: staticEnglish },
  [LocaleType.el]: { common: greek, static: staticEnglish },
  [LocaleType.en]: { common: english, static: staticEnglish },
  [LocaleType.es]: { common: spanish, static: staticSpanish },
  [LocaleType.et]: { common: estonian, static: staticEnglish },
  [LocaleType.fi]: { common: finnish, static: staticFinnish },
  [LocaleType.fr]: { common: french, static: staticFrench },
  [LocaleType.hr]: { common: croatian, static: staticEnglish },
  [LocaleType.hu]: { common: hungarian, static: staticEnglish },
  [LocaleType.it]: { common: italian, static: staticItalian },
  [LocaleType.lt]: { common: lithuanian, static: staticEnglish },
  [LocaleType.lv]: { common: latvian, static: staticEnglish },
  [LocaleType.nl]: { common: dutch, static: staticDutch },
  [LocaleType.pl]: { common: polish, static: staticPolish },
  [LocaleType.pt]: { common: portuguese, static: staticEnglish },
  [LocaleType.sk]: { common: slovak, static: staticEnglish },
  [LocaleType.sl]: { common: slovenian, static: staticEnglish },
  [LocaleType.sv]: { common: swedish, static: staticEnglish },
  [LocaleType.ro]: { common: romanian, static: staticRomanian },
  [LocaleType.uk]: { common: ukrainian, static: staticUkrainian },
};

export const translationRessoucesLanguages: string[] = Object.keys(
  translationRessources
);
