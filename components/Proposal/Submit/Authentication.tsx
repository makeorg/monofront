import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import { getDataPageLink } from '@make.org/utils/helpers/url';
import {
  trackClickPersonnalDataLink,
  trackDisplayAuthenticationForm,
} from '@make.org/utils/services/Tracking';
import { Link } from 'react-router-dom';
import {
  CenterColumnStyle,
  ColumnElementStyle,
} from '@make.org/ui/elements/FlexElements';
import { useAppContext } from '@make.org/store';
import { closePanel, removePanelContent } from '@make.org/store/actions/panel';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import { AuthenticationRegisterButtons } from '@make.org/components/Auth/Register/Buttons';
import { Register } from '@make.org/components/Auth/Register';
import { Login } from '@make.org/components/Auth/Login';
import { ExtraParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { RedLinkButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { PasswordForgot } from '@make.org/components/Auth/PasswordForgot';
import {
  ProposalStepWrapperStyle,
  ProposalBackButtonStyle,
  ProposalBackIconWrapperStyle,
  ProposalBackIconStyle,
  ProposalAuthWrapperStyle,
  ProposalAltStepTitleStyle,
  ProposalAuthDisclaimerStyle,
  ProposalAuthSeparatorStyle,
  ProposalAuthLoginStyle,
  ProposalAuthCancelStyle,
} from './style';

type Props = {
  handleStepBack: () => void;
  handleCancel: () => void;
  handleProposeAPICall: () => void;
};

enum AUTH_STEP {
  SOCIAL,
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
}

export const ProposalAuthentication: React.FC<Props> = ({
  handleStepBack,
  handleCancel,
  handleProposeAPICall,
}) => {
  const { state, dispatch } = useAppContext();
  const { isLoggedIn, user } = selectAuthentication(state) || {};
  const { country, language } = state.appConfig;
  const [authStep, setAuthStep] = useState(AUTH_STEP.SOCIAL);

  const handleModerationLink = () => {
    dispatch(closePanel());
    dispatch(removePanelContent());
    trackClickPersonnalDataLink();
  };

  useEffect(() => {
    trackDisplayAuthenticationForm();
  }, []);

  useEffect(() => {
    if (isLoggedIn && user && user.profile) {
      handleProposeAPICall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, user]);

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
          {authStep === AUTH_STEP.LOGIN && <Login panel />}
          {authStep === AUTH_STEP.REGISTER && <Register panel />}
          {authStep === AUTH_STEP.FORGOT_PASSWORD && <PasswordForgot panel />}
          {authStep === AUTH_STEP.LOGIN && (
            <ExtraParagraphStyle>
              {i18n.t('login.forgot_password_title')}
              <RedLinkButtonStyle
                onClick={() => setAuthStep(AUTH_STEP.FORGOT_PASSWORD)}
                type="button"
              >
                {i18n.t('login.forgot_password_link')}
              </RedLinkButtonStyle>
            </ExtraParagraphStyle>
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
          <ProposalAuthDisclaimerStyle className="with-margin-top">
            {i18n.t('proposal_submit.authentication.subtitle')}
          </ProposalAuthDisclaimerStyle>
          <AuthenticationRegisterButtons
            onEmailRegister={() => setAuthStep(AUTH_STEP.REGISTER)}
          />
          <ProposalAuthDisclaimerStyle>
            {i18n.t('authentication.commitment')}
            <Link
              to={getDataPageLink(country, language)}
              onClick={handleModerationLink}
            >
              {i18n.t('authentication.personal_data')}
            </Link>
          </ProposalAuthDisclaimerStyle>
          <ProposalAuthSeparatorStyle />
          <ProposalAuthLoginStyle onClick={() => setAuthStep(AUTH_STEP.LOGIN)}>
            {i18n.t('proposal_submit.authentication.button_login')}
          </ProposalAuthLoginStyle>
        </ProposalAuthWrapperStyle>
      </ColumnElementStyle>
      <ProposalAuthCancelStyle onClick={handleCancel}>
        {i18n.t('proposal_submit.form.button_cancel')}
      </ProposalAuthCancelStyle>
    </ProposalStepWrapperStyle>
  );
};
