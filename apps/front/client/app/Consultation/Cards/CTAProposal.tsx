import React, { FC } from 'react';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import i18n from 'i18next';
import {
  ParticipateCardStyle,
  ParticipateCardTitleStyle,
  ParticipateCardDescriptionStyle,
  ParticipateCardLinkStyle,
  ParticipateCardSoonStyle,
  ParticipateCardSoonIconStyle,
} from '@make.org/ui/elements/CardsElements';

type Props = {
  icon: JSX.Element;
  title: string;
  description: string;
  proposalCount: number;
  thresold: number;
  linkText: string;
  linkHref: string;
  classes?: string;
  onClickAction?: () => void;
  isKeywordActive?: boolean;
};

export const CTAProposal: FC<Props> = ({
  icon,
  title,
  description,
  proposalCount,
  thresold,
  linkText,
  linkHref,
  classes = '',
  onClickAction = () => null,
  isKeywordActive,
}) => {
  const isActive = proposalCount >= thresold;

  return (
    <ParticipateCardStyle className={classes} isKeywordActive={isKeywordActive}>
      <ColumnElementStyle>
        {icon}
        <ParticipateCardTitleStyle>{title}</ParticipateCardTitleStyle>
        <ParticipateCardDescriptionStyle>
          {description}
        </ParticipateCardDescriptionStyle>
      </ColumnElementStyle>
      {isActive ? (
        <ParticipateCardLinkStyle to={linkHref} onClick={onClickAction}>
          {linkText}
        </ParticipateCardLinkStyle>
      ) : (
        <ParticipateCardSoonStyle>
          <ParticipateCardSoonIconStyle
            width={16}
            height={16}
            aria-hidden
            focusable="false"
          />
          <> </>
          {i18n.t('consultation.cards.soon')}
        </ParticipateCardSoonStyle>
      )}
    </ParticipateCardStyle>
  );
};
