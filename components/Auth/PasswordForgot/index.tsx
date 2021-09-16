import React, { FC, useEffect } from 'react';
import i18n from 'i18next';
import { SecondLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { SmallSeparatorWithMarginStyle } from '@make.org/ui/elements/SeparatorsElements';
import { RedLinkButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { modalShowLogin } from '@make.org/store/actions/modal';
import { ExtraAltParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { useAppContext } from '@make.org/store';
import { trackDisplayForgotPasswordForm } from '@make.org/utils/services/Tracking';
import { ForgotPasswordForm } from './Form';
import { ForgotPasswordStyle, PanelForgotPasswordTitleStyle } from './style';

/**
 * Renders Forgot Password component
 */

type Props = {
  panel?: boolean;
};
export const PasswordForgot: FC<Props> = ({ panel }) => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    trackDisplayForgotPasswordForm();
  }, []);

  return (
    <ForgotPasswordStyle aria-labelledby="forgot_password_title">
      {panel ? (
        <PanelForgotPasswordTitleStyle
          className="panel"
          id="forgot_password_title"
        >
          {i18n.t('forgot_password.title')}
        </PanelForgotPasswordTitleStyle>
      ) : (
        <SecondLevelTitleStyle id="forgot_password_title">
          {i18n.t('forgot_password.title')}
        </SecondLevelTitleStyle>
      )}
      <ForgotPasswordForm isPanel={panel} />
      {!panel && (
        <>
          <SmallSeparatorWithMarginStyle />
          <ExtraAltParagraphStyle>
            {i18n.t('forgot_password.return')}
            <RedLinkButtonStyle onClick={() => dispatch(modalShowLogin())}>
              {i18n.t('forgot_password.login_link')}
            </RedLinkButtonStyle>
          </ExtraAltParagraphStyle>
        </>
      )}
    </ForgotPasswordStyle>
  );
};
