import React, { FC, useEffect } from 'react';
import i18n from 'i18next';
import { trackDisplayAuthenticationForm } from '@make.org/utils/services/Tracking';
import {
  CenterColumnStyle,
  ColumnElementStyle,
} from '@make.org/ui/elements/FlexElements';
import { AuthenticationRegisterButtons } from '@make.org/components/Auth/Register/Buttons';
import { Register } from '@make.org/components/Auth/Register';
import { Login } from '@make.org/components/Auth/Login/index';
import { PasswordForgot } from '@make.org/components/Auth/PasswordForgot';
import {
  ProposalSubmitAuthSeparator,
  SeparatorProposalAuthLogin,
  TextSeparatorStyle,
} from '@make.org/ui/elements/SeparatorsElements';
import { getDataPageLink } from '@make.org/utils/helpers/url';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
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
import { SocialRegisterButtonsWrapperStyle } from '../../Auth/style';
import {
  ProposalStepWrapperStyle,
  ProposalStepWrapperColumnStyle,
  ProposalBackButtonStyle,
  ProposalBackButtonCenterStyle,
  ProposalAuthWrapperStyle,
  ProposalAltStepTitleStyle,
  ProposalAuthLoginStyle,
  ProposalAuthLoginWrapperStyle,
  ProposalAuthSocialLoginWrapperStyle,
  ProposalStepLabelRedStyle,
  DataPolicyWrapperStyle,
  NewWindowIconStyle,
  DataPolicyNewWindowLinkStyle,
} from './style';

const renderAuthStep = (step: string, dispatch: Dispatch) => {
  switch (step) {
    case AUTH_STEP.LOGIN:
      return (
        <>
          <Login panel />
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

export const ProposalAuthentication: FC = () => {
  const { state, dispatch } = useAppContext();
  const { country, language, source } = state.appConfig;
  const isWidget = source === 'widget';
  const { step } = state.pendingProposal.authMode;
  const { firstname } = state.pendingProposal;

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
            {i18n.t('common.back')}
          </ProposalBackButtonStyle>
          {renderAuthStep(step, dispatch)}
        </CenterColumnStyle>
      </ProposalStepWrapperStyle>
    );
  }

  return (
    <ProposalStepWrapperColumnStyle>
      <ColumnElementStyle>
        <ProposalBackButtonCenterStyle
          onClick={() => dispatch(modifyProposalPending())}
        >
          {i18n.t('proposal_submit.authentication.back')}
        </ProposalBackButtonCenterStyle>
        <ProposalAuthWrapperStyle>
          <ProposalAltStepTitleStyle className="center">
            {firstname}
            {', '}
            <ProposalStepLabelRedStyle>
              {i18n.t('proposal_submit.authentication.last_step_red')}
            </ProposalStepLabelRedStyle>
            {i18n.t('proposal_submit.authentication.last_step')}
          </ProposalAltStepTitleStyle>
          <AuthenticationRegisterButtons
            onEmailRegister={() =>
              dispatch(setProposalAuthStep(AUTH_STEP.REGISTER))
            }
          />
        </ProposalAuthWrapperStyle>
      </ColumnElementStyle>
      <ProposalAuthLoginWrapperStyle>
        <ProposalAuthLoginStyle
          onClick={() => dispatch(setProposalAuthStep(AUTH_STEP.LOGIN))}
        >
          {i18n.t('proposal_submit.authentication.button_login')}
        </ProposalAuthLoginStyle>
      </ProposalAuthLoginWrapperStyle>
      <DataPolicyWrapperStyle>
        {i18n.t('legal_consent.make_protect')}{' '}
        <DataPolicyNewWindowLinkStyle
          href={
            isWidget
              ? `https://make.org${getDataPageLink(country, language)}`
              : getDataPageLink(country, language)
          }
          target="_blank"
          rel="noopener"
        >
          {i18n.t('legal_consent.make_protect_link')}
          <> </>
          <NewWindowIconStyle aria-hidden focusable="false" />
          <ScreenReaderItemStyle>
            {i18n.t('common.open_new_window')}
          </ScreenReaderItemStyle>
        </DataPolicyNewWindowLinkStyle>
      </DataPolicyWrapperStyle>
    </ProposalStepWrapperColumnStyle>
  );
};
