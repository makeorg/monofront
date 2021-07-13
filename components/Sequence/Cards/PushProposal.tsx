import React, { useEffect } from 'react';
import {
  trackDisplayProposalPushCard,
  trackClickProposalPushCardIgnore,
} from '@make.org/utils/services/Tracking';
import { i18n } from '@make.org/utils/i18n';
import {
  PencilIconStyle,
  ForwardIconStyle,
} from '@make.org/ui/elements/SvgElements';
import { MiddleColumnToRowStyle } from '@make.org/ui/elements/FlexElements';
import { incrementSequenceIndex } from '@make.org/store/actions/sequence';
import { setPanelContent } from '@make.org/store/actions/panel';
import { useAppContext } from '@make.org/store';
import { ProposalJourney } from '@make.org/components/Proposal/Submit/Journey';
import {
  SequenceIntroParagraphStyle,
  SequencePushProposalButtonStyle,
  SequencePushProposalNextButtonStyle,
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
    <>
      <SequenceIntroParagraphStyle className="with-margin-bottom">
        {i18n.t('push_proposal_card.title')}
      </SequenceIntroParagraphStyle>
      <MiddleColumnToRowStyle>
        <SequencePushProposalButtonStyle
          onClick={() => dispatch(setPanelContent(<ProposalJourney />))}
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
          <ForwardIconStyle aria-hidden focusable="false" />
          {i18n.t('push_proposal_card.next-cta')}
        </SequencePushProposalNextButtonStyle>
      </MiddleColumnToRowStyle>
    </>
  );
};
