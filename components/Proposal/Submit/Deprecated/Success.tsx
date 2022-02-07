import React, { useEffect } from 'react';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { closePanel } from '@make.org/store/actions/panel';
import {
  trackClickKeepVoting,
  trackDisplayProposalSubmitValidation,
} from '@make.org/utils/services/Tracking';
import { ProposalFormWrapperStyle } from '@make.org/components/Proposal/Submit/style';
import { CenterColumnStyle } from '@make.org/ui/elements/FlexElements';
import { clearProposalPending } from '@make.org/store/actions/pendingProposal';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import {
  ProposalSuccessWrapperStyle,
  ProposalSuccessTitleStyle,
  ProposalSuccessParagraphStyle,
  ProposalSuccessIconStyle,
  ProposalSuccessRegisterStyle,
  ProposalSuccessRedButtonStyle,
} from '../style';

type Props = {
  // eslint-disable-next-line react/require-default-props
  isRegister?: boolean;
};

export const DeprecatedProposalSuccess: React.FC<Props> = ({ isRegister }) => {
  const { state, dispatch } = useAppContext();
  const { user } = selectAuthentication(state);
  const { source } = state.appConfig;
  const isWidget = source === 'widget';

  const handleCloseButton = () => {
    dispatch(closePanel());
    trackClickKeepVoting();
  };

  useEffect(() => {
    trackDisplayProposalSubmitValidation();
    dispatch(clearProposalPending());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProposalFormWrapperStyle isWidget={isWidget}>
      <CenterColumnStyle>
        <ProposalSuccessWrapperStyle as="section">
          {isRegister && (
            <ProposalSuccessRegisterStyle>
              {i18n.t('common.notifications.register_validate', {
                email: user?.email,
              })}
            </ProposalSuccessRegisterStyle>
          )}
          <ProposalSuccessIconStyle aria-hidden focusable="false" />
          <ProposalSuccessTitleStyle>
            {i18n.t('proposal_submit.success.title', {
              name: user?.profile.firstName || '',
            })}
          </ProposalSuccessTitleStyle>
          <ProposalSuccessParagraphStyle>
            {i18n.t('proposal_submit.success.description')}
          </ProposalSuccessParagraphStyle>
          <ProposalSuccessRedButtonStyle onClick={handleCloseButton}>
            {i18n.t('proposal_submit.success.button')}
          </ProposalSuccessRedButtonStyle>
        </ProposalSuccessWrapperStyle>
      </CenterColumnStyle>
    </ProposalFormWrapperStyle>
  );
};
