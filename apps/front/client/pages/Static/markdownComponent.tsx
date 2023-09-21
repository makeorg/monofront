import { RedHTMLLinkElementStyle } from '@make.org/ui/elements/LinkElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import React, { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import i18n from 'i18next';
import { env } from '@make.org/assets/env';
import {
  StaticSecondLevelTitleStyle,
  StaticTitleExtra,
  StaticParagraphStyle,
  StaticThirdLevelTitleStyle,
  StaticFourthLevelTitleStyle,
  StaticSquareListItemStyle,
  StaticSquareListStyle,
  StaticExternalLinkIconStyle,
} from '@make.org/front/client/pages/Static/style';
import { Components } from 'react-markdown';

const checkLinkValue = (href?: string, value?: string) => {
  if (!href || !value) {
    return false;
  }

  return href.startsWith(value);
};

export const markdownComponents = (): Components => ({
  h2: ({ children }) => (
    <StaticSecondLevelTitleStyle>{children}</StaticSecondLevelTitleStyle>
  ),
  h3: ({ children }) => (
    <StaticThirdLevelTitleStyle>{children}</StaticThirdLevelTitleStyle>
  ),
  h4: ({ children }) => (
    <StaticFourthLevelTitleStyle>{children}</StaticFourthLevelTitleStyle>
  ),
  blockquote: ({ children }) => <StaticTitleExtra>{children}</StaticTitleExtra>,
  p: ({ children, className }) => (
    <StaticParagraphStyle className={className}>
      {children}
    </StaticParagraphStyle>
  ),
  a: (
    props: DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >
  ) =>
    [env.frontUrl(), '/', 'mailto'].reduce(
      (accumulator, currentValue) =>
        accumulator || checkLinkValue(props.href, currentValue),
      false
    ) ? (
      <RedHTMLLinkElementStyle href={props.href} rel="noopener">
        {props.children}
      </RedHTMLLinkElementStyle>
    ) : (
      <RedHTMLLinkElementStyle href={props.href} rel="noopener" target="_blank">
        {props.children}
        <StaticExternalLinkIconStyle aria-hidden focusable="false" />
        <ScreenReaderItemStyle>
          {i18n.t('common.open_new_window')}
        </ScreenReaderItemStyle>
      </RedHTMLLinkElementStyle>
    ),
  ul: ({ children }) => (
    <StaticSquareListStyle>{children}</StaticSquareListStyle>
  ),
  li: ({ children }) => (
    <StaticSquareListItemStyle>{children}</StaticSquareListItemStyle>
  ),
});
