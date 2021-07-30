import React from 'react';
import i18n from 'i18next';
import { SecondLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { SmallSeparatorWithMarginStyle } from '@make.org/ui/elements/SeparatorsElements';
import { RedLinkButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { modalShowLogin } from '@make.org/store/actions/modal';
import { ExtraAltParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { useAppContext } from '@make.org/store';
import { ForgotPasswordForm } from './Form';
import { ForgotPasswordStyle } from './style';

/**
 * Renders Forgot Password component
 */
export const PasswordForgot = () => {
  const { dispatch } = useAppContext();

  const handleLoginModal = () => {
    dispatch(modalShowLogin());
  };

  return (
    <ForgotPasswordStyle aria-labelledby="forgot_password_title">
      <SecondLevelTitleStyle id="forgot_password_title">
        {i18n.t('forgot_password.title')}
      </SecondLevelTitleStyle>
      <SmallSeparatorWithMarginStyle />
      <ForgotPasswordForm />
      <ExtraAltParagraphStyle>
        {i18n.t('forgot_password.return')}
        <RedLinkButtonStyle onClick={handleLoginModal}>
          {i18n.t('forgot_password.login_link')}
        </RedLinkButtonStyle>
      </ExtraAltParagraphStyle>
    </ForgotPasswordStyle>
  );
};
