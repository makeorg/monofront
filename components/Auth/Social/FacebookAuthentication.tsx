import React, { FC, useState, useEffect } from 'react';
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FACEBOOK_PROVIDER_ENUM } from '@make.org/api/UserApiService';
import { SvgFacebookLogoF } from '@make.org/ui/Svg/elements';
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
import { useAppContext } from '@make.org/store';
import i18n from 'i18next';
import { closePanel, setPanelContent } from '@make.org/store/actions/panel';
import { ProposalService } from '@make.org/utils/services/Proposal';
import { ProposalSuccess } from '@make.org/components/Proposal/Submit/Success';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import {
  FacebookButtonStyle,
  SocialButtonLabelStyle,
  SvgLogoFacebookWrapperStyle,
} from './style';

export const FacebookAuthentication: FC = () => {
  const { dispatch, state } = useAppContext();
  const { privacyPolicy, language } = state.appConfig;
  const { proposalContent } = state.pendingProposal;
  const question = selectCurrentQuestion(state);

  // setting facebook browser to true  or false
  const [isFacebookBrowser, setFacebookBrowser] = useState(false);
  const handleFacebookLoginCallback = (
    response: ReactFacebookLoginInfo | ReactFacebookFailureResponse
  ) => {
    if (!('accessToken' in response)) {
      dispatch(loginSocialFailure());
      const { status } = response;
      if (status === 'unknown') {
        Logger.logInfo({
          message:
            'Facebook auth failed with status unknown. Probably user close popup.',
          name: 'social-auth',
        });

        return;
      }
      Logger.logError({
        message: `Facebook login failure: ${response?.status}`,
        name: 'social-auth',
      });
      dispatch(
        displayNotificationBanner(
          NOTIF.UNEXPECTED_ERROR_MESSAGE,
          NOTIF.NOTIFICATION_LEVEL_ALERT
        )
      );
      dispatch(closePanel());
      dispatch(modalClose());

      return;
    }

    if (!('email' in response)) {
      dispatch(loginSocialFailure());
      Logger.logError({
        message: `Facebook login failure no e-mail in profile (login is a phone number or e-mail is not yet confirmed)`,
        name: 'social-auth',
      });
      dispatch(
        displayNotificationBanner(
          NOTIF.LOGIN_SOCIAL_MISSING_EMAIL_DATA,
          NOTIF.NOTIFICATION_LEVEL_ALERT
        )
      );
      dispatch(closePanel());
      dispatch(modalClose());

      return;
    }

    const { accessToken } = response;

    const success = async (isNewAccount: boolean) => {
      dispatch(loginSocialSuccess());
      await getUser(dispatch, state.modal.isOpen);

      dispatch(
        displayNotificationBanner(
          NOTIF.LOGIN_SUCCESS_MESSAGE,
          NOTIF.NOTIFICATION_LEVEL_SUCCESS
        )
      );
      trackAuthenticationSocialSuccess(FACEBOOK_PROVIDER_ENUM, isNewAccount);

      if (proposalContent) {
        await ProposalService.propose(
          proposalContent,
          question.questionId,
          () => dispatch(setPanelContent(<ProposalSuccess />))
        );
      }
    };

    UserService.checkSocialPrivacyPolicy(
      FACEBOOK_PROVIDER_ENUM,
      accessToken,
      privacyPolicy,
      () => {
        dispatch(
          modalShowDataPolicySocial(FACEBOOK_PROVIDER_ENUM, accessToken)
        );
      },
      success,
      () => trackAuthenticationSocialFailure(FACEBOOK_PROVIDER_ENUM),
      () => dispatch(modalClose())
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
