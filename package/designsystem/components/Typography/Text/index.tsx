import React, { CSSProperties, FC } from 'react';
import { TextLStyle, TextMStyle, TextSStyle, TextXSStyle } from './style';

export enum TextSizeType {
  l = 'l',
  m = 'm',
  s = 's',
  xs = 'xs',
}

export enum TextTagType {
  p = 'p',
  span = 'span',
  div = 'div',
}

export enum TextStyleType {
  default = 'default',
  condensed = 'condensed',
  highlight = 'highlight',
}

type Props = {
  size: TextSizeType;
  tag: TextTagType;
  type: TextStyleType;
  label: string;
  style?: CSSProperties;
};

export const TextBody: FC<Props> = ({ size, tag, type, label, style }) => {
  switch (size) {
    case TextSizeType.l:
      return (
        <TextLStyle className={type} style={style} as={tag}>
          {label}
        </TextLStyle>
      );
    case TextSizeType.s:
      return (
        <TextSStyle className={type} style={style} as={tag}>
          {label}
        </TextSStyle>
      );
    case TextSizeType.xs:
      return (
        <TextXSStyle className={type} style={style} as={tag}>
          {label}
        </TextXSStyle>
      );
    default:
      return (
        <TextMStyle className={type} style={style} as={tag}>
          {label}
        </TextMStyle>
      );
  }
};
