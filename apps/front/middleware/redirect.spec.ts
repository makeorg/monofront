import { QuestionType } from '@make.org/types';
import httpMocks from 'node-mocks-http';
import { QuestionService } from '../server/service/QuestionService';
import { redirectToCountryMiddleware } from './redirect';

const defaultQuestion = {
  countries: ['FR'],
};

afterEach(() => {
  jest.restoreAllMocks();
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
const logger = { logError: () => {} };
jest.mock('@make.org/utils/helpers/logger', () => ({
  getLoggerInstance: () => logger,
}));

const spy = jest.spyOn(QuestionService, 'getQuestion');
spy.mockResolvedValue(defaultQuestion as QuestionType);

describe('Redirect to country middelware', () => {
  describe('redirectToCountryMiddleware function', () => {
    it('redirect url to country + query params if question is avaliable in my country', async () => {
      const request = httpMocks.createRequest({
        params: { questionSlug: 'foo-bar' },
        headers: { 'x-detected-country': 'FR' },
        url: '/foo-bar',
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'redirect');

      await redirectToCountryMiddleware(request, response);

      expect(response.redirect).toHaveBeenCalledWith('/FR/foo-bar');
    });

    it('redirect to country homepage if country is not avaliable in my country', async () => {
      const request = httpMocks.createRequest({
        params: { questionSlug: 'foo-bar' },
        headers: { 'x-detected-country': 'DE' },
        url: '/foo-bar',
      });
      const response = httpMocks.createResponse();
      jest.spyOn(response, 'redirect');

      await redirectToCountryMiddleware(request, response);

      expect(response.redirect).toHaveBeenCalledWith('/DE');
    });
  });
});
