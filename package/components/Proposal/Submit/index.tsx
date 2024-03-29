import React from 'react';
import i18n from 'i18next';
import { setPanelContent } from '@make.org/store/actions/panel';
import { useAppContext } from '@make.org/store';
import { clearProposalPending } from '@make.org/store/actions/pendingProposal';
import { PANEL_CONTENT } from '@make.org/store/actions/panel/panelContentEnum';
import { PanelTriggerStyle, TriggerIconStyle } from './style';

export const ProposalSubmit: React.FC = () => {
  const { dispatch } = useAppContext();

  return (
    <PanelTriggerStyle
      onClick={() => {
        dispatch(clearProposalPending());
        dispatch(setPanelContent(PANEL_CONTENT.PROPOSAL_JOURNEY));
      }}
      data-cy-button="proposal-panel"
    >
      <TriggerIconStyle aria-hidden focusable="false" />
      <>{i18n.t('proposal_submit.form.panel_trigger')}</>
    </PanelTriggerStyle>
  );
};
