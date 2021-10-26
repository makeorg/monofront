import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import { trackDisplayAuthenticationForm } from '@make.org/utils/services/Tracking';
import {
  CenterColumnStyle,
  ColumnElementStyle,
} from '@make.org/ui/elements/FlexElements';
import { AuthenticationRegisterButtons } from '@make.org/components/Auth/Register/Buttons';
import { Register } from '@make.org/components/Auth/Register';
import { Login } from '@make.org/components/Auth/Login';
import { RedLinkButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { PasswordForgot } from '@make.org/components/Auth/PasswordForgot';
import {
  ProposalSubmitAuthSeparator,
  SeparatorProposalAuthLogin,
  TextSeparatorStyle,
} from '@make.org/ui/elements/SeparatorsElements';
import { FacebookAuthentication } from '@make.org/components/Auth/Social/FacebookAuthentication';
import { GoogleAuthentication } from '@make.org/components/Auth/Social/GoogleAuthentication';
import { SocialRegisterButtonsWrapperStyle } from '../../Auth/style';
import {
  ProposalStepWrapperStyle,
  ProposalBackButtonStyle,
  ProposalBackIconWrapperStyle,
  ProposalBackIconStyle,
  ProposalAuthWrapperStyle,
  ProposalAltStepTitleStyle,
  ProposalAuthLoginStyle,
  ProposalAuthLoginWrapperStyle,
  ProposalAuthSocialLoginWrapperStyle,
  ProposalSubmitForgotPasswordWrapperStyle,
} from './style';

type Props = {
  handleStepBack: () => void;
  handleProposalAPICall: () => void;
};

enum AUTH_STEP {
  SOCIAL,
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
}

export const ProposalAuthentication: React.FC<Props> = ({
  handleStepBack,
  handleProposalAPICall,
}) => {
  const [authStep, setAuthStep] = useState(AUTH_STEP.SOCIAL);

  useEffect(() => {
    trackDisplayAuthenticationForm();
  }, []);

  if (authStep !== AUTH_STEP.SOCIAL) {
    return (
      <ProposalStepWrapperStyle>
        <CenterColumnStyle>
          <ProposalBackButtonStyle
            onClick={() => setAuthStep(AUTH_STEP.SOCIAL)}
          >
            <ProposalBackIconWrapperStyle>
              <ProposalBackIconStyle aria-hidden focusable="false" />
            </ProposalBackIconWrapperStyle>
            {i18n.t('common.back')}
          </ProposalBackButtonStyle>
          {authStep === AUTH_STEP.LOGIN && (
            <Login handleProposalAPICall={handleProposalAPICall} panel />
          )}
          {authStep === AUTH_STEP.REGISTER && (
            <Register handleProposalAPICall={handleProposalAPICall} panel />
          )}
          {authStep === AUTH_STEP.FORGOT_PASSWORD && (
            <PasswordForgot
              panel
              loginStep={() => setAuthStep(AUTH_STEP.LOGIN)}
            />
          )}
          {authStep === AUTH_STEP.LOGIN && (
            <>
              <ProposalSubmitForgotPasswordWrapperStyle>
                {i18n.t('login.forgot_password_title')}
                <RedLinkButtonStyle
                  onClick={() => setAuthStep(AUTH_STEP.FORGOT_PASSWORD)}
                  type="button"
                >
                  {i18n.t('login.forgot_password_link')}
                </RedLinkButtonStyle>
              </ProposalSubmitForgotPasswordWrapperStyle>
              <ProposalAuthSocialLoginWrapperStyle>
                <SeparatorProposalAuthLogin>
                  <ProposalSubmitAuthSeparator />
                  <TextSeparatorStyle>
                    {i18n.t('register.or')}
                  </TextSeparatorStyle>
                  <ProposalSubmitAuthSeparator />
                </SeparatorProposalAuthLogin>
                <SocialRegisterButtonsWrapperStyle>
                  <FacebookAuthentication
                    handleProposalAPICall={handleProposalAPICall}
                  />
                  <GoogleAuthentication
                    handleProposalAPICall={handleProposalAPICall}
                  />
                </SocialRegisterButtonsWrapperStyle>
              </ProposalAuthSocialLoginWrapperStyle>
            </>
          )}
        </CenterColumnStyle>
      </ProposalStepWrapperStyle>
    );
  }

  return (
    <ProposalStepWrapperStyle>
      <ColumnElementStyle>
        <ProposalBackButtonStyle onClick={handleStepBack}>
          <ProposalBackIconWrapperStyle>
            <ProposalBackIconStyle aria-hidden focusable="false" />
          </ProposalBackIconWrapperStyle>
          {i18n.t('proposal_submit.authentication.button_back')}
        </ProposalBackButtonStyle>
        <ProposalAuthWrapperStyle>
          <ProposalAltStepTitleStyle className="center">
            {i18n.t('proposal_submit.authentication.title')}
          </ProposalAltStepTitleStyle>
          <AuthenticationRegisterButtons
            handleProposalAPICall={handleProposalAPICall}
            onEmailRegister={() => setAuthStep(AUTH_STEP.REGISTER)}
          />
        </ProposalAuthWrapperStyle>
      </ColumnElementStyle>
      <ProposalAuthLoginWrapperStyle>
        {i18n.t('proposal_submit.authentication.button_login_text')}{' '}
        <ProposalAuthLoginStyle onClick={() => setAuthStep(AUTH_STEP.LOGIN)}>
          {i18n.t('proposal_submit.authentication.button_login_link')}
        </ProposalAuthLoginStyle>
      </ProposalAuthLoginWrapperStyle>
    </ProposalStepWrapperStyle>
  );
};
