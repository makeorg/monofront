import httpMocks from 'node-mocks-http';
import { redirectCountryLanguageUrl, redirectToCountry } from './redirect';

describe('Redirect middelware', () => {
  describe('redirectToCountry function', () => {
    it('redirect to /countryISOCode if xForcedCountry is not France', () => {
      const request = httpMocks.createRequest({
        headers: { 'x-forced-country': 'IT' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'redirect');

      redirectToCountry(request, response);

      expect(response.redirect).toHaveBeenCalledWith('/IT');
    });
    it('redirect to /countryISOCode if xDetectedCountry is not France', () => {
      const request = httpMocks.createRequest({
        headers: { 'x-detected-country': 'GB' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'redirect');

      redirectToCountry(request, response);

      expect(response.redirect).toHaveBeenCalledWith('/GB');
    });

    it('redirect to /FR if xForcedCountry is France', () => {
      const request = httpMocks.createRequest({
        headers: { 'x-forced-country': 'FR' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'redirect');

      redirectToCountry(request, response);

      expect(response.redirect).toHaveBeenCalledWith('/FR');
    });

    it('redirect to /FR if xDetectedCountry is France', () => {
      const request = httpMocks.createRequest({
        headers: { 'x-detected-country': 'FR' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'redirect');

      redirectToCountry(request, response);

      expect(response.redirect).toHaveBeenCalledWith('/FR');
    });

    it("redirect to /FR if x-detected-country and x-forced-country don't exist", () => {
      const request = httpMocks.createRequest({
        headers: {},
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'redirect');

      redirectToCountry(request, response);

      expect(response.redirect).toHaveBeenCalledWith('/FR');
    });
  });

  describe('redirectCountryLanguageUrl function', () => {
    it('redirect country lang path to new url pattern with 301 status', () => {
      const request = httpMocks.createRequest({
        url: '/GB-en',
        params: { language: 'en' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'redirect');

      redirectCountryLanguageUrl(request, response);

      expect(response.redirect).toHaveBeenCalledWith(301, '/GB');
    });

    it('redirect to new url pattern with 301 status', () => {
      const request = httpMocks.createRequest({
        url: '/FR-fr/foo/bar/baz',
        params: { language: 'fr' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'redirect');

      redirectCountryLanguageUrl(request, response);

      expect(response.redirect).toHaveBeenCalledWith(301, '/FR/foo/bar/baz');
    });

    it('redirect to new url pattern + query params with 301 status', () => {
      const request = httpMocks.createRequest({
        url: '/FR-fr/foo/bar/baz?qux=quux&quuz=corge',
        params: { language: 'fr' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'redirect');

      redirectCountryLanguageUrl(request, response);

      expect(response.redirect).toHaveBeenCalledWith(
        301,
        '/FR/foo/bar/baz?qux=quux&quuz=corge'
      );
    });
  });
});
