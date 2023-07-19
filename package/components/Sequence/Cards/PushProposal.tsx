import React, { useEffect } from 'react';
import {
  trackDisplayProposalPushCard,
  trackClickProposalPushCardIgnore,
} from '@make.org/utils/services/Tracking';
import i18n from 'i18next';
import { PencilIconStyle } from '@make.org/ui/elements/SvgElements';
import { MiddleColumnToRowStyle } from '@make.org/ui/elements/FlexElements';
import { incrementSequenceIndex } from '@make.org/store/actions/sequence';
import { setPanelContent } from '@make.org/store/actions/panel';
import { useAppContext } from '@make.org/store';
import {
  clearProposalPending,
  setProposalSource,
} from '@make.org/store/actions/pendingProposal';
import { PANEL_CONTENT } from '@make.org/store/actions/panel/panelContentEnum';
import {
  SequenceIntroParagraphStyle,
  SequencePushProposalButtonStyle,
  PushProposalWrapperStyle,
  SequencePushProposalNextButtonStyle,
  SkipIconStyle,
} from './style';
/**
 * Handles Push Proposal Card Business Logic
 */
export const PushProposalCard: React.FC = () => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    trackDisplayProposalPushCard();
  }, []);

  return (
    <PushProposalWrapperStyle>
      <SequenceIntroParagraphStyle className="with-margin-bottom">
        {i18n.t('push_proposal_card.title')}
      </SequenceIntroParagraphStyle>
      <MiddleColumnToRowStyle column>
        <SequencePushProposalButtonStyle
          onClick={() => {
            dispatch(clearProposalPending());
            dispatch(setProposalSource('from-proposal-push-card'));
            dispatch(setPanelContent(PANEL_CONTENT.PROPOSAL_JOURNEY));
          }}
        >
          <PencilIconStyle aria-hidden focusable="false" />
          {i18n.t('common.propose')}
        </SequencePushProposalButtonStyle>
        <SequencePushProposalNextButtonStyle
          onClick={() => {
            trackClickProposalPushCardIgnore();
            dispatch(incrementSequenceIndex());
          }}
          data-cy-button="push-proposal-next"
        >
          <SkipIconStyle aria-hidden focusable="false" />
          {i18n.t('push_proposal_card.next-cta')}
        </SequencePushProposalNextButtonStyle>
      </MiddleColumnToRowStyle>
    </PushProposalWrapperStyle>
  );
};
