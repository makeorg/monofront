import React, { FC } from 'react';
import {
  TitleXXXLStyle,
  TitleXXLStyle,
  TitleXLStyle,
  TitleLStyle,
  TitleMStyle,
  TitleSStyle,
  TitleXSStyle,
  TitleXXSStyle,
  TitleXXXSStyle,
} from './style';

export enum TitleSizeType {
  xxxl = 'xxxl',
  xxl = 'xxl',
  xl = 'xl',
  l = 'l',
  m = 'm',
  s = 's',
  xs = 'xs',
  xxs = 'xxs',
  xxxs = 'xxxs',
}

export enum TitleLevelType {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
}

export enum TitleStyleType {
  default = 'default',
  condensed = 'condensed',
  highlight = 'highlight',
}

type Props = {
  size: TitleSizeType;
  level: TitleLevelType;
  type: TitleStyleType;
  label: string;
};

export const Title: FC<Props> = ({ size, level, type, label }) => {
  switch (size) {
    case TitleSizeType.xxxl:
      return (
        <TitleXXXLStyle className={type} as={level}>
          {label}
        </TitleXXXLStyle>
      );
    case TitleSizeType.xxl:
      return (
        <TitleXXLStyle className={type} as={level}>
          {label}
        </TitleXXLStyle>
      );
    case TitleSizeType.xl:
      return (
        <TitleXLStyle className={type} as={level}>
          {label}
        </TitleXLStyle>
      );
    case TitleSizeType.l:
      return (
        <TitleLStyle className={type} as={level}>
          {label}
        </TitleLStyle>
      );
    case TitleSizeType.s:
      return (
        <TitleSStyle className={type} as={level}>
          {label}
        </TitleSStyle>
      );
    case TitleSizeType.xs:
      return (
        <TitleXSStyle className={type} as={level}>
          {label}
        </TitleXSStyle>
      );
    case TitleSizeType.xxs:
      return (
        <TitleXXSStyle className={type} as={level}>
          {label}
        </TitleXXSStyle>
      );
    case TitleSizeType.xxxs:
      return (
        <TitleXXXSStyle className={type} as={level}>
          {label}
        </TitleXXXSStyle>
      );
    default:
      return (
        <TitleMStyle className={type} as={level}>
          {label}
        </TitleMStyle>
      );
  }
};
