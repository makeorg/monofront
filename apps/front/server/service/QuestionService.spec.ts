import { QuestionApiService } from 'Shared/api/QuestionApiService';
import { ApiServiceError } from 'Shared/api/ApiService/ApiServiceError';
import { QuestionService } from './QuestionService';

const cache = require('memory-cache');

jest.mock('memory-cache');
jest.mock('fs');
jest.mock('Shared/api/QuestionApiService');
const mockLoggerLog = jest.fn();

jest.mock('Server/logger', () => ({
  getLoggerInstance: () => ({
    log: mockLoggerLog,
  }),
}));

describe('Question Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getQuestion', () => {
    it('return content from cache', async () => {
      jest.spyOn(cache, 'get');
      QuestionApiService.getDetail.mockReturnValue({
        data: { countries: ['FR'] },
      });

      cache.get.mockReturnValueOnce({
        countries: ['FR'],
        questionId: 'fooCache',
      });

      const result = await QuestionService.getQuestion('foo', 'FR');

      expect(cache.get).toHaveBeenCalledWith('QUESTION_foo');

      expect(result.questionId).toBe('fooCache');
    });

    it('return null from cache when country not match', async () => {
      jest.spyOn(cache, 'get');
      QuestionApiService.getDetail.mockReturnValue({
        data: { countries: ['FR'] },
      });

      cache.get.mockReturnValueOnce({
        countries: ['BE'],
        questionId: 'fooCache',
      });

      const result = await QuestionService.getQuestion('foo', 'FR');

      expect(cache.get).toHaveBeenCalledWith('QUESTION_foo');

      expect(result).toBe(null);
    });

    it('return content from Api and put it in cache', async () => {
      jest.spyOn(cache, 'put');

      QuestionApiService.getDetail.mockReturnValueOnce({
        data: {
          questionId: 'QuestionFoo',
          countries: ['FR'],
          operation: { questions: [] },
        },
      });

      const result = await QuestionService.getQuestion('foo', 'FR');

      expect(cache.put).toHaveBeenCalledWith(
        'QUESTION_foo',
        {
          questionId: 'QuestionFoo',
          countries: ['FR'],
          operation: { questions: [] },
        },
        300000
      );

      expect(result).toMatchObject({
        countries: ['FR'],
        operation: { questions: [] },
        questionId: 'QuestionFoo',
      });
    });

    it('throw error when fetching content from Api and log it', async () => {
      const error = new ApiServiceError(
        'error',
        500,
        undefined,
        undefined,
        undefined,
        'error-id'
      );

      QuestionApiService.getDetail.mockRejectedValue(error);

      const result = await QuestionService.getQuestion('foo');

      expect(cache.put).not.toHaveBeenCalled();
      expect(mockLoggerLog).toHaveBeenCalledWith('error', {
        message: 'error in server/service/QuestionService/getQuestion: error',
        app_logId: 'error-id',
        app_logName: 'api-service-error',
        app_status: 500,
        app_columnNumber: undefined,
        app_fileName: undefined,
        app_lineNumber: undefined,
        app_method: undefined,
        app_requestId: undefined,
        app_responseData: undefined,
        app_url: undefined,
        stack: expect.any(String),
      });

      expect(result).toBeNull();
    });
  });
});
