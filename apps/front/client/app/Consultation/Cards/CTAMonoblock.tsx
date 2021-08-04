import {
  ParticipateCardDescriptionStyle,
  ParticipateCardLinkAsButtonStyle,
  ParticipateCardStyle,
  ParticipateCardTitleStyle,
} from '@make.org/ui/elements/CardsElements';
import React, { FC } from 'react';

type Props = {
  icon: JSX.Element;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  classes?: string;
  onClickAction?: () => void;
};

export const CTAMonoBlock: FC<Props> = ({
  icon,
  title,
  description,
  linkText,
  linkHref,
  classes = '',
  onClickAction = () => null,
}) => (
  <ParticipateCardStyle className={classes}>
    {icon}
    <ParticipateCardTitleStyle>{title}</ParticipateCardTitleStyle>
    <ParticipateCardDescriptionStyle>
      {description}
    </ParticipateCardDescriptionStyle>
    <ParticipateCardLinkAsButtonStyle to={linkHref} onClick={onClickAction}>
      {linkText}
    </ParticipateCardLinkAsButtonStyle>
  </ParticipateCardStyle>
);
