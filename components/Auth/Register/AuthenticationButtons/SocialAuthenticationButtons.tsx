import React from 'react';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { setPanelContent } from '@make.org/store/actions/panel';
import {
  SeparatorStyle,
  SeparatorWrapperStyle,
  TextSeparatorStyle,
} from '@make.org/ui/elements/SeparatorsElements';
import { RedLinkButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import {
  RegisterParagraphStyle,
  SocialRegisterButtonsWrapperStyle,
} from '../../style';
import { Login } from '../../Login';
import { FacebookAuthentication } from '../../Social/FacebookAuthentication';
import { GoogleAuthentication } from '../../Social/GoogleAuthentication';

export const SocialAuthenticationButtons: React.FC = () => {
  const { dispatch } = useAppContext();
  const handleLoginModal = () => {
    dispatch(setPanelContent(<Login />));
  };

  return (
    <>
      <SeparatorWrapperStyle className="margin-top margin-bottom">
        <SeparatorStyle />
        <TextSeparatorStyle>{i18n.t('register.or')}</TextSeparatorStyle>
        <SeparatorStyle />
      </SeparatorWrapperStyle>
      <SocialRegisterButtonsWrapperStyle>
        <GoogleAuthentication isRegister />
        <FacebookAuthentication isRegister />
      </SocialRegisterButtonsWrapperStyle>
      <RegisterParagraphStyle>
        {i18n.t('register.login_title')}
        <RedLinkButtonStyle onClick={handleLoginModal}>
          {i18n.t('register.login_link')}
        </RedLinkButtonStyle>
      </RegisterParagraphStyle>
    </>
  );
};
