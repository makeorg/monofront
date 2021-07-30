import httpMocks from 'node-mocks-http';
import { QuestionApiService } from 'Shared/api/QuestionApiService';
import { UserApiService } from 'Shared/api/UserApiService';
import {
  HTTP_NO_CONTENT,
  HTTP_NOT_FOUND,
} from '@make.org/utils/constants/httpStatus';
import { createInitialState } from 'Shared/store/initialState';
import {
  NOTIFICATION_LEVEL_SUCCESS,
  NOTIFICATION_LEVEL_ERROR,
  ACTIVATION_SUCCESS_MESSAGE,
  ACTIVATION_FAILURE_MESSAGE,
} from '@make.org/utils/constants/notifications';
import { reactRender } from '../reactRender';
import { accountActivationRoute } from './accountActivationRoute';

jest.mock('../reactRender', () => ({ reactRender: jest.fn() }));
jest.mock('Shared/api/UserApiService');
jest.mock('Shared/api/QuestionApiService');

const initialState = createInitialState();
const requestParams = {
  verificationToken: 'bar',
  userId: 'foo',
  country: 'FR',
  language: 'fr',
};
const expectedHeaders = {
  'x-make-question-id': 'foo',
  'x-make-country': 'FR',
  'x-make-language': 'fr',
};

const fooQuestion = {
  id: 'foo',
  slug: 'bar',
  countries: ['FR'],
  operation: { questions: [] },
};

describe('Account activation route', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('add the question to the initialState and set headers', async () => {
    QuestionApiService.getDetail.mockReturnValue({ data: fooQuestion });

    const routeState = {
      ...initialState,
      questions: {
        [fooQuestion.slug]: {
          question: fooQuestion,
        },
      },
      currentQuestion: fooQuestion.slug,
      notifications: {
        banner: {
          contentId: ACTIVATION_SUCCESS_MESSAGE,
          level: NOTIFICATION_LEVEL_SUCCESS,
        },
        tip: {},
        dismissed: [],
      },
    };

    const request = httpMocks.createRequest({
      params: requestParams,
      query: { question: fooQuestion.id },
    });
    const response = httpMocks.createResponse();
    await accountActivationRoute(request, response, () => {});
    expect(QuestionApiService.getDetail).toHaveBeenCalledWith(
      fooQuestion.id,
      expectedHeaders
    );
    expect(reactRender).toHaveBeenCalledWith(request, response, routeState);
  });

  it('activate successfully and add success notification to state', async () => {
    UserApiService.verifyUser.mockReturnValue(HTTP_NO_CONTENT);
    QuestionApiService.getDetail.mockReturnValue({ id: fooQuestion.id });

    const request = httpMocks.createRequest({
      params: requestParams,
      query: {
        question: fooQuestion.id,
      },
    });
    const response = httpMocks.createResponse();
    const routeState = {
      ...initialState,
      notifications: {
        banner: {
          contentId: ACTIVATION_SUCCESS_MESSAGE,
          level: NOTIFICATION_LEVEL_SUCCESS,
        },
        tip: {},
        dismissed: [],
      },
      questions: {
        [fooQuestion.slug]: {
          question: fooQuestion,
        },
      },
      currentQuestion: fooQuestion.slug,
    };
    await accountActivationRoute(request, response, () => {});
    expect(UserApiService.verifyUser).toHaveBeenCalledWith(
      'foo',
      'bar',
      expectedHeaders
    );
    expect(reactRender).toHaveBeenCalledWith(request, response, routeState);
  });

  it('activate fail and add fail notification to state', async () => {
    UserApiService.verifyUser.mockRejectedValue(HTTP_NOT_FOUND);
    QuestionApiService.getDetail.mockReturnValue({
      data: { id: fooQuestion.id },
    });

    const request = httpMocks.createRequest({
      params: requestParams,
      query: {
        question: fooQuestion.id,
      },
    });
    const response = httpMocks.createResponse();
    const routeState = {
      ...initialState,
      notifications: {
        banner: {
          contentId: ACTIVATION_FAILURE_MESSAGE,
          level: NOTIFICATION_LEVEL_ERROR,
        },
        tip: {},
        dismissed: [],
      },
      questions: {
        [fooQuestion.slug]: {
          question: fooQuestion,
        },
      },
      currentQuestion: fooQuestion.slug,
    };

    await accountActivationRoute(request, response, () => {});
    expect(UserApiService.verifyUser).toHaveBeenCalledWith(
      'foo',
      'bar',
      expectedHeaders
    );
    expect(reactRender).toHaveBeenCalledWith(request, response, routeState);
  });
});
