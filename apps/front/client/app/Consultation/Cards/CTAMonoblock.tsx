import React, { FC } from 'react';
import {
  CardStyle,
  CardTitleStyle,
  CardDescriptionStyle,
  CardLinkAsButtonStyle,
} from './style';

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
  <CardStyle className={classes}>
    {icon}
    <CardTitleStyle>{title}</CardTitleStyle>
    <CardDescriptionStyle>{description}</CardDescriptionStyle>
    <CardLinkAsButtonStyle to={linkHref} onClick={onClickAction}>
      {linkText}
    </CardLinkAsButtonStyle>
  </CardStyle>
);
