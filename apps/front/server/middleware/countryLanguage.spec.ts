import httpMocks from 'node-mocks-http';
import i18n from 'i18next';
import {
  countryLanguageMiddleware,
  getCountryFromRequest,
} from './countryLanguage';

jest.mock('Shared/i18n');

describe('Country Language middelware', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    i18n.cloneInstance.mockRestore();
    i18n.changeLanguage.mockRestore();
  });

  describe('getCountryFromRequest function', () => {
    it('country is set by params', () => {
      const request = httpMocks.createRequest({
        params: { country: 'GB' },
      });
      const response = httpMocks.createResponse();

      const country = getCountryFromRequest(request, response, () => {});

      expect(country).toBe('GB');
    });
  });

  describe('countryLanguageMiddleware function', () => {
    it('country Uppercase into Request params', () => {
      const request = httpMocks.createRequest({
        params: { country: 'FR' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'redirect');

      countryLanguageMiddleware(request, response, () => {});

      expect(request.params.country).toBe('FR');
    });

    it('country Lowercase into Request params', () => {
      const request = httpMocks.createRequest({
        params: { country: 'fr' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'redirect');

      countryLanguageMiddleware(request, response, () => {});

      expect(request.params.country).toBe('FR');
    });

    it('country Capitalize into Request params', () => {
      const request = httpMocks.createRequest({
        params: { country: 'Fr' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'redirect');

      countryLanguageMiddleware(request, response, () => {});
      expect(request.params.country).toBe('FR');
    });

    it('clanguage Capitalize into Request params', () => {
      const request = httpMocks.createRequest({
        params: { country: 'FR' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'redirect');
      countryLanguageMiddleware(request, response, () => {});
      expect(request.params.language).toBe('fr');
    });

    it('must call i18n changeLanguage on a new instance', () => {
      jest.spyOn(i18n, 'changeLanguage');
      jest.spyOn(i18n, 'cloneInstance');
      const request = httpMocks.createRequest();
      const response = httpMocks.createResponse();

      countryLanguageMiddleware(request, response, () => {});

      expect(i18n.cloneInstance).toHaveBeenCalledTimes(1);
      expect(i18n.changeLanguage).toHaveBeenCalledTimes(1);
    });
  });
});
