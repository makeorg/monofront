import React from 'react';
import { modalShowRegister } from '@make.org/store/actions/modal';
import { useAppContext } from '@make.org/store';
import i18n from 'i18next';
import {
  SeparatorStyle,
  SeparatorWrapperStyle,
  TextSeparatorStyle,
} from '@make.org/ui/elements/SeparatorsElements';
import { FacebookAuthentication } from '../Social/FacebookAuthentication';
import { GoogleAuthentication } from '../Social/GoogleAuthentication';
import {
  AuthenticationButtonWrapperStyle,
  AuthenticationEmailIconStyle,
  EmailButtonStyle,
  SocialButtonLabelStyle,
} from '../Social/style';

export const AuthenticationRegisterButtons: React.FC = () => {
  const { dispatch } = useAppContext();
  return (
    <AuthenticationButtonWrapperStyle data-cy-container="signup-auth-buttons">
      <GoogleAuthentication />
      <FacebookAuthentication />
      <SeparatorWrapperStyle className="no-margin-top no-margin-bottom">
        <SeparatorStyle className="no-margin-top" />
        <TextSeparatorStyle>{i18n.t('login.or')}</TextSeparatorStyle>
        <SeparatorStyle className="no-margin-top" />
      </SeparatorWrapperStyle>
      <EmailButtonStyle
        onClick={() => dispatch(modalShowRegister())}
        id="authentication-register-button"
        type="button"
      >
        <AuthenticationEmailIconStyle
          aria-hidden
          focusable="false"
          type="button"
        />
        <SocialButtonLabelStyle>
          {i18n.t('common.social_login.email_register')}
        </SocialButtonLabelStyle>
      </EmailButtonStyle>
    </AuthenticationButtonWrapperStyle>
  );
};
