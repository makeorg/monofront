import React, { useState } from 'react';
import { GOOGLE_PROVIDER_ENUM } from '@make.org/api/UserApiService';
import { GOOGLE_LOGIN_ID } from '@make.org/utils/constants/config';
import {
  closePanel,
  removePanelContent,
  setPanelContent,
} from '@make.org/store/actions/panel/';
import { SvgGoogleLogoG } from '@make.org/ui/Svg/elements';
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
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { ProposalService } from '@make.org/utils/services/Proposal';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import {
  GoogleOAuthProvider,
  TokenResponse,
  useGoogleLogin,
} from '@react-oauth/google';
import { PANEL_CONTENT } from '@make.org/store/actions/panel/panelContentEnum';
import {
  GoogleButtonStyle,
  SocialButtonLabelStyle,
  SvgLogoWrapperStyle,
} from './style';
import { OptInGTU } from './OptInGTU';

const useLoginSuccess = (isRegister: boolean) => {
  const { dispatch, state } = useAppContext();
  const { pendingProposal, isAnonymous } = state.pendingProposal;
  const { country } = state.appConfig;
  const question = selectCurrentQuestion(state);

  return async (isNewAccount: boolean) => {
    dispatch(loginSocialSuccess());
    trackAuthenticationSocialSuccess(GOOGLE_PROVIDER_ENUM, isNewAccount);
    await getUser(dispatch, state.modal.isOpen);

    if (!pendingProposal && !isRegister) {
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
};

const useCheckSocialPrivacyPolicy = (isRegister: boolean) => {
  const { dispatch, state } = useAppContext();
  const { privacyPolicy } = state.appConfig || {};

  const loginSuccess = useLoginSuccess(isRegister);

  const handleClose = () => {
    dispatch(closePanel());
    dispatch(removePanelContent());
  };

  const failure = () => {
    trackAuthenticationSocialFailure(
      GOOGLE_PROVIDER_ENUM,
      'Login social failure'
    );
    dispatch(closePanel());
  };
  const unexpectedError = () => handleClose();
  const validateDataPolicy = (accessToken: string) => {
    const handleSubmit = (
      acceptDataPolicy: boolean,
      optinNewsletter: boolean
    ) => {
      UserService.loginSocial(
        GOOGLE_PROVIDER_ENUM,
        accessToken,
        acceptDataPolicy,
        optinNewsletter,
        loginSuccess,
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

  return (accessToken: string) =>
    UserService.checkSocialPrivacyPolicy(
      GOOGLE_PROVIDER_ENUM,
      accessToken,
      privacyPolicy,
      () =>
        dispatch(modalShowDataPolicySocial(GOOGLE_PROVIDER_ENUM, accessToken)),
      () => validateDataPolicy(accessToken),
      loginSuccess,
      failure,
      unexpectedError
    );
};

type ComponentProps = {
  isDisabled: boolean;
  isRegister: boolean;
};

const GoogleAuthenticationComponent: React.FC<ComponentProps> = ({
  isRegister,
  isDisabled,
}) => {
  const { dispatch } = useAppContext();
  const checkDataPolicy = useCheckSocialPrivacyPolicy(isRegister);

  // Success
  const handleGoogleLoginSuccess = async (
    credentialResponse: Omit<
      TokenResponse,
      'error' | 'error_description' | 'error_uri'
    >
  ) => {
    const { access_token: accessToken } = credentialResponse;
    checkDataPolicy(accessToken);
  };

  // Failure
  const handleGoogleLoginFailure = (
    response: Pick<TokenResponse, 'error' | 'error_description' | 'error_uri'>
  ) => {
    const {
      error,
      error_description: errorDescription,
      error_uri: errorUri,
    } = response;
    dispatch(loginSocialFailure());

    const googleLoginFailure = `Google login failure: ${errorDescription}`;
    Logger.logError({
      message: googleLoginFailure,
      app_google_error: error,
      app_google_error_uri: errorUri,
      name: 'social-auth',
    });
    trackAuthenticationSocialFailure(GOOGLE_PROVIDER_ENUM, googleLoginFailure);

    dispatch(
      displayNotificationBanner(
        NOTIF.UNEXPECTED_ERROR_MESSAGE,
        NOTIF.NOTIFICATION_LEVEL_ALERT
      )
    );
    dispatch(closePanel());
    dispatch(removePanelContent());
  };

  // Non OAuth failure
  const handleNonOAuthError = ({
    type: nonOAuthErrorType,
  }: {
    type: 'popup_failed_to_open' | 'popup_closed' | 'unknown';
  }) => {
    if (nonOAuthErrorType === 'popup_closed') {
      const popupClosedError = 'Google auth popup closed by user';
      Logger.logInfo({
        message: popupClosedError,
        name: 'social-auth',
      });
      trackAuthenticationSocialFailure(GOOGLE_PROVIDER_ENUM, popupClosedError);

      return;
    }

    const message = `Google auth failure. Non Oauth errror : ${nonOAuthErrorType}`;
    Logger.logError({
      message,
      name: 'social-auth',
    });
    trackAuthenticationSocialFailure(GOOGLE_PROVIDER_ENUM, message);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: handleGoogleLoginFailure,
    onNonOAuthError: handleNonOAuthError,
    scope: 'https://www.googleapis.com/auth/user.birthday.read',
  });

  return (
    <GoogleButtonStyle
      onClick={() => {
        trackClickSocialConnect(GOOGLE_PROVIDER_ENUM);
        googleLogin();
      }}
      type="button"
      disabled={isDisabled}
    >
      <SvgLogoWrapperStyle>
        <SvgGoogleLogoG aria-hidden focusable="false" />
      </SvgLogoWrapperStyle>
      <SocialButtonLabelStyle>
        {i18n.t('common.social_login.google_connect')}
      </SocialButtonLabelStyle>
      <ScreenReaderItemStyle>Google</ScreenReaderItemStyle>
    </GoogleButtonStyle>
  );
};

type Props = {
  isRegister: boolean;
};

export const GoogleAuthentication: React.FC<Props> = ({ isRegister }) => {
  const [isDisabled, setDisabled] = useState(false);

  const handleGoogleLoadFailure = () => {
    Logger.logInfo({
      message: `Google login load failure`,
      name: 'social-auth',
    });
    setDisabled(true);
  };

  return (
    <GoogleOAuthProvider
      clientId={GOOGLE_LOGIN_ID}
      onScriptLoadError={handleGoogleLoadFailure}
    >
      <GoogleAuthenticationComponent
        isRegister={isRegister}
        isDisabled={isDisabled}
      />
    </GoogleOAuthProvider>
  );
};
