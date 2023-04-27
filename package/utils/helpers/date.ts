/* eslint-disable import/no-duplicates */
import formatDate from 'date-fns/format';

import bg from 'date-fns/locale/bg';
import cs from 'date-fns/locale/cs';
import da from 'date-fns/locale/da';
import de from 'date-fns/locale/de';
import el from 'date-fns/locale/el';
import enGB from 'date-fns/locale/en-GB';
import es from 'date-fns/locale/es';
import et from 'date-fns/locale/et';
import fi from 'date-fns/locale/fi';
import fr from 'date-fns/locale/fr';
import hr from 'date-fns/locale/hr';
import hu from 'date-fns/locale/hu';
import it from 'date-fns/locale/it';
import lt from 'date-fns/locale/lt';
import lv from 'date-fns/locale/lv';
import nl from 'date-fns/locale/nl';
import pl from 'date-fns/locale/pl';
import pt from 'date-fns/locale/pt';
import ro from 'date-fns/locale/ro';
import sk from 'date-fns/locale/sk';
import sl from 'date-fns/locale/sl';
import sv from 'date-fns/locale/sv';
import uk from 'date-fns/locale/uk';

import { HomeQuestionType, QuestionTimelineType } from '@make.org/types';
import { DEFAULT_LANGUAGE } from '@make.org/utils/constants/config';
import { LocaleType } from '@make.org/types/enums';

const locales: { [key: string]: Locale } = {
  [LocaleType.bg]: bg,
  [LocaleType.cs]: cs,
  [LocaleType.da]: da,
  [LocaleType.de]: de,
  [LocaleType.el]: el,
  [LocaleType.en]: enGB,
  [LocaleType.es]: es,
  [LocaleType.et]: et,
  [LocaleType.fi]: fi,
  [LocaleType.fr]: fr,
  [LocaleType.hr]: hr,
  [LocaleType.hu]: hu,
  [LocaleType.it]: it,
  [LocaleType.lt]: lt,
  [LocaleType.lv]: lv,
  [LocaleType.nl]: nl,
  [LocaleType.pl]: pl,
  [LocaleType.pt]: pt,
  [LocaleType.ro]: ro,
  [LocaleType.sk]: sk,
  [LocaleType.sl]: sl,
  [LocaleType.sv]: sv,
  [LocaleType.uk]: uk,
};

export const getDateOfBirthFromAge = (age: string | number = ''): string => {
  if (!age) {
    return '';
  }

  const birthYear = new Date().getFullYear() - Number(age);

  return `${birthYear}-01-01`;
};

export const getAgeFromDateOfBirth = (dateOfBirth: string): string => {
  if (!dateOfBirth) {
    return '';
  }

  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  if (birthDate.toString() === 'Invalid Date') {
    return '';
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const mounthDiff = today.getMonth() - birthDate.getMonth();
  if (
    mounthDiff < 0 ||
    (mounthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age.toString();
};

type ConsultationDates = {
  startDate?: string | null;
  endDate?: string | null;
};

export const isInProgress = (dates: ConsultationDates): boolean => {
  if (!dates.endDate) {
    return true;
  }
  const end = new Date(dates.endDate);
  const today = new Date();

  if (!dates.startDate) {
    return today < end;
  }
  const start = new Date(dates.startDate);

  return start <= today && today < end;
};

type DateHelperSingletonType = {
  languageValue: keyof typeof LocaleType;
};

let instance: DateHelperSingletonType | null = null;

class DateHelperSingleton {
  languageValue: keyof typeof LocaleType;

  constructor(language: keyof typeof LocaleType) {
    if (!instance) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      instance = this;
    }

    this.languageValue = language;
  }

  set language(language: keyof typeof LocaleType) {
    this.languageValue = language;
  }

  get language(): keyof typeof LocaleType {
    return this.languageValue;
  }

  localizedAndFormattedDate(date?: string, format?: string): string {
    if (!date || !format) {
      return '';
    }

    const objectDate = new Date(date);
    if (Number.isNaN(objectDate.getMonth())) {
      return '';
    }
    const locale = locales[this.languageValue];
    return formatDate(objectDate, format, {
      locale,
    });
  }
}

export const getRemainingDays = (
  endDate: string | null | undefined
): number | null => {
  if (!endDate) {
    return null;
  }

  const objectEndDate = new Date(endDate);
  if (Number.isNaN(objectEndDate.getMonth())) {
    return null;
  }

  return Math.round(
    (objectEndDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)
  );
};

const getDate = (dateString?: string): Date | null => {
  if (!dateString) {
    return null;
  }
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

export const orderByEndDate = (
  questionA: HomeQuestionType,
  questionB: HomeQuestionType
): number => {
  const dateA = getDate(questionA.endDate);
  const dateB = getDate(questionB.endDate);

  if (dateA === null && dateB === null) {
    return 0;
  }
  if (dateB === null) {
    return 1;
  }
  if (dateA === null) {
    return -1;
  }

  return Number(dateB) - Number(dateA);
};

export const chronologicalOrder = (
  stepA: QuestionTimelineType,
  stepB: QuestionTimelineType
): number => {
  const dateA = getDate(stepA.date);
  const dateB = getDate(stepB.date);

  if (dateA === null && dateB === null) {
    return 0;
  }
  if (dateA === null) {
    return 1;
  }
  if (dateB === null) {
    return -1;
  }

  return Number(dateA) - Number(dateB);
};

export const DateHelper = new DateHelperSingleton(DEFAULT_LANGUAGE);
