import { handleSearchParams } from './url';

describe('handleSearchParams helper', () => {
  it('no query param in the url', () => {
    const returnedParams = handleSearchParams('');
    expect(returnedParams).toBe('');
  });

  it('returns nothing from query params', () => {
    const returnedParams = handleSearchParams('?foo=bar');
    expect(returnedParams).toBe('');
  });

  it('returns nothing from query params', () => {
    const returnedParams = handleSearchParams('');
    expect(returnedParams).toBe('');
  });

  it('returns the "query" from query params', () => {
    const returnedParams = handleSearchParams('?query=foo');
    expect(returnedParams).toBe('?query=foo');
  });

  it('returns the "lang" from query params', () => {
    const returnedParams = handleSearchParams('?foo=bar', 'baz');
    expect(returnedParams).toBe('?lang=baz');
  });

  it('returns the "query" and "lang" from query params', () => {
    const returnedParams = handleSearchParams('?query=foo', 'bar');
    expect(returnedParams).toBe('?query=foo&lang=bar');
  });
});
