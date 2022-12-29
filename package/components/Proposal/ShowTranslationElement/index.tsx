import React from 'react';
import i18n from 'i18next';
import { GreyNoBackgroundButtonStyle } from '@make.org/ui/elements/ButtonsElements';

type Props = {
  showOriginal: boolean;
  onClickAction: () => void;
};

export const ShowTranslation: React.FC<Props> = ({
  showOriginal,
  onClickAction = () => null,
}) => (
  <GreyNoBackgroundButtonStyle
    data-cy-button="proposal-language-switch"
    onClick={onClickAction}
  >
    {!showOriginal
      ? i18n.t('proposal_card.original')
      : i18n.t('proposal_card.translation')}
  </GreyNoBackgroundButtonStyle>
);
