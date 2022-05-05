import React from 'react';
import i18n from 'i18next';
import {
  modalShowForgotPassword,
  modalClose,
} from '@make.org/store/actions/modal';
import { FourthLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import {
  ExtraParagraphStyle,
  ExtraAltParagraphStyle,
} from '@make.org/ui/elements/ParagraphElements';
import {
  SmallSeparatorWithMarginStyle,
  SeparatorWrapperStyle,
  TextSeparatorStyle,
  SeparatorStyle,
} from '@make.org/ui/elements/SeparatorsElements';
import { RedLinkButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { useAppContext } from '@make.org/store';
import { Register } from '@make.org/components/Auth/Register';
import { setPanelContent } from '@make.org/store/actions/panel';
import { LoginForm } from './Form';
import {
  AuthenticationWrapperStyle,
  AuthenticationTitleStyle,
  LoginTitleWrapperStyle,
} from '../style';
import { AuthenticationButtonWrapperStyle } from '../Social/style';
import { FacebookAuthentication } from '../Social/FacebookAuthentication';
import { GoogleAuthentication } from '../Social/GoogleAuthentication';

type Props = {
  panel?: boolean;
};
export const Login: React.FC<Props> = ({ panel }) => {
  const { dispatch } = useAppContext();

  const handleRegisterPanel = () => {
    dispatch(modalClose());
    dispatch(setPanelContent(<Register panel />));
  };

  const handleForgotPasswordModal = () => {
    dispatch(modalShowForgotPassword());
  };

  return (
    <AuthenticationWrapperStyle
      aria-labelledby="login_title"
      data-cy-container="authentication"
    >
      {panel ? (
        <LoginTitleWrapperStyle as="h3" className="panel">
          {i18n.t('login.connect')}
        </LoginTitleWrapperStyle>
      ) : (
        <>
          <AuthenticationTitleStyle id="login_title">
            {i18n.t('login.title')}
          </AuthenticationTitleStyle>
          <SmallSeparatorWithMarginStyle />
          <FourthLevelTitleStyle as="h3">
            {i18n.t('login.connect')}
          </FourthLevelTitleStyle>
          <AuthenticationButtonWrapperStyle className="small-wrapper">
            <FacebookAuthentication />
            <GoogleAuthentication />
          </AuthenticationButtonWrapperStyle>
          <SeparatorWrapperStyle className="margin-bottom">
            <SeparatorStyle />
            <TextSeparatorStyle>{i18n.t('login.or')}</TextSeparatorStyle>
            <SeparatorStyle />
          </SeparatorWrapperStyle>
          <FourthLevelTitleStyle as="h3">
            {i18n.t('login.email_connect')}
          </FourthLevelTitleStyle>
        </>
      )}
      <LoginForm panel={panel} />
      {!panel && (
        <>
          <ExtraParagraphStyle>
            {i18n.t('login.forgot_password_title')}
            <RedLinkButtonStyle
              onClick={handleForgotPasswordModal}
              type="button"
            >
              {i18n.t('login.forgot_password_link')}
            </RedLinkButtonStyle>
          </ExtraParagraphStyle>
          <ExtraAltParagraphStyle>
            {i18n.t('login.registration_title')}
            <RedLinkButtonStyle
              onClick={handleRegisterPanel}
              type="button"
              data-cy-button="register"
            >
              {i18n.t('login.registration_link')}
            </RedLinkButtonStyle>
          </ExtraAltParagraphStyle>
        </>
      )}
    </AuthenticationWrapperStyle>
  );
};
