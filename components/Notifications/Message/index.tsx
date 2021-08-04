import React from 'react';
import { NOTIF } from '@make.org/types/enums';

import { PasswordRecoveryFailureMessage } from '../../Auth/PasswordRecovery/Failure';
import { SecureExpiredMessage } from '../Banner/SecureExpired';
import { AccountActivationSuccessMessage } from '../Banner/AccountActivationSuccess';
import { AccountActivationFailureMessage } from '../Banner/AccountActivationFailure';
import { LogoutSuccessMessage } from '../Banner/LogoutSuccess';
import { LoginSuccessMessage } from '../Banner/LoginSuccess';
import { RegisterSuccessValidateMessage } from '../Banner/RegisterSuccessValidate';
import { RegisterSuccessMessage } from '../Banner/RegisterSuccess';
import { NetworkErrorMessage } from '../Banner/NetworkError';
import { UnexpectedErrorMessage } from '../Banner/UnexpectedError';
import { VoteOnlyMessage } from '../Banner/VoteOnly';
import { AccountDeletionSuccessMessage } from '../Banner/AccountDeletionSuccess';
import { FirstVoteTip } from '../Tip/FirstVote';
import { SocialMediaCookiesMessage } from '../Banner/SocialMediaCookies';
import { CookiesPreferencesUpdateMessage } from '../Banner/CookiesPreferencesUpdate';

type Props = {
  name: string;
  params?: {
    email: string;
  };
  close?: () => void;
};

export const NotificationMessage: React.FC<Props> = ({
  name,
  params,
  close,
}) => {
  switch (name) {
    case NOTIF.SECURE_EXPIRED_MESSAGE:
      return <SecureExpiredMessage />;
    case NOTIF.ACTIVATION_SUCCESS_MESSAGE:
      return <AccountActivationSuccessMessage />;
    case NOTIF.ACTIVATION_FAILURE_MESSAGE:
      return <AccountActivationFailureMessage />;
    case NOTIF.PASSWORD_RECOVERY_FAILURE_MESSAGE:
      return <PasswordRecoveryFailureMessage />;
    case NOTIF.LOGOUT_SUCCESS_MESSAGE:
      return <LogoutSuccessMessage />;
    case NOTIF.LOGIN_SUCCESS_MESSAGE:
      return <LoginSuccessMessage />;
    case NOTIF.REGISTER_SUCCESS_VALIDATE_MESSAGE: {
      if (params) {
        return <RegisterSuccessValidateMessage email={params.email} />;
      }
      return null;
    }
    case NOTIF.REGISTER_SUCCESS_MESSAGE:
      return <RegisterSuccessMessage />;
    case NOTIF.NETWORK_ERROR_MESSAGE:
      return <NetworkErrorMessage />;
    case NOTIF.UNEXPECTED_ERROR_MESSAGE:
      return <UnexpectedErrorMessage />;
    case NOTIF.VOTE_ONLY_MESSAGE:
      return <VoteOnlyMessage close={close} />;
    case NOTIF.ACCOUNT_DELETION_SUCCESS_MESSAGE:
      return <AccountDeletionSuccessMessage />;
    case NOTIF.FIRST_VOTE_TIP_MESSAGE:
      return <FirstVoteTip />;
    case NOTIF.SOCIAL_MEDIA_COOKIES_MESSAGE:
      return <SocialMediaCookiesMessage />;
    case NOTIF.COOKIES_PREFERENCES_UPDATE_MESSAGE:
      return <CookiesPreferencesUpdateMessage />;
    default:
      return <></>;
  }
};
