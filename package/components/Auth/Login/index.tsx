import React from 'react';
import i18n from 'i18next';
import { ExtraBlackParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { RedLinkButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { useAppContext } from '@make.org/store';
import { Register } from '@make.org/components/Auth/Register';
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
import { ProposalAuthentication } from '../../Proposal/Submit/Authentication';

export const Login: React.FC = () => {
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
          onClick={() => dispatch(setPanelContent(<ProposalAuthentication />))}
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
              <GoogleAuthentication isRegister={false} />
              <FacebookAuthentication />
            </SocialRegisterButtonsWrapperStyle>
          </>
        )}
      </ProposalAuthSocialLoginWrapperStyle>
      {!pendingProposal && (
        <ExtraBlackParagraphStyle>
          {i18n.t('login.registration_title')}
          <RedLinkButtonStyle
            onClick={() => dispatch(setPanelContent(<Register />))}
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
