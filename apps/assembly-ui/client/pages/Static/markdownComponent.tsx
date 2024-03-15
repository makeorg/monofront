import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import React, { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import i18n from 'i18next';
import { env } from '@make.org/assets/env';
import { Components } from 'react-markdown';
import {
  LegalPagesMaintTitleStyle,
  LegalPagesSubtitleStyle,
  LegalPagesTableHeaderStyle,
  LegalPagesTableTextStyle,
  LegalPagesTextStyle,
  LegalPagesListStyle,
} from './style';

export const getContactMailByLanguage = (language: string): string => {
  const isoCode = language.toLocaleLowerCase();
  return `contact-${isoCode}@make.org`;
};

const checkLinkValue = (href?: string, value?: string) => {
  if (!href || !value) {
    return false;
  }

  return href.startsWith(value);
};

export const markdownComponents = (): Components => ({
  h1: ({ children }) => (
    <LegalPagesMaintTitleStyle>{children}</LegalPagesMaintTitleStyle>
  ),
  h2: ({ children }) => (
    <LegalPagesSubtitleStyle>{children}</LegalPagesSubtitleStyle>
  ),
  p: ({ children }) => <LegalPagesTextStyle>{children}</LegalPagesTextStyle>,
  th: ({ children }) => (
    <LegalPagesTableHeaderStyle>{children}</LegalPagesTableHeaderStyle>
  ),
  td: ({ children }) => (
    <LegalPagesTableTextStyle>{children}</LegalPagesTableTextStyle>
  ),
  li: ({ children }) => <LegalPagesListStyle>{children}</LegalPagesListStyle>,
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
      <a href={props.href} rel="noopener" style={{ whiteSpace: 'nowrap' }}>
        {props.children}
      </a>
    ) : (
      <a
        href={props.href}
        rel="noopener noreferrer"
        target="_blank"
        style={{ whiteSpace: 'nowrap' }}
      >
        {props.children}
        <ScreenReaderItemStyle>
          {i18n.t('global.open_new_window')}
        </ScreenReaderItemStyle>
      </a>
    ),
});
