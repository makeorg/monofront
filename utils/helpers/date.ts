import moment from 'moment';
import {
  HomeQuestionType,
  QuestionTimelineType,
} from '@make.org/types';
import { DEFAULT_LANGUAGE } from '@make.org/utils/constants/config';

export const getDateOfBirthFromAge = (age = ''): string => {
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
    mounthDiff < 0
    || (mounthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age.toString();
};

type ConsultationDates = {
  startDate?: string | null,
  endDate?: string | null,
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

export const selectStep = (
  timeline: {
    result?: QuestionTimelineType,
    workshop?: QuestionTimelineType,
    action?: QuestionTimelineType,
  },
  currentStep: string,
  nextStep: string | undefined
): boolean => {
  const today = Date.now();
  const currentStepDate = Date.parse(timeline[currentStep].date);
  let nextStepDate;

  if (nextStep) {
    nextStepDate = Date.parse(timeline[nextStep].date);
  }

  const isBetweenSteps = today >= currentStepDate && today < nextStepDate;
  const isLastStep = today >= currentStepDate && !nextStepDate;

  if (isBetweenSteps || isLastStep) {
    return true;
  }

  return false;
};

type DateHelperSingletonType = {
  languageValue: string
}

let instance: DateHelperSingletonType | null = null;

export class DateHelperSingleton {
  languageValue: string;

  constructor(language: string) {
    if (!instance) {
      instance = this;
    }

    this.languageValue = language;
  }

  set language(language: string) {
    this.languageValue = language;
  }

  get language(): string {
    return this.languageValue;
  }

  localizedAndFormattedDate(date?: string, format?: string): string | null {
    if (!date || !format) {
      return null;
    }

    const objectDate = new Date(date);
    if (Number.isNaN(objectDate.getMonth())) {
      return null;
    }

    moment.locale(this.languageValue);

    return moment(objectDate).format(format);
  }

  getRemainingDays(endDate: string | null): number | null {
    if (!endDate) {
      return null;
    }

    const objectNowDate = new Date();
    const objectEndDate = new Date(endDate);
    if (
      Number.isNaN(objectEndDate.getMonth())
      || Number.isNaN(objectNowDate.getMonth())
    ) {
      return null;
    }

    moment.locale(this.languageValue);

    const momentNowDate = moment(objectNowDate);
    const momentEndDate = moment(objectEndDate);

    return momentEndDate.diff(momentNowDate, 'days');
  }
}

export const getDate = (dateString?: string): Date | null => {
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

  return (Number(dateB) - Number(dateA));
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

  return (Number(dateB) - Number(dateA));
};

export const DateHelper = new DateHelperSingleton(DEFAULT_LANGUAGE);
