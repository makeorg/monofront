import httpMocks from 'node-mocks-http';
import { QuestionApiService } from 'Shared/api/QuestionApiService';
import { UserApiService } from 'Shared/api/UserApiService';
import { HTTP_NO_CONTENT, HTTP_NOT_FOUND } from 'Shared/constants/httpStatus';
import { createInitialState } from 'Shared/store/initialState';
import {
  NOTIFICATION_LEVEL_ERROR,
  PASSWORD_RECOVERY_FAILURE_MESSAGE,
} from 'Shared/constants/notifications';
import { reactRender } from '../reactRender';
import { passwordRecoveryRoute } from './passwordRecoveryRoute';

jest.mock('../reactRender', () => ({ reactRender: jest.fn() }));
jest.mock('Shared/api/UserApiService');
jest.mock('Shared/api/QuestionApiService');

const initialState = createInitialState();
const fooQuestion = {
  id: 'foo',
  slug: 'bar',
  countries: ['FR'],
  operation: { questions: [] },
};
const queryParams = { question: fooQuestion.id };
const requestParams = {
  resetToken: 'bar',
  userId: 'foo',
  country: 'FR',
  language: 'fr',
};
const expectedHeaders = {
  'x-make-question-id': fooQuestion.id,
  'x-make-country': 'FR',
  'x-make-language': 'fr',
};

describe('Account activation route', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('add the question to the initialState and set headers', async () => {
    QuestionApiService.getDetail.mockReturnValue({ data: fooQuestion });
    UserApiService.resetPasswordTokenCheck.mockRejectedValue({ status: 400 });
    const routeState = {
      ...initialState,
      user: {
        ...initialState.user,
        passwordRecovery: {
          validToken: false,
          resetToken: requestParams.resetToken,
          userId: requestParams.userId,
        },
      },
      questions: {
        [fooQuestion.slug]: {
          question: fooQuestion,
        },
      },
      currentQuestion: fooQuestion.slug,
      notifications: {
        banner: {
          contentId: PASSWORD_RECOVERY_FAILURE_MESSAGE,
          level: NOTIFICATION_LEVEL_ERROR,
        },
        tip: {},
        dismissed: [],
      },
    };

    const request = httpMocks.createRequest({
      params: requestParams,
      query: queryParams,
    });
    const response = httpMocks.createResponse();

    await passwordRecoveryRoute(request, response, () => {});

    expect(QuestionApiService.getDetail).toHaveBeenCalledWith(
      fooQuestion.id,
      expectedHeaders
    );
    expect(reactRender).toHaveBeenCalledWith(request, response, routeState);
  });

  it('activate successfully and add success notification to state', async () => {
    UserApiService.resetPasswordTokenCheck.mockReturnValue(HTTP_NO_CONTENT);
    QuestionApiService.getDetail.mockReturnValue({ data: fooQuestion });

    const request = httpMocks.createRequest({
      params: requestParams,
      query: queryParams,
    });
    const response = httpMocks.createResponse();
    const routeState = {
      ...initialState,
      user: {
        ...initialState.user,
        passwordRecovery: {
          validToken: true,
          resetToken: requestParams.resetToken,
          userId: requestParams.userId,
        },
      },
      questions: {
        [fooQuestion.slug]: {
          question: fooQuestion,
        },
      },
      currentQuestion: fooQuestion.slug,
    };

    await passwordRecoveryRoute(request, response, () => {});

    expect(UserApiService.resetPasswordTokenCheck).toHaveBeenCalledWith(
      requestParams.userId,
      requestParams.resetToken,
      expectedHeaders
    );
    expect(reactRender).toHaveBeenCalledWith(request, response, routeState);
  });

  it('activate fail and add fail notification to state', async () => {
    UserApiService.resetPasswordTokenCheck.mockRejectedValue(HTTP_NOT_FOUND);
    QuestionApiService.getDetail.mockReturnValue({ data: fooQuestion });

    const request = httpMocks.createRequest({
      params: requestParams,
      query: queryParams,
    });
    const response = httpMocks.createResponse();
    const routeState = {
      ...initialState,
      user: {
        ...initialState.user,
        passwordRecovery: {
          validToken: false,
          resetToken: requestParams.resetToken,
          userId: requestParams.userId,
        },
      },
      notifications: {
        banner: {
          contentId: PASSWORD_RECOVERY_FAILURE_MESSAGE,
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

    await passwordRecoveryRoute(request, response, () => {});
    expect(UserApiService.resetPasswordTokenCheck).toHaveBeenCalledWith(
      requestParams.userId,
      requestParams.resetToken,
      expectedHeaders
    );
    expect(reactRender).toHaveBeenCalledWith(request, response, routeState);
  });
});
