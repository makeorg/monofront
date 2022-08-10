import {
  compareCountriesByName,
  getCountryDPA,
  getCountryWithConsultations,
} from './countries';

jest.mock('@make.org/utils/constants/config', () => ({
  DEFAULT_LANGUAGE: 'en',
}));

describe('Countries helper', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('compareCountriesByName', () => {
    const toBeSorted = [
      { isoCode: 'FR', name: 'France' },
      { isoCode: 'AU', name: 'Autriche' },
    ];
    const sorted = [
      { isoCode: 'AU', name: 'Autriche' },
      { isoCode: 'FR', name: 'France' },
    ];

    const same = [
      { isoCode: 'AU', name: 'Autriche' },
      { isoCode: 'AU', name: 'Autriche' },
    ];

    it('compare unsorted array', () => {
      expect(compareCountriesByName(toBeSorted[0], toBeSorted[1])).toBe(1);
    });

    it('compare sorted array', () => {
      expect(compareCountriesByName(sorted[0], sorted[1])).toBe(-1);
    });

    it('compare array with same values', () => {
      expect(compareCountriesByName(same[0], same[1])).toBe(0);
    });
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
