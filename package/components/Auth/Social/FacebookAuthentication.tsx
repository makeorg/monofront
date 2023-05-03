import React, { useState, useEffect } from 'react';
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FACEBOOK_PROVIDER_ENUM } from '@make.org/api/UserApiService';
import { SvgFacebookLogoF } from '@make.org/ui/Svg/elements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { UserService } from '@make.org/utils/services/User';
import { modalShowDataPolicySocial } from '@make.org/store/actions/modal';
import {
  trackAuthenticationSocialFailure,
  trackAuthenticationSocialSuccess,
  trackClickSocialConnect,
} from '@make.org/utils/services/Tracking';

import {
  loginSocialSuccess,
  loginSocialFailure,
  getUser,
} from '@make.org/store/actions/authentication';
import { Logger } from '@make.org/utils/services/Logger';
import { displayNotificationBanner } from '@make.org/store/actions/notifications';
import { NOTIF } from '@make.org/types/enums';
import { useAppContext } from '@make.org/store';
import i18n from 'i18next';
import {
  closePanel,
  removePanelContent,
  setPanelContent,
} from '@make.org/store/actions/panel';
import { ProposalService } from '@make.org/utils/services/Proposal';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { PANEL_CONTENT } from '@make.org/store/actions/panel/panelContentEnum';
import {
  FacebookButtonStyle,
  SocialButtonLabelStyle,
  SvgLogoFacebookWrapperStyle,
} from './style';
import { OptInGTU } from './OptInGTU';

type Props = {
  isRegister?: boolean;
};

export const FacebookAuthentication: React.FC<Props> = ({ isRegister }) => {
  const { dispatch, state } = useAppContext();
  const { privacyPolicy, language, country } = state.appConfig;
  const { pendingProposal, isAnonymous } = state.pendingProposal;
  const question = selectCurrentQuestion(state);

  const handleClose = () => {
    dispatch(closePanel());
    dispatch(removePanelContent());
  };

  // setting facebook browser to true or false
  const [isFacebookBrowser, setFacebookBrowser] = useState(false);
  const handleFacebookLoginCallback = (
    response: ReactFacebookLoginInfo | ReactFacebookFailureResponse
  ) => {
    if (!('accessToken' in response)) {
      dispatch(loginSocialFailure());
      const { status } = response;
      if (status === 'unknown') {
        const unknownErrorMessage =
          'Facebook auth failed with status unknown. Probably user close popup.';
        Logger.logInfo({
          message: unknownErrorMessage,
          name: 'social-auth',
        });
        trackAuthenticationSocialFailure(
          FACEBOOK_PROVIDER_ENUM,
          unknownErrorMessage
        );
        return;
      }
      const failureErrorMessage = `Facebook login failure: ${response?.status}`;
      Logger.logError({
        message: failureErrorMessage,
        name: 'social-auth',
      });
      trackAuthenticationSocialFailure(
        FACEBOOK_PROVIDER_ENUM,
        failureErrorMessage
      );

      dispatch(
        displayNotificationBanner(
          NOTIF.UNEXPECTED_ERROR_MESSAGE,
          NOTIF.NOTIFICATION_LEVEL_ALERT
        )
      );
      handleClose();

      return;
    }

    if (!('email' in response)) {
      dispatch(loginSocialFailure());
      const emailErrorMessage = `Facebook login failure no e-mail in profile (login is a phone number or e-mail is not yet confirmed)`;
      Logger.logError({
        message: emailErrorMessage,
        name: 'social-auth',
      });
      trackAuthenticationSocialFailure(
        FACEBOOK_PROVIDER_ENUM,
        emailErrorMessage
      );
      dispatch(
        displayNotificationBanner(
          NOTIF.LOGIN_SOCIAL_MISSING_EMAIL_DATA,
          NOTIF.NOTIFICATION_LEVEL_ALERT
        )
      );
      handleClose();

      return;
    }

    const { accessToken } = response;

    const success = async (isNewAccount: boolean) => {
      dispatch(loginSocialSuccess());
      await getUser(dispatch, state.modal.isOpen);

      if (!isRegister && !pendingProposal) {
        dispatch(closePanel());
        dispatch(removePanelContent());
        dispatch(
          displayNotificationBanner(
            NOTIF.LOGIN_SUCCESS_MESSAGE,
            NOTIF.NOTIFICATION_LEVEL_SUCCESS
          )
        );
      }

      if (!pendingProposal && isRegister) {
        dispatch(setPanelContent(PANEL_CONTENT.REGISTER_CONFIRMATION_SOCIAL));
      }
      trackAuthenticationSocialSuccess(FACEBOOK_PROVIDER_ENUM, isNewAccount);

      if (pendingProposal) {
        await ProposalService.propose(
          pendingProposal,
          question.questionId,
          question.returnedLanguage,
          country,
          isAnonymous,
          () => dispatch(setPanelContent(PANEL_CONTENT.PROPOSAL_SUCCESS))
        );
      }
    };

    const failure = () =>
      trackAuthenticationSocialFailure(
        FACEBOOK_PROVIDER_ENUM,
        'Login social failure'
      );

    const unexpectedError = () => handleClose();

    const updateDataPolicy = () => {
      dispatch(modalShowDataPolicySocial(FACEBOOK_PROVIDER_ENUM, accessToken));
    };

    const validateDataPolicy = () => {
      const handleSubmit = (
        acceptDataPolicy: boolean,
        optinNewsletter: boolean
      ) => {
        UserService.loginSocial(
          FACEBOOK_PROVIDER_ENUM,
          accessToken,
          acceptDataPolicy,
          optinNewsletter,
          success,
          failure,
          unexpectedError
        );
      };

      const handleReturn = () => {
        dispatch(setPanelContent(PANEL_CONTENT.REGISTER));
      };

      dispatch(
        setPanelContent(
          <OptInGTU handleSubmit={handleSubmit} handleReturn={handleReturn} />
        )
      );
    };

    UserService.checkSocialPrivacyPolicy(
      FACEBOOK_PROVIDER_ENUM,
      accessToken,
      privacyPolicy,
      updateDataPolicy,
      validateDataPolicy,
      success,
      failure,
      unexpectedError
    );
  };

  useEffect(() => {
    /** Dirty Hack to disable facebook connect in webview / FB browser due to unstable SDK methods
     *  https://developers.facebook.com/docs/facebook-login/best-practices/#avoidwebview
     */
    const ua = navigator.userAgent || navigator.vendor;
    if (ua.indexOf('FBAN') > -1 || ua.indexOf('FBAV') > -1) {
      setFacebookBrowser(true);
    }
  }, []);

  if (!isFacebookBrowser) {
    return (
      <FacebookLogin
        appId="317128238675603"
        version="12.0"
        fields="name,email,picture,birthday"
        callback={handleFacebookLoginCallback}
        onClick={() => trackClickSocialConnect(FACEBOOK_PROVIDER_ENUM)}
        language={language}
        disableMobileRedirect
        render={(renderProps: { onClick: () => void }) => (
          <FacebookButtonStyle onClick={renderProps.onClick} type="button">
            <SvgLogoFacebookWrapperStyle>
              <SvgFacebookLogoF
                width={15}
                height={12}
                aria-hidden
                focusable="false"
              />
            </SvgLogoFacebookWrapperStyle>
            <SocialButtonLabelStyle>
              {i18n.t('common.social_login.facebook_connect')}
            </SocialButtonLabelStyle>
            <ScreenReaderItemStyle>Facebook</ScreenReaderItemStyle>
          </FacebookButtonStyle>
        )}
      />
    );
  }
  return null;
};
