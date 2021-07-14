import React from 'react';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { GOOGLE_PROVIDER_ENUM } from '@make.org/api/UserApiService';
import { GOOGLE_LOGIN_ID } from '@make.org/utils/constants/config';
import { SvgGoogleLogoG } from '@make.org/ui/Svg/elements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { UserService } from '@make.org/utils/services/User';
import {
  modalClose,
  modalShowDataPolicySocial,
} from '@make.org/store/actions/modal';
import { trackAuthenticationSocialFailure } from '@make.org/utils/services/Tracking';

import {
  loginSocialSuccess,
  getUser,
} from '@make.org/store/actions/authentication';
import { Logger } from '@make.org/utils/services/Logger';
import { displayNotificationBanner } from '@make.org/store/actions/notifications';
import {
  NOTIFICATION_LEVEL_ALERT,
  UNEXPECTED_ERROR_MESSAGE,
} from '@make.org/utils/constants/notifications';
import { GoogleButtonStyle } from './style';
import { useAppContext } from '../../../store';
/**
 * Handles Google authentication
 */
export const GoogleAuthentication: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { privacyPolicy } = state.appConfig || {};

  /** Google login method callback */
  const handleGoogleLoginSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const success = () => {
      dispatch(loginSocialSuccess());
      dispatch(getUser());
    };

    const handleErrors = () => {
      trackAuthenticationSocialFailure();
    };
    const unexpectedError = () => dispatch(modalClose());
    let accessToken = '';
    if ('accessToken' in response) {
      accessToken = response.accessToken;
    }

    UserService.checkSocialPrivacyPolicy(
      GOOGLE_PROVIDER_ENUM,
      accessToken,
      privacyPolicy,
      () => {
        dispatch(modalShowDataPolicySocial(GOOGLE_PROVIDER_ENUM, accessToken));
      },
      success,
      handleErrors,
      unexpectedError
    );
  };

  const handleGoogleLoginFailure = (response: any) => {
    if (response?.error === 'popup_closed_by_user') {
      Logger.logInfo('Google auth popup closed by user');

      return;
    }

    Logger.logError(`Google login failure: ${response?.error}`);
    dispatch(
      displayNotificationBanner(
        UNEXPECTED_ERROR_MESSAGE,
        NOTIFICATION_LEVEL_ALERT
      )
    );
    dispatch(modalClose());
  };

  return (
    <GoogleLogin
      clientId={GOOGLE_LOGIN_ID}
      scope="https://www.googleapis.com/auth/user.birthday.read"
      buttonText="Google"
      onSuccess={handleGoogleLoginSuccess}
      onFailure={handleGoogleLoginFailure}
      render={renderProps => (
        <GoogleButtonStyle onClick={renderProps.onClick} type="button">
          <SvgGoogleLogoG aria-hidden focusable="false" />
          <ScreenReaderItemStyle>Google</ScreenReaderItemStyle>
        </GoogleButtonStyle>
      )}
    />
  );
};
