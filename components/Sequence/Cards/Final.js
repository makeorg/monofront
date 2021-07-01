// @flow
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  trackDisplayFinalCard,
  trackClickOperationPage,
  trackClickCitizenRegister,
} from 'Shared/services/Tracking';
import { i18n } from 'Shared/i18n';
import { resetSequenceVotedProposals } from 'Shared/store/actions/sequence';
import { CenterColumnStyle } from 'Client/ui/Elements/FlexElements';
import { LinkAsRedButtonStyle } from 'Client/ui/Elements/Buttons/V2/style';
import { getParticipateLink } from 'Shared/helpers/url';
import { useParams } from 'react-router';
import { RedLinkButtonStyle } from 'Client/ui/Elements/Buttons/style';
import { modalShowRegister } from 'Shared/store/actions/modal';
import {
  SequenceAltTitleStyle,
  SequenceParagraphStyle,
  FinalCardSeparatorStyle,
  FinalCardRegisterStyle,
} from './style';

export const FinalCard = () => {
  const dispatch = useDispatch();
  const { country } = useParams();
  const currentQuestion: string = useSelector(state => state.currentQuestion);
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
