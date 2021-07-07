import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getParticipateLink } from '@make.org/utils/helpers/url';
import { i18n } from '@make.org/utils/i18n';
import {
  trackClickOperationPage,
  trackDisplayFinalCard,
} from '@make.org/utils/services/Tracking';
import { resetSequenceVotedProposals } from '@make.org/store/actions/sequence';
import { LinkAsRedButtonStyle } from '@make.org/ui/elements/Buttons/style';
import { useAppContext } from '@make.org/store';
import { SequenceMainTitleStyle, SequenceParagraphStyle } from './style';

export const SpecialFinalCard: React.FC = () => {
  const { dispach, state } = useAppContext();
  const { currentQuestion } = state;
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
