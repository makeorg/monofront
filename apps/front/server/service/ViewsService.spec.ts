import { ViewsApiService } from 'Shared/api/ViewsApiService';
import { ApiServiceError } from 'Shared/api/ApiService/ApiServiceError';
import homepageFixture from '../../apiMocks/db/views.json';
import { ViewsService } from './ViewsService';

const cache = require('memory-cache');

jest.mock('memory-cache');
jest.mock('fs');
jest.mock('Shared/api/ViewsApiService');
const mockLoggerLog = jest.fn();

jest.mock('Server/logger', () => ({
  getLoggerInstance: () => ({
    log: mockLoggerLog,
  }),
}));

const country = 'FR';

describe('Views Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getHome', () => {
    it('return content from cache', async () => {
      jest.spyOn(cache, 'get');

      cache.get.mockReturnValueOnce('fooCache');

      const result = await ViewsService.getHome(country);

      expect(cache.get).toHaveBeenCalledWith('HOMEPAGE_FR');

      expect(result).toBe('fooCache');
    });

    it('return content from Api and put it in cache', async () => {
      jest.spyOn(cache, 'put');

      ViewsApiService.getHome.mockReturnValueOnce({
        data: homepageFixture.home,
      });

      const result = await ViewsService.getHome(country);

      expect(cache.put).toHaveBeenCalledWith(
        'HOMEPAGE_FR',
        homepageFixture.home,
        300000
      );

      expect(result).toMatchObject(homepageFixture.home);
    });

    it('throw error when fetching content from Api and log it', async () => {
      const error = new ApiServiceError(
        'error',
        500,
        undefined,
        undefined,
        undefined,
        '123-123'
      );

      ViewsApiService.getHome.mockRejectedValue(error);

      const result = await ViewsService.getHome(homepageFixture);

      expect(cache.put).not.toHaveBeenCalled();
      expect(mockLoggerLog).toHaveBeenCalledWith('error', {
        app_logName: 'api-service-error',
        message: 'error in server/service/ViewsService/getHome: error',
        app_logId: '123-123',
        app_status: 500,
        app_columnNumber: undefined,
        app_fileName: undefined,
        app_lineNumber: undefined,
        app_method: undefined,
        app_responseData: undefined,
        app_url: undefined,
        stack: expect.any(String),
      });

      expect(result).toBeNull();
    });
  });
});
