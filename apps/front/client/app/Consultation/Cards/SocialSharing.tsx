import React, { FC } from 'react';
import i18n from 'i18next';
import { Sharing } from '@make.org/components/Sharing';
import {
  ParticipateCardStyle,
  ParticipateCardTitleStyle,
  ParticipateCardDescriptionStyle,
} from '@make.org/ui/elements/CardsElements';

export const SocialSharing: FC = () => (
  <ParticipateCardStyle className="margin-bottom">
    <ParticipateCardTitleStyle>
      {i18n.t('consultation.cards.sharing.title')}
    </ParticipateCardTitleStyle>
    <ParticipateCardDescriptionStyle>
      {i18n.t('consultation.cards.sharing.description')}
    </ParticipateCardDescriptionStyle>
    <Sharing />
  </ParticipateCardStyle>
);
