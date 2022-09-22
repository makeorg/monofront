import httpMocks from 'node-mocks-http';
import i18n from 'i18next';
import { COOKIE } from '@make.org/types/enums';
import { DEFAULT_LANGUAGE } from '@make.org/utils/constants/config';
import * as countryLanguageHelper from './countryLanguage';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Country Language middelware', () => {
  describe('getCountryFromRequest function', () => {
    it('country is set by params', () => {
      const request = httpMocks.createRequest({
        params: { country: 'GB' },
      });
      const country = countryLanguageHelper.getCountryFromRequest(request);

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

      const spy = jest.spyOn(countryLanguageHelper, 'getUserLanguage');
      spy.mockReturnValue('fr');

      countryLanguageHelper.countryLanguageMiddleware(
        request,
        response,
        () => undefined
      );

      expect(request.params.country).toBe('FR');
    });

    it('country Lowercase into Request params', () => {
      const request = httpMocks.createRequest({
        params: { country: 'fr' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'redirect');

      const spy = jest.spyOn(countryLanguageHelper, 'getUserLanguage');
      spy.mockReturnValue('fr');

      countryLanguageHelper.countryLanguageMiddleware(
        request,
        response,
        () => undefined
      );

      expect(request.params.country).toBe('FR');
    });

    it('country Capitalize into Request params', () => {
      const request = httpMocks.createRequest({
        params: { country: 'Fr' },
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'redirect');

      const spy = jest.spyOn(countryLanguageHelper, 'getUserLanguage');
      spy.mockReturnValue('fr');

      countryLanguageHelper.countryLanguageMiddleware(
        request,
        response,
        () => undefined
      );
      expect(request.params.country).toBe('FR');
    });

    it('must call i18n changeLanguage on a new instance', () => {
      jest.spyOn(i18n, 'changeLanguage');
      jest.spyOn(i18n, 'cloneInstance');
      const request = httpMocks.createRequest();
      const response = httpMocks.createResponse();

      const spy = jest.spyOn(countryLanguageHelper, 'getUserLanguage');
      spy.mockReturnValue('fr');

      countryLanguageHelper.countryLanguageMiddleware(
        request,
        response,
        () => undefined
      );

      expect(i18n.cloneInstance).toHaveBeenCalledTimes(1);
      expect(i18n.changeLanguage).toHaveBeenCalledTimes(1);
    });
  });
  describe('countryLanguageMiddleware getUserLanguage', () => {
    it('support language from query params', () => {
      const request = httpMocks.createRequest({
        query: { lang: 'de' },
        headers: {
          'Accept-Language': 'it, fr',
        },
      });
      const cookieGet = jest.fn(() => ({ language: 'en' }));
      const cookieSet = jest.fn((name: unknown, val: unknown) => {
        expect(name).toStrictEqual(COOKIE.USER_PREFERENCES);
        expect(val).toStrictEqual({ language: 'de' });
      });
      request.universalCookies = {
        get: cookieGet,
        set: cookieSet,
      };

      const result = countryLanguageHelper.getUserLanguage(request);
      expect(result).toStrictEqual('de');
      expect(cookieGet).toHaveBeenCalled();
      expect(cookieSet).toHaveBeenCalled();
    });
    it('support language from cookie', () => {
      const request = httpMocks.createRequest({
        headers: {
          'Accept-Language': 'fr, it',
        },
      });
      const cookieGet = jest.fn(() => ({ language: 'en' }));
      const cookieSet = jest.fn();
      request.universalCookies = {
        get: cookieGet,
        set: cookieSet,
      };

      const result = countryLanguageHelper.getUserLanguage(request);
      expect(cookieGet).toHaveBeenCalled();
      expect(cookieSet).not.toHaveBeenCalled();
      expect(result).toStrictEqual('en');
    });
    it('support language from header accept language', () => {
      const request = httpMocks.createRequest({
        headers: {
          'Accept-Language': 'fr, it',
        },
      });
      const cookieGet = jest.fn();
      const cookieSet = jest.fn((name: unknown, val: unknown) => {
        expect(name).toStrictEqual(COOKIE.USER_PREFERENCES);
        expect(val).toStrictEqual({ language: 'fr' });
      });
      request.universalCookies = {
        get: cookieGet,
        set: cookieSet,
      };

      const result = countryLanguageHelper.getUserLanguage(request);
      expect(result).toStrictEqual('fr');
      expect(cookieGet).toHaveBeenCalled();
      expect(cookieSet).toHaveBeenCalled();
    });
    it('Fallback when any language information', () => {
      const request = httpMocks.createRequest();
      const cookieGet = jest.fn();
      const cookieSet = jest.fn((name: unknown, val: unknown) => {
        expect(name).toStrictEqual(COOKIE.USER_PREFERENCES);
        expect(val).toStrictEqual({ language: DEFAULT_LANGUAGE });
      });
      request.universalCookies = {
        get: cookieGet,
        set: cookieSet,
      };

      const result = countryLanguageHelper.getUserLanguage(request);
      expect(result).toStrictEqual(DEFAULT_LANGUAGE);
      expect(cookieGet).toHaveBeenCalled();
      expect(cookieSet).toHaveBeenCalled();
    });
    it('Fallback when language is not supported from query params', () => {
      const request = httpMocks.createRequest({
        query: { lang: 'xx' },
      });
      const cookieGet = jest.fn();
      const cookieSet = jest.fn((name: unknown, val: unknown) => {
        expect(name).toStrictEqual(COOKIE.USER_PREFERENCES);
        expect(val).toStrictEqual({ language: DEFAULT_LANGUAGE });
      });
      request.universalCookies = {
        get: cookieGet,
        set: cookieSet,
      };

      const result = countryLanguageHelper.getUserLanguage(request);
      expect(result).toStrictEqual(DEFAULT_LANGUAGE);
      expect(cookieGet).toHaveBeenCalled();
      expect(cookieSet).toHaveBeenCalled();
    });
    it('Fallback when language is not supported from cookies', () => {
      const request = httpMocks.createRequest();
      const cookieGet = jest.fn(() => ({ language: 'xx' }));
      const cookieSet = jest.fn((name: unknown, val: unknown) => {
        expect(name).toStrictEqual(COOKIE.USER_PREFERENCES);
        expect(val).toStrictEqual({ language: DEFAULT_LANGUAGE });
      });
      request.universalCookies = {
        get: cookieGet,
        set: cookieSet,
      };

      const result = countryLanguageHelper.getUserLanguage(request);
      expect(result).toStrictEqual(DEFAULT_LANGUAGE);
      expect(cookieGet).toHaveBeenCalled();
      expect(cookieSet).toHaveBeenCalled();
    });
    it('Fallback when language is not supported from header', () => {
      const request = httpMocks.createRequest({
        headers: {
          'Accept-Language': 'xx',
        },
      });
      const cookieGet = jest.fn();
      const cookieSet = jest.fn((name: unknown, val: unknown) => {
        expect(name).toStrictEqual(COOKIE.USER_PREFERENCES);
        expect(val).toStrictEqual({ language: DEFAULT_LANGUAGE });
      });
      request.universalCookies = {
        get: cookieGet,
        set: cookieSet,
      };

      const result = countryLanguageHelper.getUserLanguage(request);
      expect(result).toStrictEqual(DEFAULT_LANGUAGE);
      expect(cookieGet).toHaveBeenCalled();
      expect(cookieSet).toHaveBeenCalled();
    });
  });
});
