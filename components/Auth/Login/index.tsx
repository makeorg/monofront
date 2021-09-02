import React from 'react';
import i18n from 'i18next';
import {
  modalShowRegister,
  modalShowForgotPassword,
} from '@make.org/store/actions/modal';
import {
  FourthLevelTitleStyle,
  ThirdLevelTitleStyle,
} from '@make.org/ui/elements/TitleElements';
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
import { LoginForm } from './Form';
import { AuthenticationWrapperStyle, AuthenticationTitleStyle } from '../style';
import { AuthenticationButtonWrapperStyle } from '../Social/style';
import { FacebookAuthentication } from '../Social/FacebookAuthentication';
import { GoogleAuthentication } from '../Social/GoogleAuthentication';

type Props = {
  panel?: boolean;
};
export const Login: React.FC<Props> = ({ panel }) => {
  const { dispatch } = useAppContext();

  const handleRegisterModal = () => {
    dispatch(modalShowRegister());
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
        <ThirdLevelTitleStyle as="h3" style={{ marginTop: 32 }}>
          {i18n.t('login.social_connect')}
        </ThirdLevelTitleStyle>
      ) : (
        <>
          <AuthenticationTitleStyle id="login_title">
            {i18n.t('login.title')}
          </AuthenticationTitleStyle>
          <SmallSeparatorWithMarginStyle />
          <FourthLevelTitleStyle as="h3">
            {i18n.t('login.social_connect')}
          </FourthLevelTitleStyle>
          <AuthenticationButtonWrapperStyle className="small-wrapper">
            <FacebookAuthentication />
            <GoogleAuthentication />
          </AuthenticationButtonWrapperStyle>
          <SeparatorWrapperStyle className="no-margin-top">
            <SeparatorStyle className="no-margin-top" />
            <TextSeparatorStyle>{i18n.t('login.or')}</TextSeparatorStyle>
            <SeparatorStyle className="no-margin-top" />
          </SeparatorWrapperStyle>
          <FourthLevelTitleStyle as="h3">
            {i18n.t('login.email_connect')}
          </FourthLevelTitleStyle>
        </>
      )}
      <LoginForm />

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
              onClick={handleRegisterModal}
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
