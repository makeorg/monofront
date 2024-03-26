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
import { env } from '@make.org/assets/env';
import { setSocialConnect } from '@make.org/utils/helpers/social';
import {
  RegisterParagraphStyle,
  SocialRegisterButtonsWrapperStyle,
} from '@make.org/components/Auth/style';
import { FacebookAuthentication } from '@make.org/components/Auth/Social/FacebookAuthentication';
import { GoogleAuthentication } from '@make.org/components/Auth/Social/GoogleAuthentication';
import { PANEL_CONTENT } from '@make.org/store/actions/panel/panelContentEnum';
import { ILogger } from '@make.org/types';

type Props = {
  logger: ILogger;
};

export const SocialAuthenticationButtons: React.FC<Props> = ({ logger }) => {
  const { dispatch } = useAppContext();
  const handleLoginModal = () => {
    dispatch(setPanelContent(PANEL_CONTENT.LOGIN));
  };
  const FRONT_URL = env.frontUrl() || window.FRONT_URL;

  return (
    <>
      {setSocialConnect(FRONT_URL) && (
        <>
          <SeparatorWrapperStyle className="margin-top margin-bottom">
            <SeparatorStyle />
            <TextSeparatorStyle>{i18n.t('register.or')}</TextSeparatorStyle>
            <SeparatorStyle />
          </SeparatorWrapperStyle>
          <SocialRegisterButtonsWrapperStyle>
            <GoogleAuthentication isRegister logger={logger} />
            <FacebookAuthentication isRegister logger={logger} />
          </SocialRegisterButtonsWrapperStyle>
        </>
      )}
      <RegisterParagraphStyle>
        {i18n.t('register.login_title')}
        <RedLinkButtonStyle onClick={handleLoginModal}>
          {i18n.t('register.login_link')}
        </RedLinkButtonStyle>
      </RegisterParagraphStyle>
    </>
  );
};
