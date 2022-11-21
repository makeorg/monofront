import { isSupportedCountry } from './postCode';
import configuration from './configuration.yaml';

describe('Post code validator', () => {
  describe('language support', () => {
    it('FR is supported', () => {
      expect(isSupportedCountry('FR')).toBeTruthy();
    });
    it('GB is supported', () => {
      expect(isSupportedCountry('GB')).toBeFalsy();
    });
    it('ZZ is not supported', () => {
      expect(isSupportedCountry('ZZ')).toBeFalsy();
    });
  });

  describe('check regex from yaml', () => {
    const check = (postalCode: string, country: string) => {
      const reg = new RegExp(configuration.postCode[country]);
      return reg.test(postalCode);
    };

    it('check post code FR ok', () => {
      expect(check('38460', 'FR')).toBeTruthy();
    });
    it('check post code FR ko', () => {
      expect(check('99060', 'FR')).toBeFalsy();
    });
    it('check post code with spaces for country FR ko', () => {
      expect(check('38 460', 'FR')).toBeFalsy();
    });
    it('check post code DE ok', () => {
      expect(check('56734', 'DE')).toBeTruthy();
    });
    it('check post code DE ko', () => {
      expect(check('5673', 'DE')).toBeFalsy();
    });
  });
});
