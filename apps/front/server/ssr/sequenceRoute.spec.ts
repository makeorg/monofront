import httpMocks from 'node-mocks-http';
import { createInitialState } from '@make.org/store/initialState';
import { isInProgress } from '@make.org/utils/helpers/date';
import { QuestionApiService } from 'Shared/api/QuestionApiService';
import { sequenceRoute } from './sequenceRoute';
import { reactRender } from '../reactRender';

jest.mock('@make.org/utils/helpers/date', () => ({
  isInProgress: jest.fn(),
}));

jest.mock('Shared/api/QuestionApiService');
jest.mock('../reactRender', () => ({ reactRender: jest.fn() }));
jest.mock('./helpers/ssr.helper', () => ({
  logError: jest.fn(),
}));
jest.mock('@make.org/store/initialState', () => ({
  createInitialState: jest.fn(),
}));

const country = 'FR';
const language = 'fr';
const fooQuestion = {
  id: 'fooId',
  questionId: '1234',
  aboutUrl: 'http://localhost/goo',
  sequenceConfig: {},
  countries: ['FR'],
  operation: { questions: [] },
};
const questionSlug = 'bar';

const request = httpMocks.createRequest({
  params: {
    country,
    language,
    questionSlug,
  },
});
const response = httpMocks.createResponse();

describe('Sequence page route', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('The route', () => {
    it('construct route initial state and render', async () => {
      QuestionApiService.getDetail.mockReturnValue({ data: fooQuestion });
      createInitialState.mockReturnValue({});
      isInProgress.mockReturnValue(true);

      await sequenceRoute(request, response);
      expect(reactRender).toHaveBeenCalledWith(request, response, {
        questions: {
          bar: {
            question: { ...fooQuestion, countries: ['FR'] },
          },
        },
        currentQuestion: 'bar',
      });
    });

    it('redirect to about url if consultation is closed', async () => {
      isInProgress.mockReturnValue(false);
      QuestionApiService.getDetail.mockReturnValue({ data: fooQuestion });
      jest.spyOn(response, 'redirect');

      await sequenceRoute(request, response);

      expect(response.redirect).toHaveBeenCalledWith('http://localhost/goo');
      expect(response.statusCode).toBe(302);
    });
  });
});
