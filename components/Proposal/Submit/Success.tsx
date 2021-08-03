import React from 'react';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { modalClose } from '@make.org/store/actions/modal';
import { trackClickKeepVoting } from '@make.org/utils/services/Tracking';
import {
  ProposalSuccessWrapperStyle,
  ProposalSuccessTitleStyle,
  ProposalSuccessParagraphStyle,
  ProposalSuccessIconStyle,
} from './style';

export const ProposalSuccess: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { user } = selectAuthentication(state);
  const handleCloseButton = () => {
    dispatch(modalClose());
    trackClickKeepVoting();
  };

  return (
    <ProposalSuccessWrapperStyle as="section">
      <ProposalSuccessIconStyle aria-hidden focusable="false" />
      <ProposalSuccessTitleStyle>
        {i18n.t('proposal_submit.success.title', {
          name: !!user && 'displayName' in user ? user.displayName : '',
        })}
      </ProposalSuccessTitleStyle>
      <ProposalSuccessParagraphStyle>
        {i18n.t('proposal_submit.success.description')}
      </ProposalSuccessParagraphStyle>
      <RedButtonStyle onClick={handleCloseButton}>
        {i18n.t('proposal_submit.success.button')}
      </RedButtonStyle>
    </ProposalSuccessWrapperStyle>
  );
};
