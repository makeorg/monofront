import { LocaleType } from '@make.org/types/enums';

import bulgarian from '@make.org/widget/i18n/bg.json';
import croatian from '@make.org/widget/i18n/hr.json';
import czech from '@make.org/widget/i18n/cs.json';
import danish from '@make.org/widget/i18n/da.json';
import dutch from '@make.org/widget/i18n/nl.json';
import english from '@make.org/widget/i18n/en.json';
import estonian from '@make.org/widget/i18n/et.json';
import finnish from '@make.org/widget/i18n/fi.json';
import french from '@make.org/widget/i18n/fr.json';
import german from '@make.org/widget/i18n/de.json';
import greek from '@make.org/widget/i18n/el.json';
import hungarian from '@make.org/widget/i18n/hu.json';
import italian from '@make.org/widget/i18n/it.json';
import latvian from '@make.org/widget/i18n/lt.json';
import lithuanian from '@make.org/widget/i18n/lv.json';
import polish from '@make.org/widget/i18n/pl.json';
import portuguese from '@make.org/widget/i18n/pt.json';
import romanian from '@make.org/widget/i18n/ro.json';
import slovak from '@make.org/widget/i18n/sk.json';
import slovenian from '@make.org/widget/i18n/sl.json';
import spanish from '@make.org/widget/i18n/es.json';
import swedish from '@make.org/widget/i18n/sv.json';
import ukrainian from '@make.org/widget/i18n/uk.json';

export const translationRessources = {
  [LocaleType.bg]: { common: bulgarian },
  [LocaleType.cs]: { common: czech },
  [LocaleType.da]: { common: danish },
  [LocaleType.de]: { common: german },
  [LocaleType.da]: { common: danish },
  [LocaleType.el]: { common: greek },
  [LocaleType.en]: { common: english },
  [LocaleType.es]: { common: spanish },
  [LocaleType.et]: { common: estonian },
  [LocaleType.fi]: { common: finnish },
  [LocaleType.fr]: { common: french },
  [LocaleType.hr]: { common: croatian },
  [LocaleType.hu]: { common: hungarian },
  [LocaleType.it]: { common: italian },
  [LocaleType.lt]: { common: lithuanian },
  [LocaleType.lv]: { common: latvian },
  [LocaleType.nl]: { common: dutch },
  [LocaleType.pl]: { common: polish },
  [LocaleType.pt]: { common: portuguese },
  [LocaleType.sk]: { common: slovak },
  [LocaleType.sl]: { common: slovenian },
  [LocaleType.sv]: { common: swedish },
  [LocaleType.ro]: { common: romanian },
  [LocaleType.uk]: { common: ukrainian },
};
