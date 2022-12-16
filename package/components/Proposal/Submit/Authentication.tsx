/* eslint-disable prettier/prettier */
import React, { FC, useEffect } from 'react';
import i18n from 'i18next';
import { trackDisplayAuthenticationForm } from '@make.org/utils/services/Tracking';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { ProposalSubmitAuthenticationRegisterButtons } from '@make.org/components/Auth/Register/AuthenticationButtons/ProposalSubmitAuthenticationButtons';
import { Register } from '@make.org/components/Auth/Register';
import { Login } from '@make.org/components/Auth/Login/index';
import { getDataPageLink } from '@make.org/utils/helpers/url';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { useAppContext } from '@make.org/store';
import { setPanelContent } from '@make.org/store/actions/panel';
import { NewWindowGreyIconStyle } from '@make.org/ui/elements/LinkElements';
import {
  ProposalStepWrapperColumnStyle,
  ProposalBackButtonCenterStyle,
  ProposalAltStepTitleStyle,
  ProposalAuthLoginStyle,
  ProposalAuthLoginWrapperStyle,
  ProposalStepLabelRedStyle,
  DataPolicyWrapperStyle,
  DataPolicyNewWindowLinkStyle,
  ProposalStepWrapperStyle,
} from './style';
import { ProposalForm } from './Form';

export const ProposalAuthentication: FC = () => {
  const { state, dispatch } = useAppContext();
  const { country, language, source } = state.appConfig;
  const isWidget = source === 'widget';

  useEffect(() => {
    trackDisplayAuthenticationForm();
  }, []);

  return (
    <ProposalStepWrapperStyle isWidget={isWidget} isAuthentication>
      <ProposalStepWrapperColumnStyle isWidget={isWidget}>
        <ColumnElementStyle>
          <ProposalBackButtonCenterStyle
            isWidget={isWidget}
            onClick={() => dispatch(setPanelContent(<ProposalForm />))}
          >
            {i18n.t('proposal_submit.authentication.back')}{' '}
          </ProposalBackButtonCenterStyle>
          <ProposalAltStepTitleStyle isWidget={isWidget}>
            <ProposalStepLabelRedStyle>
              {i18n.t('proposal_submit.authentication.last_step_red')}{' '}
            </ProposalStepLabelRedStyle>
            {i18n.t('proposal_submit.authentication.last_step')}{' '}
          </ProposalAltStepTitleStyle>
          <ProposalSubmitAuthenticationRegisterButtons
            onEmailRegister={() => dispatch(setPanelContent(<Register />))}
          />
        </ColumnElementStyle>
        <ProposalAuthLoginWrapperStyle>
          {' '}
            {i18n.t('proposal_submit.authentication.button_login_text')}&nbsp;
          {' '}
          <ProposalAuthLoginStyle
            onClick={() => dispatch(setPanelContent(<Login />))}
          >
            {i18n.t('proposal_submit.authentication.button_login_link')}{' '}
          </ProposalAuthLoginStyle>
        </ProposalAuthLoginWrapperStyle>

        <DataPolicyWrapperStyle>
          {i18n.t('legal_consent.make_protect')}&nbsp;{' '}
          <DataPolicyNewWindowLinkStyle
            href={
              isWidget
                ? `https://make.org${getDataPageLink(country, language)}`
                : getDataPageLink(country, language)
            }
            target="_blank"
            rel="noopener"
          >
            {i18n.t('legal_consent.make_protect_link')}{' '}
            <NewWindowGreyIconStyle aria-hidden focusable="false" />
            <ScreenReaderItemStyle>
              {i18n.t('common.open_new_window')}{' '}
            </ScreenReaderItemStyle>
          </DataPolicyNewWindowLinkStyle>
        </DataPolicyWrapperStyle>
      </ProposalStepWrapperColumnStyle>
    </ProposalStepWrapperStyle>
  );
};
