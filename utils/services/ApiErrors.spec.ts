// @flow
import { type ErrorObjectType } from 'Shared/types/api';
import { mapErrors } from './ApiErrors';

describe('mapErrors', () => {
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

  const apiErrors: ErrorObjectType[] = [
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

  const badFieldErrors: ErrorObjectType[] = [
    {
      field: 'fooBad',
      key: 'fooKey',
      message: 'apiFooMessage',
    },
    {
      field: 'barBad',
      key: 'barKey',
      message: 'apiBarMessage',
    },
    {
      field: 'bazBad',
      key: 'bazKey',
      message: 'apiBazMessage',
    },
  ];

  const badFieldExpectedErrors: ErrorObjectType[] = [
    {
      field: 'foobad',
      key: 'fooKey',
      message: 'common.form.messages.fooKey',
    },
    {
      field: 'barbad',
      key: 'barKey',
      message: 'common.form.messages.barKey',
    },
    {
      field: 'bazbad',
      key: 'bazKey',
      message: 'common.form.messages.bazKey',
    },
  ];

  const badKeyErrors: ErrorObjectType[] = [
    {
      field: 'foo',
      key: 'fooBadKey',
      message: 'apiFooMessage',
    },
    {
      field: 'bar',
      key: 'barBadKey',
      message: 'apiBarMessage',
    },
    {
      field: 'baz',
      key: 'bazBadKey',
      message: 'apiBazMessage',
    },
  ];

  const badKeyExpectedErrors: ErrorObjectType[] = [
    {
      field: 'foo',
      key: 'fooBadKey',
      message: 'common.form.messages.fooBadKey',
    },
    {
      field: 'bar',
      key: 'barBadKey',
      message: 'common.form.messages.barBadKey',
    },
    {
      field: 'baz',
      key: 'bazBadKey',
      message: 'common.form.messages.bazBadKey',
    },
  ];

  it('mapErrors with right fields & right keys', () => {
    expect(mapErrors(internalErrors, apiErrors)).toEqual(internalErrors);
  });

  it('mapErrors with bad fields & right keys', () => {
    expect(mapErrors(internalErrors, badFieldErrors)).toEqual(
      badFieldExpectedErrors
    );
  });

  it('mapErrors with right fields & bad keys', () => {
    expect(mapErrors(internalErrors, badKeyErrors)).toEqual(
      badKeyExpectedErrors
    );
  });
});
