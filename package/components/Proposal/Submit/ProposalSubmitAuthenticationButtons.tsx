import React, { FC } from 'react';
import i18n from 'i18next';
import {
  ProposalSubmitAuthSeparator,
  SeparatorWrapperStyle,
  TextSeparatorStyle,
} from '@make.org/ui/elements/SeparatorsElements';
import { env } from '@make.org/assets/env';
import { setSocialConnect } from '@make.org/utils/helpers/social';
import { FacebookAuthentication } from '@make.org/components/Auth/Social/FacebookAuthentication';
import { GoogleAuthentication } from '@make.org/components/Auth/Social/GoogleAuthentication';
import {
  AuthenticationButtonWrapperStyle,
  AuthenticationEmailIconStyle,
  EmailButtonStyle,
  SocialButtonLabelStyle,
} from '@make.org/components/Auth/Social/style';
import { ILogger } from '@make.org/types';

type Props = {
  onEmailRegister?: () => void;
  logger: ILogger;
};

export const ProposalSubmitAuthenticationRegisterButtons: FC<Props> = ({
  onEmailRegister,
  logger,
}) => {
  const FRONT_URL = env.frontUrl() || window.FRONT_URL;

  return (
    <AuthenticationButtonWrapperStyle data-cy-container="signup-auth-buttons">
      {setSocialConnect(FRONT_URL) && (
        <>
          <GoogleAuthentication isRegister logger={logger} />
          <FacebookAuthentication isRegister logger={logger} />
          <SeparatorWrapperStyle>
            <ProposalSubmitAuthSeparator className="no-margin-top" />
            <TextSeparatorStyle>{i18n.t('login.or')}</TextSeparatorStyle>
            <ProposalSubmitAuthSeparator className="no-margin-top" />
          </SeparatorWrapperStyle>
        </>
      )}
      <EmailButtonStyle
        onClick={onEmailRegister}
        id="authentication-register-button"
        type="button"
        data-cy-button="email-button-register"
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
