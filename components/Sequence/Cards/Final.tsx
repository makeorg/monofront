import React, { useEffect } from 'react';
import {
  trackDisplayFinalCard,
  trackClickOperationPage,
  trackClickCitizenRegister,
} from '@make.org/utils/services/Tracking';
import i18n from 'i18next';
import { resetSequenceVotedProposals } from '@make.org/store/actions/sequence';
import { CenterColumnStyle } from '@make.org/ui/elements/FlexElements';
import {
  LinkAsRedButtonStyle,
  RedButtonAsLinkStyle,
} from '@make.org/ui/elements/ButtonsElements';

import { getParticipateLink } from '@make.org/utils/helpers/url';
import { modalShowRegister } from '@make.org/store/actions/modal';
import { useAppContext } from '@make.org/store';
import { SimpleLinkAsRedButton } from '@make.org/ui/elements/LinkElements';
import {
  SequenceAltTitleStyle,
  SequenceParagraphStyle,
  FinalCardSeparatorStyle,
  FinalCardRegisterStyle,
} from './style';

type Props = {
  questionSlug: string;
};

export const FinalCard: React.FC<Props> = ({ questionSlug }) => {
  const { dispatch, state } = useAppContext();
  const { country, source } = state.appConfig;
  const isWidget = source === 'widget';

  const handleClick = () => {
    dispatch(modalShowRegister());
    trackClickCitizenRegister();
  };

  useEffect(() => {
    trackDisplayFinalCard();
    return () => dispatch(resetSequenceVotedProposals(questionSlug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CenterColumnStyle data-cy-container="final-card">
      <SequenceAltTitleStyle data-cy-container="final-card-title">
        {i18n.t('final_card.title')}
      </SequenceAltTitleStyle>
      {!isWidget && (
        <>
          <SequenceParagraphStyle
            as="p"
            data-cy-container="final-card-description"
          >
            {i18n.t('final_card.description')}
          </SequenceParagraphStyle>
          {isWidget ? (
            <SimpleLinkAsRedButton
              href={`https://make.org${getParticipateLink(
                country,
                questionSlug
              )}`}
              target="__blank"
            >
              {i18n.t('final_card.link_text')}
            </SimpleLinkAsRedButton>
          ) : (
            <LinkAsRedButtonStyle
              to={getParticipateLink(country, questionSlug)}
              onClick={() => trackClickOperationPage()}
            >
              {i18n.t('final_card.link_text')}
            </LinkAsRedButtonStyle>
          )}
          <FinalCardSeparatorStyle />
        </>
      )}

      <div
        style={{ marginBottom: '10px' }}
        data-cy-container="final-card-register-description"
      >
        {i18n.t('final_card.register.description')}
      </div>
      <FinalCardRegisterStyle data-cy-container="final-card-register-intro">
        {!isWidget && i18n.t('final_card.register.button_intro')}
        <RedButtonAsLinkStyle
          onClick={handleClick}
          data-cy-button="final-card-register-button"
        >
          {i18n.t('final_card.register.button_text')}
        </RedButtonAsLinkStyle>
      </FinalCardRegisterStyle>
    </CenterColumnStyle>
  );
};
