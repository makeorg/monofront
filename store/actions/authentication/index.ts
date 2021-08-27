import i18n from 'i18next';
import {
  ErrorObjectType,
  UserType,
  ReducerAction,
  Dispatch,
  OrganisationProfileType,
  PersonalityProfileType,
  UserProfileType,
} from '@make.org/types';
import {
  trackLoginEmailSuccess,
  trackLoginEmailFailure,
  trackAuthenticationSocialSuccess,
  trackAuthenticationSocialFailure,
} from '@make.org/utils/services/Tracking';
import { Logger } from '@make.org/utils/services/Logger';
import { UserService } from '@make.org/utils/services/User';
import { NOTIF } from '@make.org/types/enums';

import { modalClose } from '../modal';
import * as actionTypes from '../../actionTypes';
import { displayNotificationBanner } from '../notifications';
import { clearSessionId } from '../session';

export const loginRequest = (): ReducerAction => ({
  type: actionTypes.LOGIN_REQUEST,
});
export const loginFailure = (error: ErrorObjectType): ReducerAction => ({
  type: actionTypes.LOGIN_FAILURE,
  error,
});
export const loginSuccess = (): ReducerAction => ({
  type: actionTypes.LOGIN_SUCCESS,
});
export const loginSocialRequest = (provider: string): ReducerAction => ({
  type: actionTypes.LOGIN_SOCIAL_REQUEST,
  provider,
});
export const loginSocialFailure = (): ReducerAction => ({
  type: actionTypes.LOGIN_SOCIAL_FAILURE,
});
export const loginSocialSuccess = (): ReducerAction => ({
  type: actionTypes.LOGIN_SOCIAL_SUCCESS,
});
export const setUserInfo = (
  user: UserType,
  profile:
    | UserProfileType
    | OrganisationProfileType
    | PersonalityProfileType
    | null
): ReducerAction => ({
  type: actionTypes.GET_INFO,
  user: {
    ...user,
    profile,
  },
});

export const logoutSuccess = (): ReducerAction => ({
  type: actionTypes.LOGOUT,
});

export const getUser = async (
  dispatch: Dispatch,
  isModalOpen?: boolean,
  afterRegistration?: boolean
): Promise<void | null> => {
  const user = await UserService.current();
  if (!user) {
    return dispatch(
      displayNotificationBanner(
        NOTIF.UNEXPECTED_ERROR_MESSAGE,
        NOTIF.NOTIFICATION_LEVEL_ERROR
      )
    );
  }

  const profile:
    | UserProfileType
    | OrganisationProfileType
    | PersonalityProfileType
    | null = user
    ? await UserService.getProfileByUserType(user.userId, user.userType)
    : null;
  if (profile && 'firstName' in profile) {
    dispatch(setUserInfo(user, profile));
  }
  if (isModalOpen) {
    dispatch(modalClose());
  }
  if (afterRegistration && user.emailVerified) {
    return dispatch(
      displayNotificationBanner(
        NOTIF.REGISTER_SUCCESS_MESSAGE,
        NOTIF.NOTIFICATION_LEVEL_SUCCESS
      )
    );
  }

  if (afterRegistration) {
    return dispatch(
      displayNotificationBanner(
        NOTIF.REGISTER_SUCCESS_VALIDATE_MESSAGE,
        NOTIF.NOTIFICATION_LEVEL_ALERT,
        { email: user.email }
      )
    );
  }
  return null;
};

export const login = (
  email: string,
  password: string,
  approvePrivacyPolicy: boolean,
  dispatch: Dispatch
): Promise<void> => {
  dispatch(loginRequest());
  const success = (): void => {
    dispatch(loginSuccess());
    trackLoginEmailSuccess();
    getUser(dispatch, true);
    dispatch(
      displayNotificationBanner(
        NOTIF.LOGIN_SUCCESS_MESSAGE,
        NOTIF.NOTIFICATION_LEVEL_SUCCESS
      )
    );
  };
  const errors = (): void => {
    dispatch(
      loginFailure({
        field: 'email',
        key: 'email_doesnot_exist',
        message: i18n.t('login.email_doesnot_exist', {
          emailLabel: `<label for="email">${i18n.t(
            'common.form.label.email'
          )}</label>`,
          passwordLabel: `<label for="password">${i18n.t(
            'common.form.label.password'
          )}</label>`,
        }),
      })
    );
    trackLoginEmailFailure();
  };

  return UserService.login(
    email,
    password,
    approvePrivacyPolicy,
    () => success(),
    () => errors()
  );
};

export const loginSocial = async (
  provider: string,
  socialToken: string,
  approvePrivacyPolicy: boolean,
  dispatch: Dispatch
): Promise<void> => {
  dispatch(loginSocialRequest(provider));
  if (!socialToken) {
    dispatch(loginSocialFailure());
    trackAuthenticationSocialFailure(provider);
    Logger.logInfo({
      message: `No token from ${provider} callBack auth`,
      name: 'social-auth',
    });

    return Promise.resolve();
  }

  const success = () => {
    dispatch(loginSocialSuccess());
    getUser(dispatch, true);
    dispatch(
      displayNotificationBanner(
        NOTIF.LOGIN_SUCCESS_MESSAGE,
        NOTIF.NOTIFICATION_LEVEL_SUCCESS
      )
    );
  };
  const failure = () => {
    dispatch(loginSocialFailure());
    trackAuthenticationSocialFailure(provider);
  };

  return UserService.loginSocial(
    provider,
    socialToken,
    approvePrivacyPolicy,
    () => success(),
    () => failure()
  ).then(auth => {
    if (auth) {
      trackAuthenticationSocialSuccess(
        provider,
        auth.account_creation.toString()
      );
    }
  });
};

export const logout = (
  dispatch: Dispatch,
  afterAccountDeletion?: boolean
): Promise<void | null> => {
  const success = () => {
    dispatch(clearSessionId());
    dispatch(logoutSuccess());
    if (afterAccountDeletion) {
      return dispatch(
        displayNotificationBanner(
          NOTIF.ACCOUNT_DELETION_SUCCESS_MESSAGE,
          NOTIF.NOTIFICATION_LEVEL_SUCCESS
        )
      );
    }
    return dispatch(
      displayNotificationBanner(
        NOTIF.LOGOUT_SUCCESS_MESSAGE,
        NOTIF.NOTIFICATION_LEVEL_SUCCESS
      )
    );
  };
  if (afterAccountDeletion) {
    return Promise.resolve(success());
  }

  return UserService.logout(success);
};
