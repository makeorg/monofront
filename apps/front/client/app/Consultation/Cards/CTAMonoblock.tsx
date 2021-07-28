// @flow
import React from 'react';
import {
  CardStyle,
  CardTitleStyle,
  CardDescriptionStyle,
  CardLinkAsButtonStyle,
} from './style';

type Props = {
  icon: any,
  title: string,
  description: string,
  linkText: string,
  linkHref: string,
  classes?: string,
  onClickAction?: () => void,
};

export const CTAMonoBlock = ({
  icon,
  title,
  description,
  linkText,
  linkHref,
  classes = '',
  onClickAction = () => {},
}: Props) => (
  <CardStyle className={classes}>
    {icon}
    <CardTitleStyle>{title}</CardTitleStyle>
    <CardDescriptionStyle>{description}</CardDescriptionStyle>
    <CardLinkAsButtonStyle to={linkHref} onClick={onClickAction}>
      {linkText}
    </CardLinkAsButtonStyle>
  </CardStyle>
);
