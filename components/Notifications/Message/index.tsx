import React from 'react';
import {
  SECURE_EXPIRED_MESSAGE,
  ACTIVATION_SUCCESS_MESSAGE,
  ACTIVATION_FAILURE_MESSAGE,
  PASSWORD_RECOVERY_FAILURE_MESSAGE,
  LOGOUT_SUCCESS_MESSAGE,
  LOGIN_SUCCESS_MESSAGE,
  REGISTER_SUCCESS_MESSAGE,
  REGISTER_SUCCESS_VALIDATE_MESSAGE,
  NETWORK_ERROR_MESSAGE,
  UNEXPECTED_ERROR_MESSAGE,
  VOTE_ONLY_MESSAGE,
  ACCOUNT_DELETION_SUCCESS_MESSAGE,
  FIRST_VOTE_TIP_MESSAGE,
  SOCIAL_MEDIA_COOKIES_MESSAGE,
  COOKIES_PREFERENCES_UPDATE_MESSAGE,
} from '@make.org/utils/constants/notifications';
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

// REST TO DO
import { PasswordRecoveryFailureMessage } from 'Client/features/auth/PasswordRecovery/Failure';

type Props = {
  name: string
  params?: {
    email: string
  }
  close?: () => void
}

export const NotificationMessage: React.FC<Props> = ({ name, params, close }) => {
  switch (name) {
    case SECURE_EXPIRED_MESSAGE:
      return <SecureExpiredMessage />;
    case ACTIVATION_SUCCESS_MESSAGE:
      return <AccountActivationSuccessMessage />;
    case ACTIVATION_FAILURE_MESSAGE:
      return <AccountActivationFailureMessage />;
    case PASSWORD_RECOVERY_FAILURE_MESSAGE:
      return <PasswordRecoveryFailureMessage />;
    case LOGOUT_SUCCESS_MESSAGE:
      return <LogoutSuccessMessage />;
    case LOGIN_SUCCESS_MESSAGE:
      return <LoginSuccessMessage />;
    case REGISTER_SUCCESS_VALIDATE_MESSAGE:
      return <RegisterSuccessValidateMessage email={params.email} />;
    case REGISTER_SUCCESS_MESSAGE:
      return <RegisterSuccessMessage />;
    case NETWORK_ERROR_MESSAGE:
      return <NetworkErrorMessage />;
    case UNEXPECTED_ERROR_MESSAGE:
      return <UnexpectedErrorMessage />;
    case VOTE_ONLY_MESSAGE:
      return <VoteOnlyMessage close={close} />;
    case ACCOUNT_DELETION_SUCCESS_MESSAGE:
      return <AccountDeletionSuccessMessage />;
    case FIRST_VOTE_TIP_MESSAGE:
      return <FirstVoteTip />;
    case SOCIAL_MEDIA_COOKIES_MESSAGE:
      return <SocialMediaCookiesMessage />;
    case COOKIES_PREFERENCES_UPDATE_MESSAGE:
      return <CookiesPreferencesUpdateMessage />;
    default:
      return <></>;
  }
};
