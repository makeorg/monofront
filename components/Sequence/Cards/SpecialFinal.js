// @flow
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type StateRoot } from 'Shared/store/types';
import { useParams } from 'react-router-dom';
import { getParticipateLink } from 'Shared/helpers/url';
import { i18n } from 'Shared/i18n';
import {
  trackClickOperationPage,
  trackDisplayFinalCard,
} from 'Shared/services/Tracking';
import { resetSequenceVotedProposals } from 'Shared/store/actions/sequence';
import { LinkAsRedButtonStyle } from 'Client/ui/Elements/Buttons/V2/style';
import { SequenceMainTitleStyle, SequenceParagraphStyle } from './style';

export const SpecialFinalCard = () => {
  const dispach = useDispatch();
  const currentQuestion: string = useSelector(
    (state: StateRoot) => state.currentQuestion
  );
  const { country } = useParams();

  useEffect(() => {
    trackDisplayFinalCard();
    return () => dispach(resetSequenceVotedProposals(currentQuestion));
  }, [currentQuestion, dispach]);

  return (
    <>
      <SequenceMainTitleStyle>
        {i18n.t('special_final_card.title')}
      </SequenceMainTitleStyle>
      <SequenceParagraphStyle>
        {i18n.t('special_final_card.subtitle')}
      </SequenceParagraphStyle>
      <LinkAsRedButtonStyle
        to={getParticipateLink(country, currentQuestion)}
        onClick={() => trackClickOperationPage()}
      >
        {i18n.t('special_final_card.cta_text')}
      </LinkAsRedButtonStyle>
    </>
  );
};
