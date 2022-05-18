/* eslint-disable prettier/prettier */
import React, { FC, useEffect } from 'react';
import i18n from 'i18next';
import { trackDisplayAuthenticationForm } from '@make.org/utils/services/Tracking';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { ProposalSubmitAuthenticationRegisterButtons } from '@make.org/components/Auth/Register/AuthenticationButtons/ProposalSubmitAuthenticationButtons';
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
import { NewWindowGreyIconStyle } from '@make.org/ui/elements/LinkElements';
import { SocialRegisterButtonsWrapperStyle } from '../../Auth/style';
import {
  ProposalFormWrapperStyle,
  ProposalStepWrapperColumnStyle,
  ProposalBackButtonStyle,
  ProposalBackButtonCenterStyle,
  ProposalAltStepTitleStyle,
  ProposalAuthLoginStyle,
  ProposalAuthLoginWrapperStyle,
  ProposalAuthSocialLoginWrapperStyle,
  ProposalStepLabelRedStyle,
  DataPolicyWrapperStyle,
  DataPolicyNewWindowLinkStyle,
  ProposalStepWrapperStyle,
} from './style';

const renderAuthStep = (step: string | undefined, dispatch: Dispatch) => {
  switch (step) {
    case AUTH_STEP.LOGIN:
      return (
        <>
          <Login isProposalSubmit />
          <ProposalAuthSocialLoginWrapperStyle>
            <SeparatorProposalAuthLogin>
              <ProposalSubmitAuthSeparator />
              <TextSeparatorStyle>{i18n.t('register.or')}</TextSeparatorStyle>
              <ProposalSubmitAuthSeparator />
            </SeparatorProposalAuthLogin>
            <SocialRegisterButtonsWrapperStyle>
              <GoogleAuthentication />
              <FacebookAuthentication />
            </SocialRegisterButtonsWrapperStyle>
          </ProposalAuthSocialLoginWrapperStyle>
        </>
      );
    case AUTH_STEP.REGISTER:
      return <Register isProposalSubmit />;
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

  useEffect(() => {
    trackDisplayAuthenticationForm();
  }, []);

  if (step) {
    return (
      <ProposalFormWrapperStyle isWidget={isWidget}>
        <ProposalBackButtonStyle
          onClick={() =>
            step === AUTH_STEP.FORGOT_PASSWORD
              ? dispatch(setProposalAuthStep(AUTH_STEP.LOGIN))
              : dispatch(resetProposalAuthStep())
          }
        >
          {i18n.t('common.back')}
        </ProposalBackButtonStyle>
        {renderAuthStep(step, dispatch)}
      </ProposalFormWrapperStyle>
    );
  }

  return (
    <>
      <ProposalStepWrapperStyle isWidget={isWidget} isAuthentication>
        <ProposalStepWrapperColumnStyle isWidget={isWidget}>
          <ColumnElementStyle>
            <ProposalBackButtonCenterStyle
              isWidget={isWidget}
              onClick={() => dispatch(modifyProposalPending())}
            >
              {i18n.t('proposal_submit.authentication.back')}
            </ProposalBackButtonCenterStyle>
            <ProposalAltStepTitleStyle isWidget={isWidget}>
              <ProposalStepLabelRedStyle>
                {i18n.t('proposal_submit.authentication.last_step_red')}
              </ProposalStepLabelRedStyle>
              {i18n.t('proposal_submit.authentication.last_step')}
            </ProposalAltStepTitleStyle>
            <ProposalSubmitAuthenticationRegisterButtons
              onEmailRegister={() =>
                dispatch(setProposalAuthStep(AUTH_STEP.REGISTER))
              }
            />
          </ColumnElementStyle>
          <ProposalAuthLoginWrapperStyle>
            {i18n.t('proposal_submit.authentication.button_login_text')}&nbsp;
            <ProposalAuthLoginStyle
              onClick={() => dispatch(setProposalAuthStep(AUTH_STEP.LOGIN))}
            >
              {i18n.t('proposal_submit.authentication.button_login_link')}
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
              <NewWindowGreyIconStyle aria-hidden focusable="false" />
              <ScreenReaderItemStyle>
                {i18n.t('common.open_new_window')}
              </ScreenReaderItemStyle>
            </DataPolicyNewWindowLinkStyle>
          </DataPolicyWrapperStyle>
        </ProposalStepWrapperColumnStyle>
      </ProposalStepWrapperStyle>
    </>
  );
};
