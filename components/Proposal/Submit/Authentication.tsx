/* eslint-disable prettier/prettier */
import React, { FC, useEffect } from 'react';
import i18n from 'i18next';
import { trackDisplayAuthenticationForm } from '@make.org/utils/services/Tracking';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { AuthenticationRegisterButtons } from '@make.org/components/Auth/Register/Buttons';
import { Register } from '@make.org/components/Auth/Register';
import { Login } from '@make.org/components/Auth/Login/index';
import { PasswordForgot } from '@make.org/components/Auth/PasswordForgot';
import {
  ProposalSubmitAuthSeparator,
  SeparatorProposalAuthLogin,
  TextSeparatorStyle,
} from '@make.org/ui/elements/SeparatorsElements';
import BlueShape from '@make.org/assets/images/blueShape.png';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
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
  ProposalFormWrapperStyle,
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
  ProposalStepWrapperStyle,
  BlueShapeImageStyle,
  BlueManWalking,
  ProposalImagesWrapperStyle,
  LoginWrapperStyle,
} from './style';

const renderAuthStep = (step: string | undefined, dispatch: Dispatch) => {
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
      return <Register proposalSubmit />;
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
  const { country, language, source, device } = state.appConfig;
  const isWidget = source === 'widget';
  const { step } = state.pendingProposal.authMode;
  const isMobile = matchMobileDevice(device);

  useEffect(() => {
    trackDisplayAuthenticationForm();
  }, []);

  if (step) {
    return (
      <ProposalFormWrapperStyle isWidget={isWidget}>
        <LoginWrapperStyle isWidget={isWidget}>
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
        </LoginWrapperStyle>
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
            <ProposalAuthWrapperStyle>
              <ProposalAltStepTitleStyle isWidget={isWidget}>
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
              <> </>
              <NewWindowIconStyle aria-hidden focusable="false" />
              <ScreenReaderItemStyle>
                {i18n.t('common.open_new_window')}
              </ScreenReaderItemStyle>
            </DataPolicyNewWindowLinkStyle>
          </DataPolicyWrapperStyle>
        </ProposalStepWrapperColumnStyle>
        {!isWidget && !isMobile && (
          <BlueManWalking aria-hidden focusable="false" />
        )}
      </ProposalStepWrapperStyle>
      {!isWidget && isMobile && (
        <ProposalImagesWrapperStyle>
          <BlueManWalking aria-hidden focusable="false" />
          <BlueShapeImageStyle src={BlueShape} alt="" />
        </ProposalImagesWrapperStyle>
      )}
      {!isWidget && !isMobile && <BlueShapeImageStyle src={BlueShape} alt="" />}
    </>
  );
};
