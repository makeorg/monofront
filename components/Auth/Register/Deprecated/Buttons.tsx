import React, { FC } from 'react';
import { modalShowRegister } from '@make.org/store/actions/modal';
import { useAppContext } from '@make.org/store';
import i18n from 'i18next';
import {
  ProposalSubmitAuthSeparator,
  SeparatorWrapperStyle,
  TextSeparatorStyle,
} from '@make.org/ui/elements/SeparatorsElements';
import { DeprecatedFacebookAuthentication } from '../../Social/Deprecated/FacebookAuthentication';
import { DeprecatedGoogleAuthentication } from '../../Social/Deprecated/GoogleAuthentication';
import {
  AuthenticationButtonWrapperStyle,
  AuthenticationEmailIconStyle,
  EmailButtonStyle,
  SocialButtonLabelStyle,
} from '../../Social/style';

type Props = {
  onEmailRegister?: () => void;
};

export const DeprecatedAuthenticationRegisterButtons: FC<Props> = ({
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
      <DeprecatedFacebookAuthentication updateFirstname />
      <DeprecatedGoogleAuthentication updateFirstname />
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
