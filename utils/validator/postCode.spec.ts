import * as postCodeValidator from './postCode';

describe('Post code validator', () => {
  describe('language support', () => {
    it('FR is supported', () => {
      expect(postCodeValidator.isSupportedCountry('FR')).toBeTruthy();
    });
    it('GB is supported', () => {
      expect(postCodeValidator.isSupportedCountry('GB')).toBeFalsy();
    });
    it('ZZ is not supported', () => {
      expect(postCodeValidator.isSupportedCountry('ZZ')).toBeFalsy();
    });
  });
  describe('regex validation', () => {
    it('get regex FR', () => {
      expect(postCodeValidator.regexByCountry('FR')).toEqual(
        /^(?:[0-8]\d|9[0-8])\d{3}$/
      );
    });
    it('get html5 regex FR', () => {
      expect(postCodeValidator.html5regexByCountry('FR')).toEqual(
        '^(?:[0-8]\\d|9[0-8])\\d{3}$'
      );
    });
  });
  describe('validate post codes', () => {
    it('validate post code FR ok', () => {
      expect(postCodeValidator.validate('38460', 'FR')).toBeTruthy();
    });
    it('validate post code FR ko', () => {
      expect(postCodeValidator.validate('99060', 'FR')).toBeFalsy();
    });
    it('validate post code with spaces for country FR ko', () => {
      expect(postCodeValidator.validate('38 460', 'FR')).toBeFalsy();
    });
    it('validate post code for country ZZ throws exception', () => {
      expect(() => postCodeValidator.validate('1111', 'ZZ')).toThrowError(
        'Country code not supported: Z'
      );
    });
  });
});
