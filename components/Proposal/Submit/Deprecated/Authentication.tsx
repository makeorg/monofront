import React, { FC, useEffect } from 'react';
import i18n from 'i18next';
import { trackDisplayAuthenticationForm } from '@make.org/utils/services/Tracking';
import {
  CenterColumnStyle,
  ColumnElementStyle,
} from '@make.org/ui/elements/FlexElements';
import { AuthenticationRegisterButtons } from '@make.org/components/Auth/Register/Buttons';
import { Register } from '@make.org/components/Auth/Register';
import { DeprecatedLogin as Login } from '@make.org/components/Auth/Login/Deprecated/index';
import { RedLinkButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { PasswordForgot } from '@make.org/components/Auth/PasswordForgot';
import {
  ProposalSubmitAuthSeparator,
  SeparatorProposalAuthLogin,
  TextSeparatorStyle,
} from '@make.org/ui/elements/SeparatorsElements';
import { FacebookAuthentication } from '@make.org/components/Auth/Social/FacebookAuthentication';
import { GoogleAuthentication } from '@make.org/components/Auth/Social/GoogleAuthentication';
import { useAppContext } from '@make.org/store';
import { AUTH_STEP } from '@make.org/types/enums';
import {
  modifyProposalPending,
  resetProposalAuthStep,
  setProposalAuthStep,
} from '@make.org/store/actions/pendingProposal';
import { Dispatch } from '@make.org/types';
import { SocialRegisterButtonsWrapperStyle } from '../../../Auth/style';
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

const renderAuthStep = (step: string, dispatch: Dispatch) => {
  switch (step) {
    case AUTH_STEP.LOGIN:
      return (
        <>
          <Login panel />
          <ProposalSubmitForgotPasswordWrapperStyle>
            {i18n.t('login.forgot_password_title')}
            <RedLinkButtonStyle
              onClick={() =>
                dispatch(setProposalAuthStep(AUTH_STEP.FORGOT_PASSWORD))
              }
              type="button"
            >
              {i18n.t('login.forgot_password_link')}
            </RedLinkButtonStyle>
          </ProposalSubmitForgotPasswordWrapperStyle>
          <ProposalAuthSocialLoginWrapperStyle>
            <SeparatorProposalAuthLogin>
              <ProposalSubmitAuthSeparator />
              <TextSeparatorStyle>{i18n.t('register.or')}</TextSeparatorStyle>
              <ProposalSubmitAuthSeparator />
            </SeparatorProposalAuthLogin>
            <SocialRegisterButtonsWrapperStyle>
              <FacebookAuthentication />
              <GoogleAuthentication />
            </SocialRegisterButtonsWrapperStyle>
          </ProposalAuthSocialLoginWrapperStyle>
        </>
      );
    case AUTH_STEP.REGISTER:
      return <Register panel />;
    case AUTH_STEP.FORGOT_PASSWORD:
      return (
        <PasswordForgot
          loginStep={() => dispatch(setProposalAuthStep(AUTH_STEP.LOGIN))}
          panel
        />
      );
    default:
      return null;
  }
};

export const DeprecatedProposalAuthentication: FC = () => {
  const { state, dispatch } = useAppContext();
  const { step } = state.pendingProposal.authMode;

  useEffect(() => {
    trackDisplayAuthenticationForm();
  }, []);

  if (step) {
    return (
      <ProposalStepWrapperStyle>
        <CenterColumnStyle>
          <ProposalBackButtonStyle
            onClick={() => dispatch(resetProposalAuthStep())}
          >
            <ProposalBackIconWrapperStyle>
              <ProposalBackIconStyle aria-hidden focusable="false" />
            </ProposalBackIconWrapperStyle>
            {i18n.t('common.back')}
          </ProposalBackButtonStyle>
          {renderAuthStep(step, dispatch)}
        </CenterColumnStyle>
      </ProposalStepWrapperStyle>
    );
  }

  return (
    <ProposalStepWrapperStyle>
      <ColumnElementStyle>
        <ProposalBackButtonStyle
          onClick={() => dispatch(modifyProposalPending())}
        >
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
            onEmailRegister={() =>
              dispatch(setProposalAuthStep(AUTH_STEP.REGISTER))
            }
          />
        </ProposalAuthWrapperStyle>
      </ColumnElementStyle>
      <ProposalAuthLoginWrapperStyle>
        {i18n.t('proposal_submit.authentication.button_login_text')}{' '}
        <ProposalAuthLoginStyle
          onClick={() => dispatch(setProposalAuthStep(AUTH_STEP.LOGIN))}
        >
          {i18n.t('proposal_submit.authentication.button_login_link')}
        </ProposalAuthLoginStyle>
      </ProposalAuthLoginWrapperStyle>
    </ProposalStepWrapperStyle>
  );
};
