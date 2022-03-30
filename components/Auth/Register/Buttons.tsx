import React, { FC } from 'react';
import { modalShowRegister } from '@make.org/store/actions/modal';
import { useAppContext } from '@make.org/store';
import i18n from 'i18next';
import {
  ProposalSubmitAuthSeparator,
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

type Props = {
  onEmailRegister?: () => void;
};

export const AuthenticationRegisterButtons: FC<Props> = ({
  onEmailRegister,
}) => {
  const { dispatch } = useAppContext();
  const onEmailClick = () => {
    if (onEmailRegister) {
      onEmailRegister();
    } else {
      dispatch(modalShowRegister());
    }
  };
  return (
    <AuthenticationButtonWrapperStyle data-cy-container="signup-auth-buttons">
      <FacebookAuthentication />
      <GoogleAuthentication />
      <SeparatorWrapperStyle>
        <ProposalSubmitAuthSeparator className="no-margin-top" />
        <TextSeparatorStyle>{i18n.t('login.or')}</TextSeparatorStyle>
        <ProposalSubmitAuthSeparator className="no-margin-top" />
      </SeparatorWrapperStyle>
      <EmailButtonStyle
        onClick={onEmailClick}
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
