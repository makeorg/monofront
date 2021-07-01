import React, { useEffect } from 'react';
import { i18n } from '@make.org/utils/i18n';
import { getDataPageLink } from '@make.org/utils/helpers/url';
import {
  trackClickPersonnalDataLink,
  trackDisplayAuthenticationForm,
} from '@make.org/utils/services/Tracking';

import { Link } from 'react-router-dom';

import { StateRoot } from 'Shared/store/types';
import { ColumnElementStyle } from 'Client/ui/Elements/FlexElements';
import { AuthenticationRegisterButtons } from 'Client/features/auth/Register/Buttons';
import { useSelector, useDispatch } from 'react-redux';
import {
  closePanel,
  removePanelContent,
} from 'Shared/store/reducers/panel/actions';
import { modalShowLogin } from 'Shared/store/actions/modal';
import { selectAuthentication } from 'Shared/store/selectors/user.selector';
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

export const ProposalAuthentication: React.FC = ({
  handleStepBack,
  handleCancel,
  handleProposeAPICall,
}: Props) => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state: StateRoot) =>
    selectAuthentication(state)
  );
  const { country, language } = useSelector(
    (state: StateRoot) => state.appConfig
  );
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
