// @flow
import React, { useEffect } from 'react';
import {
  trackDisplayProposalPushCard,
  trackClickProposalPushCardIgnore,
} from 'Shared/services/Tracking';
import { i18n } from 'Shared/i18n';
import {
  PencilIconStyle,
  ForwardIconStyle,
} from 'Client/ui/Elements/Buttons/style';
import { MiddleColumnToRowStyle } from 'Client/ui/Elements/FlexElements';
import { incrementSequenceIndex } from 'Shared/store/actions/sequence';
import { useDispatch } from 'react-redux';
import { ProposalJourney } from 'Client/features/proposal/Submit/Journey';
import { setPanelContent } from 'Shared/store/reducers/panel/actions';
import {
  SequenceIntroParagraphStyle,
  SequencePushProposalButtonStyle,
  SequencePushProposalNextButtonStyle,
} from './style';

/**
 * Handles Push Proposal Card Business Logic
 */
export const PushProposalCard = () => {
  const dispatch = useDispatch();
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
