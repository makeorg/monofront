import React from 'react';
import i18n from 'i18next';
import { GreyNoBackgroundButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { trackDisplayUntranslatedSolution } from '@make.org/utils/services/Tracking';

type Props = {
  showOriginal: boolean;
  onClickAction: () => void;
};

export const ShowTranslation: React.FC<Props> = ({
  showOriginal,
  onClickAction = () => null,
}) => {
  const handleClick = () => {
    onClickAction();
    if (!showOriginal) {
      trackDisplayUntranslatedSolution('card');
    }
  };

  return (
    <GreyNoBackgroundButtonStyle
      data-cy-button="proposal-language-switch"
      onClick={handleClick}
    >
      {!showOriginal
        ? i18n.t('proposal_card.original')
        : i18n.t('proposal_card.translation')}
    </GreyNoBackgroundButtonStyle>
  );
};
