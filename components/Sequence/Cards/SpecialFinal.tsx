import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getParticipateLink } from '@make.org/utils/helpers/url';
import { i18n } from '@make.org/utils/i18n';
import {
  trackClickOperationPage,
  trackDisplayFinalCard,
} from '@make.org/utils/services/Tracking';
import { resetSequenceVotedProposals } from '@make.org/store/actions/sequence';
import { LinkAsRedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { useAppContext } from '@make.org/store';
import { SequenceMainTitleStyle, SequenceParagraphStyle } from './style';

type Props = {
  questionSlug: string;
};

export const SpecialFinalCard: React.FC<Props> = ({ questionSlug }) => {
  const { dispatch } = useAppContext();
  const { country } = useParams();

  useEffect(() => {
    trackDisplayFinalCard();
    return () => dispatch(resetSequenceVotedProposals(questionSlug));
  }, [questionSlug, dispatch]);

  return (
    <>
      <SequenceMainTitleStyle>
        {i18n.t('special_final_card.title')}
      </SequenceMainTitleStyle>
      <SequenceParagraphStyle>
        {i18n.t('special_final_card.subtitle')}
      </SequenceParagraphStyle>
      <LinkAsRedButtonStyle
        to={getParticipateLink(country, questionSlug)}
        onClick={() => trackClickOperationPage()}
      >
        {i18n.t('special_final_card.cta_text')}
      </LinkAsRedButtonStyle>
    </>
  );
};
