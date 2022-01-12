import React, { FC } from 'react';
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
import {
  trackAuthenticationSocialFailure,
  trackAuthenticationSocialSuccess,
} from '@make.org/utils/services/Tracking';

import {
  loginSocialSuccess,
  loginSocialFailure,
  getUser,
} from '@make.org/store/actions/authentication';
import { Logger } from '@make.org/utils/services/Logger';
import { displayNotificationBanner } from '@make.org/store/actions/notifications';
import { NOTIF } from '@make.org/types/enums';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { ProposalService } from '@make.org/utils/services/Proposal';
import { ProposalSuccess } from '@make.org/components/Proposal/Submit/Success';
import { setPanelContent } from '@make.org/store/actions/panel';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import {
  GoogleButtonStyle,
  SocialButtonLabelStyle,
  SvgLogoWrapperStyle,
} from './style';

export const GoogleAuthentication: FC = () => {
  const { dispatch, state } = useAppContext();
  const { privacyPolicy } = state.appConfig || {};
  const { proposalContent } = state.pendingProposal;
  const question = selectCurrentQuestion(state);

  /** Google login method callback */
  const handleGoogleLoginSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const success = async (isNewAccount: boolean) => {
      dispatch(loginSocialSuccess());
      trackAuthenticationSocialSuccess(GOOGLE_PROVIDER_ENUM, isNewAccount);
      await getUser(dispatch, state.modal.isOpen);
      dispatch(
        displayNotificationBanner(
          NOTIF.LOGIN_SUCCESS_MESSAGE,
          NOTIF.NOTIFICATION_LEVEL_SUCCESS
        )
      );

      if (proposalContent) {
        await ProposalService.propose(
          proposalContent,
          question.questionId,
          () => dispatch(setPanelContent(<ProposalSuccess />))
        );
      }
    };

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
      () => trackAuthenticationSocialFailure(GOOGLE_PROVIDER_ENUM),
      () => dispatch(modalClose())
    );
  };

  const handleGoogleLoginFailure = (response: any) => {
    dispatch(loginSocialFailure());
    if (response?.error === 'popup_closed_by_user') {
      Logger.logInfo({
        message: 'Google auth popup closed by user',
        name: 'social-auth',
      });

      return;
    }

    Logger.logError({
      message: `Google login failure: ${response?.error}`,
      name: 'social-auth',
    });
    dispatch(
      displayNotificationBanner(
        NOTIF.UNEXPECTED_ERROR_MESSAGE,
        NOTIF.NOTIFICATION_LEVEL_ALERT
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
      render={(renderProps: { onClick: () => void }) => (
        <GoogleButtonStyle onClick={renderProps.onClick} type="button">
          <SvgLogoWrapperStyle>
            <SvgGoogleLogoG aria-hidden focusable="false" />
          </SvgLogoWrapperStyle>
          <SocialButtonLabelStyle>
            {i18n.t('common.social_login.google_connect')}
          </SocialButtonLabelStyle>
          <ScreenReaderItemStyle>Google</ScreenReaderItemStyle>
        </GoogleButtonStyle>
      )}
    />
  );
};
