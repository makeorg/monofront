import React, { FC } from 'react';
import i18n from 'i18next';
import { Sharing } from '@make.org/components/Sharing';
import { CardStyle, CardTitleStyle, CardDescriptionStyle } from './style';

export const SocialSharing: FC = () => (
  <CardStyle className="margin-bottom">
    <CardTitleStyle>
      {i18n.t('consultation.cards.sharing.title')}
    </CardTitleStyle>
    <CardDescriptionStyle>
      {i18n.t('consultation.cards.sharing.description')}
    </CardDescriptionStyle>
    <Sharing />
  </CardStyle>
);
