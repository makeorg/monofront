import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { UserApiService } from '@make.org/api/UserApiService';
import * as Tracking from '@make.org/utils/services/Tracking';
import {
  LOGIN_SUCCESS_MESSAGE,
  LOGOUT_SUCCESS_MESSAGE,
  NOTIFICATION_LEVEL_ALERT,
  NOTIFICATION_LEVEL_SUCCESS,
  REGISTER_SUCCESS_VALIDATE_MESSAGE,
} from '@make.org/utils/constants/notifications';
import * as actionTypes from '../../actionTypes';
import * as actions from './index';

// mocks
jest.mock('Shared/api/UserApiService');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
const wait = () => new Promise((resolve) => setTimeout(resolve, 10));

describe('Authentication Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('Login Actions', () => {
    it('creates an action loginRequest', () => {
      const expectedAction = {
        type: actionTypes.LOGIN_REQUEST,
      };

      expect(actions.loginRequest()).toEqual(expectedAction);
    });

    it('Creates an action loginFailure', () => {
      const error = 'fooError';
      const expectedAction = {
        type: actionTypes.LOGIN_FAILURE,
        error,
      };

      expect(actions.loginFailure(error)).toEqual(expectedAction);
    });

    it('creates an action loginSuccess', () => {
      const expectedAction = {
        type: actionTypes.LOGIN_SUCCESS,
      };

      expect(actions.loginSuccess()).toEqual(expectedAction);
    });

    it('creates an action to login when success', () => {
      const user = { email: 'baz@make.org', password: 'foo' };
      const profile = { avatarUrl: 'https://example.com' };
      const userWithProfile = { ...user, profile };

      const newStore = mockStore({
        proposal: { canSubmit: false },
        modal: { isModalClose: false },
        authentication: { isLoggedIn: false },
      });

      // mocks
      UserApiService.current.mockResolvedValue({ data: user });
      UserApiService.getProfile.mockResolvedValue({ data: profile });
      UserApiService.login.mockResolvedValue();

      // spy
      jest.spyOn(Tracking, 'trackLoginEmailSuccess');

      const expectedActions = [
        { type: actionTypes.LOGIN_REQUEST },
        { type: actionTypes.LOGIN_SUCCESS },
        {
          type: actionTypes.DISPLAY_NOTIFICATION_BANNER,
          payload: {
            contentId: LOGIN_SUCCESS_MESSAGE,
          },
        },
        { type: actionTypes.GET_INFO, user: userWithProfile },
      ];

      newStore.dispatch(actions.login(user.email, user.password));
      return wait().then(() => {
        expect(Tracking.trackLoginEmailSuccess).toHaveBeenCalled();
        expect(newStore.getActions()).toMatchObject(expectedActions);
      });
    });

    it('creates an action to login when failure', () => {
      const user = { email: 'baz@make.org', password: 'foo' };

      const error = {
        field: 'email',
        key: 'email_doesnot_exist',
        message: 'login.email_doesnot_exist',
      };
      const proposalContent = 'foo';
      const questionId = 'bar';
      const newStore = mockStore({
        proposal: { content: proposalContent },
        sequence: { question: { questionId } },
      });

      UserApiService.login.mockRejectedValue({ status: 400 });

      // spy
      jest.spyOn(Tracking, 'trackLoginEmailFailure');

      const expectedActions = [
        { type: actionTypes.LOGIN_REQUEST },
        { type: actionTypes.LOGIN_FAILURE, error },
      ];

      newStore.dispatch(actions.login(user.email, user.password));
      return wait().then(() => {
        expect(Tracking.trackLoginEmailFailure).toHaveBeenCalled();
        expect(newStore.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('login Social Actions', () => {
    it('creates an action loginSocialRequest', () => {
      const provider = 'fooProvider';
      const expectedAction = {
        type: actionTypes.LOGIN_SOCIAL_REQUEST,
        provider,
      };

      expect(actions.loginSocialRequest(provider)).toEqual(expectedAction);
    });

    it('creates an action loginSocialFailure', () => {
      const expectedAction = {
        type: actionTypes.LOGIN_SOCIAL_FAILURE,
      };

      expect(actions.loginSocialFailure()).toEqual(expectedAction);
    });

    it('creates an action loginSocialSuccess', () => {
      const expectedAction = {
        type: actionTypes.LOGIN_SOCIAL_SUCCESS,
      };

      expect(actions.loginSocialSuccess()).toEqual(expectedAction);
    });

    it('creates an action to login social when success', () => {
      const loginStore = mockStore({
        proposal: { canSubmit: false },
        authentication: { isLoggedIn: false },
        notifications: { level: undefined, contentId: undefined },
        modal: { isOpen: true },
      });
      const user = { firstname: 'baz' };
      const successAuth = {
        token_type: 'Bearer',
        access_token: '265f29cb-cc2e-444e-8590-cfe4ff652a0a',
        expires_in: 299,
        refresh_token: '815dfeec-f3e6-4085-b020-c27d7ea4e1aa',
        account_creation: 'false',
      };
      const provider = 'fooProvider';
      const socialToken = 'fooToken';

      // mock
      UserApiService.loginSocial.mockResolvedValue({ data: successAuth });

      // spy
      jest.spyOn(Tracking, 'trackAuthenticationSocialSuccess');

      const expectedActions = [
        { type: actionTypes.LOGIN_SOCIAL_REQUEST, provider },
        { type: actionTypes.LOGIN_SOCIAL_SUCCESS },
        { type: actionTypes.GET_INFO, user },
        { type: actionTypes.MODAL_CLOSE },
      ];

      return loginStore
        .dispatch(actions.loginSocial(provider, socialToken))
        .then(() => {
          wait().then(() => {
            expect(
              Tracking.trackAuthenticationSocialSuccess
            ).toHaveBeenCalledWith(provider, successAuth.account_creation);
            expect(loginStore.getActions()).toEqual(expectedActions);
          });
        });
    });

    it('creates an action to login social when failure', () => {
      const proposalContent = 'foo';
      const questionId = 'bar';
      const newStore = mockStore({
        proposal: { content: proposalContent },
        sequence: { question: { questionId } },
      });
      const socialToken = 'fooToken';
      const provider = 'barProvider';

      UserApiService.loginSocial.mockRejectedValue();

      // spy
      jest.spyOn(Tracking, 'trackAuthenticationSocialFailure');

      const expectedActions = [
        { type: actionTypes.LOGIN_SOCIAL_REQUEST, provider },
        { type: actionTypes.LOGIN_SOCIAL_FAILURE },
      ];

      return newStore
        .dispatch(actions.loginSocial(provider, socialToken))
        .then(() => {
          expect(Tracking.trackAuthenticationSocialFailure).toHaveBeenCalled();
          expect(newStore.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('user info and logout Actions', () => {
    it('creates an action to get user informations', () => {
      const user = {
        firstname: 'foo',
        lastname: 'bar',
      };
      const expectedAction = {
        type: actionTypes.GET_INFO,
        user,
      };
      expect(actions.setUserInfo(user)).toEqual(expectedAction);
    });

    it('creates an action to logout a user', () => {
      const newStore = mockStore({
        user: { authentication: {} },
      });

      const expectedActions = [
        {
          type: actionTypes.SET_SESSION_ID,
          payload: {
            sessionId: '',
          },
        },
        { type: actionTypes.LOGOUT },
        {
          type: actionTypes.DISPLAY_NOTIFICATION_BANNER,
          payload: {
            contentId: LOGOUT_SUCCESS_MESSAGE,
            level: NOTIFICATION_LEVEL_SUCCESS,
          },
        },
      ];

      UserApiService.logout.mockResolvedValue();

      return newStore.dispatch(actions.logout()).then(() => {
        expect(newStore.getActions()).toEqual(expectedActions);
      });
    });

    it('creates an action to logout a user successfully', () => {
      const expectedAction = {
        type: actionTypes.LOGOUT,
      };

      expect(actions.logoutSuccess()).toEqual(expectedAction);
    });

    it('creates an action to getUser when modal is open', () => {
      const user = { firstname: 'baz' };
      const profile = { avatarUrl: 'https://example.com' };
      const userWithProfile = { ...user, profile };
      const newStore = mockStore({
        modal: { isOpen: true },
      });

      // mock
      UserApiService.current.mockResolvedValue({ data: user });
      UserApiService.getProfile.mockResolvedValue({ data: profile });

      const expectedActions = [
        { type: actionTypes.GET_INFO, user: userWithProfile },
        { type: actionTypes.MODAL_CLOSE },
      ];

      return newStore.dispatch(actions.getUser()).then(() => {
        expect(newStore.getActions()).toMatchObject(expectedActions);
      });
    });

    it('creates an action to getUser when modal is closed', () => {
      const user = { firstname: 'baz' };
      const profile = { avatarUrl: 'https://example.com' };
      const userWithProfile = { ...user, profile };
      const newStore = mockStore({
        modal: { isOpen: false },
      });

      // mock
      UserApiService.current.mockResolvedValue({ data: user });
      UserApiService.getProfile.mockResolvedValue({ data: profile });

      const expectedActions = [
        { type: actionTypes.GET_INFO, user: userWithProfile },
      ];

      return newStore.dispatch(actions.getUser()).then(() => {
        expect(newStore.getActions()).toEqual(expectedActions);
      });
    });

    it('creates an action to getUser after registration', () => {
      const user = { firstname: 'baz', email: 'baz@exemple.com' };
      const profile = { avatarUrl: 'https://example.com' };
      const userWithProfile = { ...user, profile };
      const newStore = mockStore({
        modal: { isOpen: true },
      });

      // mock
      UserApiService.current.mockResolvedValue({ data: user });
      UserApiService.getProfile.mockResolvedValue({ data: profile });

      const expectedActions = [
        { type: actionTypes.GET_INFO, user: userWithProfile },
        { type: actionTypes.MODAL_CLOSE },
        {
          type: actionTypes.DISPLAY_NOTIFICATION_BANNER,
          payload: {
            contentId: REGISTER_SUCCESS_VALIDATE_MESSAGE,
            level: NOTIFICATION_LEVEL_ALERT,
            params: { email: 'baz@exemple.com' },
          },
        },
      ];

      return newStore.dispatch(actions.getUser(true)).then(() => {
        expect(newStore.getActions()).toEqual(expectedActions);
      });
    });
  });
});
