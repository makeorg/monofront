import React, { useEffect } from 'react';
import {
  trackDisplayFinalCard,
  trackClickOperationPage,
  trackClickCitizenRegister,
  trackClickRelaunchSequence,
} from '@make.org/utils/services/Tracking';
import i18n from 'i18next';
import {
  resetSequenceVotedProposals,
  relaunchSequence,
} from '@make.org/store/actions/sequence';
import {
  RedButtonStyle,
  RedLinkButtonStyle,
  BlackBorderLinkStyle,
} from '@make.org/ui/elements/ButtonsElements';
import { getParticipateLink } from '@make.org/utils/helpers/url';
import { useAppContext } from '@make.org/store';
import { setPanelContent } from '@make.org/store/actions/panel';
import { PANEL_CONTENT } from '@make.org/store/actions/panel/panelContentEnum';
import { FinalCardConfigType } from '@make.org/types';
import {
  SequenceAltTitleStyle,
  SequenceParagraphStyle,
  FinalCardSeparatorStyle,
  FinalCardRegisterStyle,
  FinalCardWrapperStyle,
  SkipIconStyle,
  ButtonsContainerStyle,
} from './style';

type Props = {
  questionSlug: string;
  configuration: FinalCardConfigType;
};

export const FinalCard: React.FC<Props> = ({ configuration, questionSlug }) => {
  const { dispatch, state } = useAppContext();
  const { country } = state.appConfig;

  const handleClick = () => {
    dispatch(setPanelContent(PANEL_CONTENT.REGISTER));
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
        {configuration.isSessionBindingMode
          ? i18n.t('final_card.title_binding_mode')
          : i18n.t('final_card.title')}
      </SequenceAltTitleStyle>
      <SequenceParagraphStyle as="p" data-cy-container="final-card-description">
        {i18n.t('final_card.description')}
      </SequenceParagraphStyle>
      <ButtonsContainerStyle>
        <BlackBorderLinkStyle
          to={getParticipateLink(country, questionSlug)}
          onClick={() => trackClickOperationPage()}
          id="consult"
        >
          {i18n.t('final_card.link_text')}
        </BlackBorderLinkStyle>
        <RedButtonStyle
          data-cy-button="final-card-relaunch-sequence"
          onClick={() => {
            trackClickRelaunchSequence();
            dispatch(relaunchSequence(true));
          }}
          id="vote"
        >
          <SkipIconStyle aria-hidden focusable="false" />
          {i18n.t('final_card.continue')}
        </RedButtonStyle>
      </ButtonsContainerStyle>
      <FinalCardSeparatorStyle />
      <div data-cy-container="final-card-register-description">
        {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
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
