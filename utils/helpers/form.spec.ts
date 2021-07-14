import { ErrorObjectType } from '@make.org/types';
import { defaultApiError, emptyError } from '../errors/Messages';
import {
  getFieldError,
  getErrorMessages,
  setNullToEmptyString,
  setEmptyStringToNull,
} from './form';

describe('getFieldError', () => {
  const errors: ErrorObjectType[] = [
    {
      field: 'foo',
      key: 'fooKey',
      message: 'fooMessage',
    },
    {
      field: 'bar',
      key: 'barKey',
      message: 'barMessage',
    },
    {
      field: 'baz',
      key: 'bazKey',
      message: 'bazMessage',
    },
  ];
  it('getFieldError with right key and empty errors', () => {
    expect(getFieldError('foo', [defaultApiError])).toEqual(emptyError);
  });

  it('getFieldError with bad field key and filled errors', () => {
    expect(getFieldError('badFieldKey', errors)).toEqual(emptyError);
  });

  it('getFieldError with right key and filled errors', () => {
    errors.map((error, index) =>
      expect(getFieldError(error.field, errors)).toEqual(errors[index])
    );
  });
});

describe('getErrorMessages', () => {
  const internalErrors: ErrorObjectType[] = [
    {
      field: 'foo',
      key: 'fooKey',
      message: 'internalFooMessage',
    },
    {
      field: 'bar',
      key: 'barKey',
      message: 'internalBarMessage',
    },
    {
      field: 'baz',
      key: 'bazKey',
      message: 'internalBazMessage',
    },
  ];

  const serviceErrors: ErrorObjectType[] = [
    {
      field: 'foo',
      key: 'fooKey',
      message: 'apiFooMessage',
    },
    {
      field: 'bar',
      key: 'barKey',
      message: 'apiBarMessage',
    },
    {
      field: 'baz',
      key: 'bazKey',
      message: 'apiBazMessage',
    },
  ];

  const apiObjectError: ErrorObjectType = {
    field: 'foo',
    key: 'fooKey',
    message: 'fooMessage',
  };

  it('getMessage with an array of Errors returned from Api', () => {
    const errors = getErrorMessages(internalErrors, serviceErrors);
    expect(errors).toEqual(internalErrors);
  });
  it('getMessage with an single object error returned from Api', () => {
    const errors = getErrorMessages(internalErrors, apiObjectError);
    expect(errors).toEqual([defaultApiError]);
  });
});

describe('setEmptyStringToNull', () => {
  it('empty string should return null', () => {
    expect(setEmptyStringToNull('')).toEqual(null);
    expect(setEmptyStringToNull(' ')).toEqual(null);
    expect(setEmptyStringToNull(undefined)).toEqual(null);
    expect(setEmptyStringToNull(null)).toEqual(null);
  });
  it('value should be returned', () => {
    expect(setEmptyStringToNull('foo')).toEqual('foo');
    expect(setEmptyStringToNull('         foo          ')).toEqual('foo');
    expect(setEmptyStringToNull(0)).toEqual(0);
    expect(setEmptyStringToNull(55)).toEqual(55);
  });
});

describe('setNullToEmptyString', () => {
  it('null should return empty string', () => {
    expect(setNullToEmptyString(null)).toEqual('');
    expect(setNullToEmptyString(undefined)).toEqual('');
  });
  it('value should be returned', () => {
    expect(setNullToEmptyString('foo')).toEqual('foo');
    expect(setNullToEmptyString(0)).toEqual(0);
    expect(setNullToEmptyString(5)).toEqual(5);
  });
});
