import React from 'react';
import { i18n } from '@make.org/utils/i18n';
import { useDispatch } from 'react-redux';
import { setPanelContent } from 'Shared/store/reducers/panel/actions';
import { ProposalJourney } from './Journey';
import { PanelTriggerStyle, TriggerIconStyle } from './style';

export const ProposalSubmit: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <PanelTriggerStyle
      onClick={() => dispatch(setPanelContent(<ProposalJourney />))}
      data-cy-button="proposal-panel"
    >
      <TriggerIconStyle aria-hidden focusable="false" />
      {i18n.t('proposal_submit.form.panel_trigger')}
    </PanelTriggerStyle>
  );
};
