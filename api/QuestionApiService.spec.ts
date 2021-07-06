import { ApiService } from 'Shared/api/ApiService';
import {
  QuestionApiService,
  PATH_QUESTION_KEYWORDS,
} from './QuestionApiService';

jest.mock('./ApiService');

describe('QuestionApiService', () => {
  beforeEach(() => {
    ApiService.callApi.mockClear();
    jest.spyOn(ApiService, 'callApi');
  });

  const questionId = 'foo';
  const limit = 5;

  describe('getKeywords', () => {
    it('must call ApiService.callApi', async () => {
      await QuestionApiService.getKeywords(questionId, limit);
      expect(ApiService.callApi).toHaveBeenNthCalledWith(
        1,
        PATH_QUESTION_KEYWORDS.replace(':questionId', 'foo'),
        {
          headers: {},
          method: 'GET',
          params: {
            limit: 5,
          },
        }
      );
    });
  });
});
