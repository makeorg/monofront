import React, { useEffect } from 'react';
import {
  trackDisplayFinalCard,
  trackClickOperationPage,
  trackClickCitizenRegister,
} from '@make.org/utils/services/Tracking';
import i18n from 'i18next';
import { resetSequenceVotedProposals } from '@make.org/store/actions/sequence';
import {
  LinkAsRedButtonStyle,
  RedLinkButtonStyle,
} from '@make.org/ui/elements/ButtonsElements';
import { getParticipateLink } from '@make.org/utils/helpers/url';
import { useAppContext } from '@make.org/store';
import { Register } from '@make.org/components/Auth/Register';
import { setPanelContent } from '@make.org/store/actions/panel';
import {
  SequenceAltTitleStyle,
  SequenceParagraphStyle,
  FinalCardSeparatorStyle,
  FinalCardRegisterStyle,
  FinalCardWrapperStyle,
} from './style';

type Props = {
  questionSlug: string;
};

export const FinalCard: React.FC<Props> = ({ questionSlug }) => {
  const { dispatch, state } = useAppContext();
  const { country } = state.appConfig;

  const handleClick = () => {
    dispatch(setPanelContent(<Register />));
    trackClickCitizenRegister();
  };

  useEffect(() => {
    trackDisplayFinalCard();
    return () => dispatch(resetSequenceVotedProposals(questionSlug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FinalCardWrapperStyle data-cy-container="final-card">
      <SequenceAltTitleStyle data-cy-container="final-card-title">
        {i18n.t('final_card.title')}
      </SequenceAltTitleStyle>
      <SequenceParagraphStyle as="p" data-cy-container="final-card-description">
        {i18n.t('final_card.description')}
      </SequenceParagraphStyle>
      <LinkAsRedButtonStyle
        to={getParticipateLink(country, questionSlug)}
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
    </FinalCardWrapperStyle>
  );
};
