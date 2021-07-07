import React, { useEffect } from 'react';
import { i18n } from '@make.org/utils/i18n';
import { getDataPageLink } from '@make.org/utils/helpers/url';
import {
  trackClickPersonnalDataLink,
  trackDisplayAuthenticationForm,
} from '@make.org/utils/services/Tracking';
import { Link } from 'react-router-dom';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { useAppContext } from '@make.org/store';
import { closePanel, removePanelContent } from '@make.org/store/actions/panel';
import { modalShowLogin } from '@make.org/store/actions/modal';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';

import { AuthenticationRegisterButtons } from '@make.org/components/Auth/Register/Buttons';
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

export const ProposalAuthentication: React.FC<Props> = ({
  handleStepBack,
  handleCancel,
  handleProposeAPICall,
}) => {
  const { state, dispatch } = useAppContext();
  const { isLoggedIn, user } = selectAuthentication(state);
  const { country, language } = state.appConfig;

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
          <AuthenticationRegisterButtons />
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
          <ProposalAuthLoginStyle onClick={() => dispatch(modalShowLogin())}>
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
