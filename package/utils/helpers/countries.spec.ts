import { getCountryDPA, getCountryWithConsultations } from './countries';

jest.mock('@make.org/utils/constants/config', () => ({
  DEFAULT_LANGUAGE: 'en',
}));

describe('Countries helper', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('getCountryWithConsultations function', () => {
    const countriesWithConsultations = ['FR', 'GB', 'ES'];
    it('country has consultations', () => {
      expect(
        getCountryWithConsultations('FR', countriesWithConsultations)
      ).toBe('FR');
    });

    it("country doesn't have consultations", () => {
      expect(
        getCountryWithConsultations('US', countriesWithConsultations)
      ).toBe(null);
    });
  });

  describe('getCountryDPA function', () => {
    const FR = {
      name: 'CNIL',
      link: 'https://www.cnil.fr/fr/adresser-une-plainte',
    };
    const US = {
      name: 'Federal Trade Commission',
      link: 'https://www.ftc.gov/tips-advice/business-center/privacy-and-security/privacy-shield',
    };

    it('FR DPA', () => {
      expect(getCountryDPA('FR')).toEqual(FR);
    });

    it('US DPA', () => {
      expect(getCountryDPA('US')).toEqual(US);
    });

    it('Unknown DPA', () => {
      expect(getCountryDPA('CN')).toEqual({ name: '', link: '#' });
    });
  });
});
