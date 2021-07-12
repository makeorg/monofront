import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '@make.org/utils/services/Logger';
import { env } from '@make.org/assets/env';
import { ApiServiceError } from './ApiServiceError';
import { ApiServiceShared, handleErrors } from './ApiService.shared';

jest.mock('uuid');
uuidv4.mockReturnValue('uuid-121212');

describe('ApiServiceShared', () => {
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'x-hostname': 'localhost',
    'x-make-app-name': 'main-front',
    'x-make-external-id': 'uuid-121212',
    'x-make-location': 'core',
  };

  beforeEach(() => {
    axios.mockClear();
  });

  describe('callApi', () => {
    it('with post method and headers', () => {
      const url = '/tracking/front';
      const options = { method: 'POST' };

      ApiServiceShared.callApi(url, options);
      expect(axios).toHaveBeenNthCalledWith(1, env.apiUrl() + url, {
        data: undefined,
        headers,
        method: 'POST',
        params: undefined,
        withCredentials: true,
        httpsAgent: undefined,
      });
    });

    it('with get method and headers', () => {
      const url = '/tracking/front';
      const options = { method: 'GET', params: { value: 'value' } };

      ApiServiceShared.callApi(url, options);
      expect(axios).toHaveBeenNthCalledWith(1, env.apiUrl() + url, {
        data: undefined,
        params: { value: 'value' },
        headers,
        method: 'GET',
        withCredentials: true,
      });
    });

    it('with override headers', () => {
      const url = '/tracking/front';
      const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      };

      ApiServiceShared.callApi(url, options);
      expect(axios).toHaveBeenNthCalledWith(1, env.apiUrl() + url, {
        data: undefined,
        headers: {
          ...headers,
          ...options.headers,
        },
        method: 'GET',
        withCredentials: true,
      });
    });

    it('must return data', async () => {
      const result = { data: 'success' };
      axios.mockResolvedValue(result);
      const response = await ApiServiceShared.callApi('/url');
      expect(response).toBe(result);
    });

    it('must handle promise', async () => {
      axios.mockRejectedValue({ message: 'error' });
      await expect(ApiServiceShared.callApi('/url')).rejects.toThrow(
        expect.objectContaining({
          name: 'api-service-error',
          message: 'error',
          logged: true,
        })
      );
    });
  });

  describe('handleErrors', () => {
    it('default status', () => {
      const error = {
        message: 'error',
        response: {
          status: 200,
        },
        request: {},
      };
      expect(() => handleErrors(error)).toThrow(
        expect.objectContaining({
          name: 'api-service-error',
          message: 'error',
          status: 200,
          logged: false,
        })
      );
    });

    it('status 400', () => {
      const error = {
        message: 'test',
        response: {
          status: 400,
          data: 'error 400',
        },
        request: {},
      };
      expect(() => handleErrors(error, 'http://test', 'GET')).toThrow(
        expect.objectContaining({
          name: 'api-service-error',
          message: 'test',
          status: 400,
          data: 'error 400',
          logged: false,
        })
      );
    });

    it('status 500', () => {
      jest.spyOn(Logger, 'logError');
      const error = {
        message: 'error message',
        response: {
          data: 'error data',
          status: 500,
          config: {
            url: 'https://example.com',
            method: 'GET',
          },
          headers: {
            'x-headers': 'foo',
          },
        },
      };

      expect(() => handleErrors(error, null, 'GET')).toThrow(
        expect.objectContaining({
          name: 'api-service-error',
          message: 'error message',
          status: 500,
          data: 'error data',
          url: 'https://example.com',
          method: 'GET',
          logged: true,
        })
      );
      expect(Logger.logError).toHaveBeenNthCalledWith(
        1,
        new ApiServiceError(
          `API call error - server error - ${error.message}`,
          500,
          'error data',
          'none',
          'GET',
          'error-id',
          false
        )
      );
    });
  });
});
