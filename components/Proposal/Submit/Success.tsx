import React from 'react';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { closePanel } from '@make.org/store/actions/panel';
import { trackClickKeepVoting } from '@make.org/utils/services/Tracking';
import { ProposalStepWrapperStyle } from '@make.org/components/Proposal/Submit/style';
import { CenterColumnStyle } from '@make.org/ui/elements/FlexElements';
import {
  ProposalSuccessWrapperStyle,
  ProposalSuccessTitleStyle,
  ProposalSuccessParagraphStyle,
  ProposalSuccessIconStyle,
  ProposalSuccessRegisterStyle,
  ProposalSuccessRedButtonStyle,
} from './style';

type Props = {
  firstname?: string;
  email?: string;
  isRegister?: boolean;
};

export const ProposalSuccess: React.FC<Props> = ({
  firstname,
  email,
  isRegister,
}) => {
  const { dispatch } = useAppContext();
  const handleCloseButton = () => {
    dispatch(closePanel());
    trackClickKeepVoting();
  };

  return (
    <ProposalStepWrapperStyle>
      <CenterColumnStyle>
        <ProposalSuccessWrapperStyle as="section">
          {isRegister && (
            <ProposalSuccessRegisterStyle>
              {i18n.t('common.notifications.register_validate', {
                email: email && email,
              })}
            </ProposalSuccessRegisterStyle>
          )}
          <ProposalSuccessIconStyle aria-hidden focusable="false" />
          <ProposalSuccessTitleStyle>
            {i18n.t('proposal_submit.success.title', {
              name: firstname || '',
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
    </ProposalStepWrapperStyle>
  );
};
