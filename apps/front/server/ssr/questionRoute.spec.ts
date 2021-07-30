import httpMocks from 'node-mocks-http';
import { createInitialState } from 'Shared/store/initialState';
import { isInProgress } from '@make.org/utils/helpers/date';
import { QuestionApiService } from 'Shared/api/QuestionApiService';
import { QuestionService } from '../service/QuestionService';
import { questionRoute } from './questionRoute';
import { reactRender } from '../reactRender';

jest.mock('@make.org/utils/helpers/date', () => ({
  isInProgress: jest.fn(),
}));
jest.mock('Shared/api/QuestionApiService');
jest.mock('../reactRender', () => ({ reactRender: jest.fn() }));
jest.mock('./helpers/ssr.helper', () => ({
  logError: jest.fn(),
}));
jest.mock('Shared/store/initialState', () => ({
  createInitialState: jest.fn(),
}));

const country = 'FR';
const language = 'fr';
const fooQuestion = {
  id: 'fooId',
  questionId: '1234',
  aboutUrl: 'http://localhost/goo',
  displayResults: false,
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

describe('Participate page route', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('The route', () => {
    it('construct route initial state and render', async () => {
      QuestionApiService.getDetail.mockReturnValue({ data: fooQuestion });
      createInitialState.mockReturnValue({});
      isInProgress.mockReturnValue(true);
      QuestionService.clearCache();

      await questionRoute(request, response);
      expect(reactRender).toHaveBeenCalledWith(request, response, {
        questions: {
          bar: {
            question: fooQuestion,
          },
        },
        currentQuestion: 'bar',
      });
    });
  });
});
