import React from 'react';
import { modalShowRegister } from '@make.org/store/actions/modal';
import { useAppContext } from '@make.org/store';
import i18n from 'i18next';
import { FacebookAuthentication } from '../Social/FacebookAuthentication';
import { GoogleAuthentication } from '../Social/GoogleAuthentication';
import {
  AuthenticationButtonWrapperStyle,
  AuthenticationEmailIconStyle,
  EmailButtonStyle,
} from '../Social/style';

export const AuthenticationRegisterButtons: React.FC = () => {
  const { dispatch } = useAppContext();
  return (
    <AuthenticationButtonWrapperStyle data-cy-container="signup-auth-buttons">
      <GoogleAuthentication />
      <FacebookAuthentication />
      <EmailButtonStyle
        onClick={() => dispatch(modalShowRegister())}
        id="authentication-register-button"
      >
        <AuthenticationEmailIconStyle aria-hidden focusable="false" />
        {i18n.t('common.email')}
      </EmailButtonStyle>
    </AuthenticationButtonWrapperStyle>
  );
};
