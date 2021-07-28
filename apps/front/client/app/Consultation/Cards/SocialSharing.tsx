// @flow
import React from 'react';
import { i18n } from 'Shared/i18n';
import { Sharing } from 'Client/features/sharing';
import { CardStyle, CardTitleStyle, CardDescriptionStyle } from './style';

export const SocialSharing = () => (
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
