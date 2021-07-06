/* @flow */

import MockDate from 'mockdate';
import { DATE_CAPITALIZE_LL_FORMAT } from 'Shared/constants/date';
import {
  DateHelper,
  getDateOfBirthFromAge,
  getAgeFromDateOfBirth,
  isInProgress,
  getDate,
  orderByEndDate,
  selectStep,
  chronologicalOrder,
} from './date';

describe('Date Helper', () => {
  describe('getDateOfBirthFromAge', () => {
    it('getDateOfBirthFromAge with valid integer age', () => {
      MockDate.set('1/1/2019');
      const dateOfBirth = getDateOfBirthFromAge(32);
      expect(dateOfBirth).toBe('1987-01-01');
      MockDate.reset();
    });

    it('getDateOfBirthFromAge with valid integer age and changing current date', () => {
      MockDate.set('1/1/2018');
      const dateOfBirth = getDateOfBirthFromAge(35);
      expect(dateOfBirth).toBe('1983-01-01');
      MockDate.reset();
    });

    it('getDateOfBirthFromAge with valid string age', () => {
      MockDate.set('1/1/2019');
      const dateOfBirth = getDateOfBirthFromAge('32');
      expect(dateOfBirth).toBe('1987-01-01');
      MockDate.reset();
    });

    it('getDateOfBirthFromAge without age', () => {
      const dateOfBirth = getDateOfBirthFromAge();
      expect(dateOfBirth).toBe(null);
    });
  });

  describe('getAgeFromDateOfBirth', () => {
    it('getDateOfBirthFromAge with invalid date', () => {
      MockDate.set('1/1/2019');
      const age = getAgeFromDateOfBirth('fooo-bar');
      expect(age).toBe('');
    });

    it('getDateOfBirthFromAge with empty date', () => {
      MockDate.set('1/1/2019');
      const age = getAgeFromDateOfBirth();
      expect(age).toBe('');
    });

    it('getDateOfBirthFromAge with valid date', () => {
      MockDate.set('1/1/2019');
      const age = getAgeFromDateOfBirth('1986-09-29');
      expect(age).toBe('32');
    });

    it('getDateOfBirthFromAge with valid date and mounth in future', () => {
      MockDate.set('1/10/2019');
      const age = getAgeFromDateOfBirth('1986-09-29');
      expect(age).toBe('32');
    });
  });

  describe('localizedAndFormattedDate', () => {
    it('localizedAndFormattedDate with valid date', () => {
      DateHelper.language = 'fr';
      expect(
        DateHelper.localizedAndFormattedDate(
          '2018-10-25T12:45:25.752Z',
          DATE_CAPITALIZE_LL_FORMAT
        )
      ).toBe('25 octobre 2018');
    });

    it('localizedAndFormattedDate with valid date and en locale', () => {
      DateHelper.language = 'en';
      expect(
        DateHelper.localizedAndFormattedDate(
          '2018-10-24T12:45:25.752Z',
          DATE_CAPITALIZE_LL_FORMAT
        )
      ).toBe('October 24, 2018');
    });

    it('localizedAndFormattedDate with invalid date', () => {
      expect(
        DateHelper.localizedAndFormattedDate('foo', DATE_CAPITALIZE_LL_FORMAT)
      ).toBeNull();
    });

    it('localizedAndFormattedDate with invalid format', () => {
      expect(
        DateHelper.localizedAndFormattedDate(
          '2018-10-24T12:45:25.752Z',
          undefined
        )
      ).toBeNull();
    });
  });

  describe('getRemainingDays', () => {
    it('getRemainingDays with valid date', () => {
      jest
        .spyOn(global, 'Date')
        .mockImplementationOnce(() => new Date('2019-10-15T12:45:25.752Z'));

      expect(DateHelper.getRemainingDays('2019-10-25T12:45:25.752Z')).toBe(10);
    });

    it('getRemainingDays with invalid date', () => {
      expect(DateHelper.getRemainingDays('foo')).toBeNull();
    });
  });

  describe('isInProgress', () => {
    const startDate = '1980-01-01';
    let endDate = '2075-01-01';

    it('isInProgress with startDate is null', () => {
      expect(isInProgress({ startDate: null, endDate })).toBe(true);
    });

    it('isInProgress with endDate is null', () => {
      expect(isInProgress({ startDate, endDate: null })).toBe(true);
    });

    it('consultation is open', () => {
      expect(isInProgress({ startDate, endDate })).toBe(true);
    });

    it('consultation is closed', () => {
      endDate = '1980-01-02';
      expect(isInProgress({ startDate, endDate })).toBe(false);
    });
  });

  describe('selectStep', () => {
    const result = { date: '2021-02-15' };
    const workshop = { date: '2021-03-15' };
    const action = { date: '2021-04-15' };
    const timeline = { result, action, workshop };

    it('marks first step result as current', () => {
      MockDate.set('2021-03-10');
      expect(selectStep(timeline, 'result', 'workshop')).toBe(true);
      expect(selectStep(timeline, 'workshop', 'result')).toBe(false);
      expect(selectStep(timeline, 'workshop', 'action')).toBe(false);
    });

    it('marks second step workshop as current', () => {
      MockDate.set('2021-04-10');
      expect(selectStep(timeline, 'workshop', 'action')).toBe(true);
      expect(selectStep(timeline, 'action', 'result')).toBe(false);
      expect(selectStep(timeline, 'result', 'workshop')).toBe(false);
      expect(selectStep(timeline, 'result', 'workshop')).toBe(false);
      expect(selectStep(timeline, 'workshop', 'result')).toBe(false);
    });

    it('marks last step as current', () => {
      MockDate.set('2021-05-10');
      expect(selectStep(timeline, 'result', undefined)).toBe(true);
      expect(selectStep(timeline, 'workshop', 'result')).toBe(false);
      expect(selectStep(timeline, 'action', 'result')).toBe(false);
      expect(selectStep(timeline, 'action', 'workshop')).toBe(false);
      expect(selectStep(timeline, 'result', 'action')).toBe(false);
      expect(selectStep(timeline, 'result', 'workshop')).toBe(false);
    });
  });

  describe('getDate', () => {
    const nullDate = null;
    const dateString = '1984-02-15';
    const date = new Date(dateString);

    it('receive an null date', () => {
      expect(getDate(nullDate)).toBe(null);
    });

    it('receive a string date', () => {
      expect(getDate(dateString)).toMatchObject(date);
    });
  });

  describe('orderByEndDate', () => {
    const questionA = { endDate: '1980-01-02' };
    const questionB = { endDate: '2075-01-01' };
    const questionANullDate = { endDate: null };
    const questionBNullDate = { endDate: null };

    it('receive null end date for both questions', () => {
      expect(orderByEndDate(questionANullDate, questionBNullDate)).toBe(0);
    });

    it('receive null end date for questionA', () => {
      expect(orderByEndDate(questionANullDate, questionB)).toBe(-1);
    });

    it('receive null end date for questionB', () => {
      expect(orderByEndDate(questionA, questionBNullDate)).toBe(1);
    });

    it('receive endDates for questionA & questionB', () => {
      const dateA = getDate(questionA.endDate);
      const dateB = getDate(questionB.endDate);

      expect(orderByEndDate(questionA, questionB)).toBe(dateB - dateA);
    });
  });

  describe('chronologicalOrder', () => {
    const stepA = { date: '1980-01-02' };
    const stepB = { date: '2075-01-01' };
    const stepANullDate = { date: null };
    const stepBNullDate = { date: null };

    it('receive null date for both steps', () => {
      expect(chronologicalOrder(stepANullDate, stepBNullDate)).toBe(0);
    });

    it('receive null date for stepA', () => {
      expect(chronologicalOrder(stepANullDate, stepB)).toBe(1);
    });

    it('receive null date for stepB', () => {
      expect(chronologicalOrder(stepA, stepBNullDate)).toBe(-1);
    });

    it('receive dates for stepA & stepB', () => {
      const dateA = getDate(stepA.date);
      const dateB = getDate(stepB.date);

      expect(chronologicalOrder(stepA, stepB)).toBe(dateA - dateB);
    });
  });
});
