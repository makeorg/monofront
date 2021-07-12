import React, { useState, useEffect } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FACEBOOK_PROVIDER_ENUM } from '@make.org/api/UserApiService';
import { SvgFacebookLogoF } from '@make.org/ui/Svg/elements';
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
import { useAppContext } from '@make.org/store';
import { FacebookButtonStyle } from './style';

/**
 * Handles Facebook authentication
 */

export const FacebookAuthentication: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { privacyPolicy, language } = state.appConfig;

  // setting facebook browser to true or false
  const [isFacebookBrowser, setFacebookBrowser] = useState(false);
  const handleFacebookLoginCallback = (response) => {
    if (!response?.accessToken && response?.status === 'unknown') {
      Logger.logInfo(
        'Facebook auth failed with status unknown. Probably user close popup.'
      );

      return;
    }
    if (!response?.accessToken) {
      Logger.logError(`Facebook login failure: ${response?.status}`);
      dispatch(
        displayNotificationBanner(
          UNEXPECTED_ERROR_MESSAGE,
          NOTIFICATION_LEVEL_ALERT
        )
      );
      dispatch(modalClose());
    }

    const success = () => {
      dispatch(loginSocialSuccess());
      dispatch(getUser());
    };

    const handleErrors = () => {
      trackAuthenticationSocialFailure();
    };
    const unexpectedError = () => dispatch(modalClose());

    UserService.checkSocialPrivacyPolicy(
      FACEBOOK_PROVIDER_ENUM,
      response.accessToken,
      privacyPolicy,
      () => {
        dispatch(
          modalShowDataPolicySocial(
            FACEBOOK_PROVIDER_ENUM,
            response.accessToken
          )
        );
      },
      success,
      handleErrors,
      unexpectedError
    );
  };

  useEffect(() => {
    /** Dirty Hack to disable facebook connect in webview / FB browser due to unstable SDK methods
     *  https://developers.facebook.com/docs/facebook-login/best-practices/#avoidwebview
     */
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    if (ua.indexOf('FBAN') > -1 || ua.indexOf('FBAV') > -1) {
      setFacebookBrowser(true);
    }
  }, []);

  if (!isFacebookBrowser) {
    return (
      <FacebookLogin
        appId="317128238675603"
        version="8.0"
        fields="name,email,picture,birthday"
        callback={handleFacebookLoginCallback}
        language={language}
        disableMobileRedirect
        render={(renderProps) => (
          <FacebookButtonStyle onClick={renderProps.onClick} type="button">
            <SvgFacebookLogoF aria-hidden focusable="false" />
            <ScreenReaderItemStyle>Facebook</ScreenReaderItemStyle>
          </FacebookButtonStyle>
        )}
      />
    );
  }
  return null;
};
