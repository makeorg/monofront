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
import { ProposalJourney } from '@make.org/components/Proposal/Submit/Journey';
import { BlackBorderButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import {
  SequenceIntroParagraphStyle,
  SequencePushProposalButtonStyle,
} from './style';
import { SkipIconStyle } from './ExtraData/style';

/**
 * Handles Push Proposal Card Business Logic
 */
export const PushProposalCard: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { source } = state.appConfig;
  const isWidget = source === 'widget';
  useEffect(() => {
    trackDisplayProposalPushCard();
  }, []);

  return (
    <>
      <SequenceIntroParagraphStyle className="with-margin-bottom">
        {i18n.t('push_proposal_card.title')}
      </SequenceIntroParagraphStyle>
      <MiddleColumnToRowStyle column>
        <SequencePushProposalButtonStyle
          onClick={() => dispatch(setPanelContent(<ProposalJourney />))}
        >
          <PencilIconStyle aria-hidden focusable="false" />
          {i18n.t('common.propose')}
        </SequencePushProposalButtonStyle>
        <BlackBorderButtonStyle
          className={isWidget ? 'widget' : ''}
          onClick={() => {
            trackClickProposalPushCardIgnore();
            dispatch(incrementSequenceIndex());
          }}
          data-cy-button="push-proposal-next"
        >
          <SkipIconStyle aria-hidden focusable="false" />
          {i18n.t('push_proposal_card.next-cta')}
        </BlackBorderButtonStyle>
      </MiddleColumnToRowStyle>
    </>
  );
};
