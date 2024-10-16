import React from 'react';
import i18n from 'i18next';
import { ExtraBlackParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { RedLinkButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { useAppContext } from '@make.org/store';
import { setPanelContent } from '@make.org/store/actions/panel';
import {
  ProposalSubmitAuthSeparator,
  SeparatorProposalAuthLogin,
  TextSeparatorStyle,
} from '@make.org/ui/elements/SeparatorsElements';
import { FacebookAuthentication } from '@make.org/components/Auth/Social/FacebookAuthentication';
import { GoogleAuthentication } from '@make.org/components/Auth/Social/GoogleAuthentication';
import { env } from '@make.org/assets/env';
import { setSocialConnect } from '@make.org/utils/helpers/social';
import { PANEL_CONTENT } from '@make.org/store/actions/panel/panelContentEnum';
import { ILogger } from '@make.org/types';
import {
  ProposalAuthSocialLoginWrapperStyle,
  ProposalBackButtonStyle,
} from '../../Proposal/Submit/style';
import {
  AuthenticationWrapperStyle,
  LoginTitleWrapperStyle,
  SocialRegisterButtonsWrapperStyle,
} from '../style';
import { LoginForm } from './Form';

type Props = {
  logger: ILogger;
};

export const Login: React.FC<Props> = ({ logger }) => {
  const { dispatch, state } = useAppContext();
  const { pendingProposal } = state.pendingProposal;
  const FRONT_URL = env.frontUrl() || window.FRONT_URL;

  return (
    <AuthenticationWrapperStyle
      aria-labelledby="login_title"
      data-cy-container="authentication"
    >
      {pendingProposal && (
        <ProposalBackButtonStyle
          onClick={() =>
            dispatch(setPanelContent(PANEL_CONTENT.PROPOSAL_AUTHENTICATION))
          }
        >
          {i18n.t('common.back')}
        </ProposalBackButtonStyle>
      )}
      <LoginTitleWrapperStyle
        as="h3"
        className="proposalSubmit"
        data-cy-container="login-panel-title"
      >
        {i18n.t('login.connect')}
      </LoginTitleWrapperStyle>
      <LoginForm />
      <ProposalAuthSocialLoginWrapperStyle>
        {setSocialConnect(FRONT_URL) && (
          <>
            <SeparatorProposalAuthLogin>
              <ProposalSubmitAuthSeparator />
              <TextSeparatorStyle>{i18n.t('register.or')}</TextSeparatorStyle>
              <ProposalSubmitAuthSeparator />
            </SeparatorProposalAuthLogin>
            <SocialRegisterButtonsWrapperStyle>
              <GoogleAuthentication isRegister={false} logger={logger} />
              <FacebookAuthentication logger={logger} />
            </SocialRegisterButtonsWrapperStyle>
          </>
        )}
      </ProposalAuthSocialLoginWrapperStyle>
      {!pendingProposal && (
        <ExtraBlackParagraphStyle>
          {i18n.t('login.registration_title')}
          <RedLinkButtonStyle
            onClick={() => dispatch(setPanelContent(PANEL_CONTENT.REGISTER))}
            type="button"
            data-cy-button="register"
          >
            {i18n.t('login.registration_link')}
          </RedLinkButtonStyle>
        </ExtraBlackParagraphStyle>
      )}
    </AuthenticationWrapperStyle>
  );
};
