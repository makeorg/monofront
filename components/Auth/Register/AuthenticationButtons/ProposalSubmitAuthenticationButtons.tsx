import React, { FC } from 'react';
import i18n from 'i18next';
import {
  ProposalSubmitAuthSeparator,
  SeparatorWrapperStyle,
  TextSeparatorStyle,
} from '@make.org/ui/elements/SeparatorsElements';
import { FacebookAuthentication } from '../../Social/FacebookAuthentication';
import { GoogleAuthentication } from '../../Social/GoogleAuthentication';
import {
  AuthenticationButtonWrapperStyle,
  AuthenticationEmailIconStyle,
  EmailButtonStyle,
  SocialButtonLabelStyle,
} from '../../Social/style';

type Props = {
  onEmailRegister?: () => void;
};

export const ProposalSubmitAuthenticationRegisterButtons: FC<Props> = ({
  onEmailRegister,
}) => (
  <AuthenticationButtonWrapperStyle data-cy-container="signup-auth-buttons">
    <GoogleAuthentication />
    <FacebookAuthentication />
    <SeparatorWrapperStyle>
      <ProposalSubmitAuthSeparator className="no-margin-top" />
      <TextSeparatorStyle>{i18n.t('login.or')}</TextSeparatorStyle>
      <ProposalSubmitAuthSeparator className="no-margin-top" />
    </SeparatorWrapperStyle>
    <EmailButtonStyle
      onClick={onEmailRegister}
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
