import React, { useEffect } from 'react';
import {
  trackDisplayFinalCard,
  trackClickOperationPage,
  trackClickCitizenRegister,
} from '@make.org/utils/services/Tracking';
import { i18n } from '@make.org/utils/i18n';
import { resetSequenceVotedProposals } from '@make.org/store/actions/sequence';
import { CenterColumnStyle } from '@make.org/ui/elements/FlexElements';
import {
  LinkAsRedButtonStyle,
  RedLinkButtonStyle,
} from '@make.org/ui/elements/Buttons/style';
import { getParticipateLink } from '@make.org/utils/helpers/url';
import { useParams } from 'react-router';
import { modalShowRegister } from '@make.org/store/actions/modal';
import { useAppContext } from '@make.org/store';
import {
  SequenceAltTitleStyle,
  SequenceParagraphStyle,
  FinalCardSeparatorStyle,
  FinalCardRegisterStyle,
} from './style';

export const FinalCard: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { country } = useParams();
  const { currentQuestion } = state;
  const handleClick = () => {
    dispatch(modalShowRegister());
    trackClickCitizenRegister();
  };

  useEffect(() => {
    trackDisplayFinalCard();
    return () => dispatch(resetSequenceVotedProposals(currentQuestion));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CenterColumnStyle data-cy-container="final-card">
      <SequenceAltTitleStyle data-cy-container="final-card-title">
        {i18n.t('final_card.title')}
      </SequenceAltTitleStyle>
      <SequenceParagraphStyle as="p" data-cy-container="final-card-description">
        {i18n.t('final_card.description')}
      </SequenceParagraphStyle>
      <LinkAsRedButtonStyle
        to={getParticipateLink(country, currentQuestion)}
        onClick={() => trackClickOperationPage()}
      >
        {i18n.t('final_card.link_text')}
      </LinkAsRedButtonStyle>
      <FinalCardSeparatorStyle />
      <div data-cy-container="final-card-register-description">
        {i18n.t('final_card.register.description')}
      </div>
      <FinalCardRegisterStyle data-cy-container="final-card-register-intro">
        {i18n.t('final_card.register.button_intro')}
        <RedLinkButtonStyle
          onClick={handleClick}
          data-cy-button="final-card-register-button"
        >
          {i18n.t('final_card.register.button_text')}
        </RedLinkButtonStyle>
      </FinalCardRegisterStyle>
    </CenterColumnStyle>
  );
};
