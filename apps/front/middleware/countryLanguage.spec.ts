import httpMocks from 'node-mocks-http';
import i18n from 'i18next';
import {
  countryLanguageMiddleware,
  getCountryFromRequest,
} from './countryLanguage';

describe('Country Language middelware', () => {
  describe('getCountryFromRequest function', () => {
    it('country is set by params', () => {
      const request = httpMocks.createRequest({
        params: { country: 'GB' },
      });
      const country = getCountryFromRequest(request);

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

      countryLanguageMiddleware(request, response, () => undefined);

      expect(request.params.country).toBe('FR');
    });

    it('country Lowercase into Request params', () => {
      const request = httpMocks.createRequest({
        params: { country: 'fr' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'redirect');

      countryLanguageMiddleware(request, response, () => undefined);

      expect(request.params.country).toBe('FR');
    });

    it('country Capitalize into Request params', () => {
      const request = httpMocks.createRequest({
        params: { country: 'Fr' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'redirect');

      countryLanguageMiddleware(request, response, () => undefined);
      expect(request.params.country).toBe('FR');
    });

    it('must call i18n changeLanguage on a new instance', () => {
      jest.spyOn(i18n, 'changeLanguage');
      jest.spyOn(i18n, 'cloneInstance');
      const request = httpMocks.createRequest();
      const response = httpMocks.createResponse();

      countryLanguageMiddleware(request, response, () => undefined);

      expect(i18n.cloneInstance).toHaveBeenCalledTimes(1);
      expect(i18n.changeLanguage).toHaveBeenCalledTimes(1);
    });
  });
});
