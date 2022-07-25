import React, { useState } from 'react';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
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
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { RegisterConfirmation } from '../Register/Steps/RegisterConfirmation';
import {
  GoogleButtonStyle,
  SocialButtonLabelStyle,
  SvgLogoWrapperStyle,
} from './style';
import { OptInGTU } from '../Register/Steps/OptInGTU';

type Props = {
  isRegister?: boolean;
};

export const GoogleAuthentication: React.FC<Props> = ({ isRegister }) => {
  const { dispatch, state } = useAppContext();
  const { privacyPolicy } = state.appConfig || {};
  const { pendingProposal } = state.pendingProposal;
  const [disabled, setDisabled] = useState(false);

  const question = selectCurrentQuestion(state);

  const handleClose = () => {
    dispatch(closePanel());
    dispatch(removePanelContent());
  };

  /** Google login method callback */
  const handleGoogleLoginSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const success = async (isNewAccount: boolean) => {
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
        dispatch(setPanelContent(<RegisterConfirmation isSocial />));
      }

      if (pendingProposal) {
        await ProposalService.propose(
          pendingProposal,
          question.questionId,
          () => dispatch(setPanelContent(<ProposalSuccess />))
        );
      }
    };

    let accessToken = '';
    if ('accessToken' in response) {
      accessToken = response.accessToken;
    }

    const updateDataPolicy = () => {
      dispatch(modalShowDataPolicySocial(GOOGLE_PROVIDER_ENUM, accessToken));
    };

    const failure = () =>
      trackAuthenticationSocialFailure(GOOGLE_PROVIDER_ENUM);

    const unexpectedError = () => handleClose();

    const validateDataPolicy = () => {
      dispatch(
        setPanelContent(
          <OptInGTU
            provider={GOOGLE_PROVIDER_ENUM}
            token={accessToken}
            success={success}
            failure={failure}
            unexpectedError={unexpectedError}
          />
        )
      );
    };

    UserService.checkSocialPrivacyPolicy(
      GOOGLE_PROVIDER_ENUM,
      accessToken,
      privacyPolicy,
      updateDataPolicy,
      validateDataPolicy,
      success,
      failure,
      unexpectedError
    );
  };

  const handleGoogleLoadFailure = () => {
    Logger.logInfo({
      message: `Google login load failure`,
      name: 'social-auth',
    });
    setDisabled(true);
  };

  const handleGoogleLoginFailure = (response: {
    error: string;
    details: string;
  }) => {
    dispatch(loginSocialFailure());
    if (response?.error === 'popup_closed_by_user') {
      Logger.logInfo({
        message: 'Google auth popup closed by user',
        name: 'social-auth',
      });

      return;
    }

    if (response?.error === 'idpiframe_initialization_failed') {
      Logger.logInfo({
        message: `Google login failure: idpiframe_initialization_failed - ${response?.details}`,
        name: 'social-auth',
      });
      setDisabled(true);

      return;
    }

    Logger.logError({
      message: `Google login failure: ${response?.error} - ${response?.details}`,
      name: 'social-auth',
    });
    dispatch(
      displayNotificationBanner(
        NOTIF.UNEXPECTED_ERROR_MESSAGE,
        NOTIF.NOTIFICATION_LEVEL_ALERT
      )
    );
    handleClose();
  };

  return (
    <GoogleLogin
      clientId={GOOGLE_LOGIN_ID}
      scope="https://www.googleapis.com/auth/user.birthday.read"
      buttonText="Google"
      onSuccess={handleGoogleLoginSuccess}
      onFailure={handleGoogleLoginFailure}
      onScriptLoadFailure={handleGoogleLoadFailure}
      render={(renderProps: { onClick: () => void }) => (
        <GoogleButtonStyle
          onClick={renderProps.onClick}
          type="button"
          disabled={disabled}
        >
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
