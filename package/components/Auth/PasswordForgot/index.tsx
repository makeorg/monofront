import React, { FC, useEffect } from 'react';
import i18n from 'i18next';
import { SecondLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { SmallSeparatorWithMarginStyle } from '@make.org/ui/elements/SeparatorsElements';
import { RedLinkButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { setPanelContent } from '@make.org/store/actions/panel';
import { ExtraAltParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { useAppContext } from '@make.org/store';
import { trackDisplayForgotPasswordForm } from '@make.org/utils/services/Tracking';
import { PANEL_CONTENT } from '@make.org/store/actions/panel/panelContentEnum';
import { ForgotPasswordForm } from './Form';
import { ForgotPasswordStyle } from './style';

/**
 * Renders Forgot Password component
 */

export const PasswordForgot: FC = () => {
  const { dispatch, state } = useAppContext();
  const { pendingProposal } = state.pendingProposal;

  const content = () =>
    pendingProposal
      ? PANEL_CONTENT.PROPOSAL_AUTHENTICATION
      : PANEL_CONTENT.LOGIN;

  useEffect(() => {
    trackDisplayForgotPasswordForm();
  }, []);

  return (
    <ForgotPasswordStyle aria-labelledby="forgot_password_title">
      <SecondLevelTitleStyle id="forgot_password_title">
        {i18n.t('forgot_password.title')}
      </SecondLevelTitleStyle>
      <ForgotPasswordForm />
      <>
        <SmallSeparatorWithMarginStyle />
        <ExtraAltParagraphStyle>
          {i18n.t('forgot_password.return')}
          <RedLinkButtonStyle
            onClick={() => dispatch(setPanelContent(content()))}
          >
            {i18n.t('forgot_password.login_link')}
          </RedLinkButtonStyle>
        </ExtraAltParagraphStyle>
      </>
    </ForgotPasswordStyle>
  );
};
