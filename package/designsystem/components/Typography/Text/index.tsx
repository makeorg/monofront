import React, { FC } from 'react';
import { typography } from '../../../tokens/typography';
import { TextBaseStyle } from './style';

// @todo to remove enum after decision on how to proceed
export enum TextStyleType {
  default = 'default',
  condensed = 'condensed',
  highlight = 'highlight',
}

export const TextTagType = {
  p: 'p',
  span: 'span',
  div: 'div',
};

type Props = {
  font: keyof typeof typography.FontFamily;
  size: keyof typeof typography.FontSize.Text;
  lineHeight: keyof typeof typography.LineHeight;
  transform: keyof typeof typography.TextTransform;
  decoration: keyof typeof typography.TextDecoration;
  tag: keyof typeof TextTagType;
  children: string;
};

export const TextBody: FC<Props> = ({
  font,
  size,
  lineHeight,
  transform,
  decoration,
  tag,
  children,
}) => (
  <TextBaseStyle
    font={font}
    size={size}
    lineHeight={lineHeight}
    transform={transform}
    decoration={decoration}
    as={tag}
  >
    {children}
  </TextBaseStyle>
);
