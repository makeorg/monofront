import React, { FC } from 'react';
import { TitleBaseStyle } from './style';
import { typography } from '../../../tokens/typography';

// @todo to remove enum after decision on how to proceed
export enum TitleStyleType {
  default = 'default',
  condensed = 'condensed',
  highlight = 'highlight',
}

export const TitleTagType = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
};

type Props = {
  font: keyof typeof typography.FontFamily;
  size: keyof typeof typography.FontSize.Title;
  lineHeight: keyof typeof typography.LineHeight;
  transform: keyof typeof typography.TextTransform;
  decoration: keyof typeof typography.TextDecoration;
  tag: keyof typeof TitleTagType;
  children: string;
};

export const Title: FC<Props> = ({
  font,
  size,
  lineHeight,
  transform,
  decoration,
  tag,
  children,
}) => (
  <TitleBaseStyle
    font={font}
    size={size}
    lineHeight={lineHeight}
    transform={transform}
    decoration={decoration}
    as={tag}
  >
    {children}
  </TitleBaseStyle>
);
