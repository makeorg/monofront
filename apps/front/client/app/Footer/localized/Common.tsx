/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import i18n from 'i18next';
import {
  getA11YPageLink,
  getCookiesPageLink,
  getDataPageLink,
  getGTUPageLink,
  getLegalPageLink,
} from '@make.org/utils/helpers/url';
import { scrollToTop } from '@make.org/utils/helpers/styled';

export type FooterLinkType = {
  label: string;
  url: string;
  onClick?: () => void | null;
  isDesktop?: boolean;
};

export const setCommonInternalLinks = (
  country: string,
  language: string
): FooterLinkType[] => [
  {
    label: i18n.t('main_footer.legal'),
    url: getLegalPageLink(country, language),
    onClick: scrollToTop,
  },
  {
    label: i18n.t('main_footer.terms'),
    url: getGTUPageLink(country, language),
    onClick: scrollToTop,
  },
  {
    label: i18n.t('main_footer.data'),
    url: getDataPageLink(country, language),
    onClick: scrollToTop,
  },
];

export const setCommonExtraLinks = (
  country: string,
  language: string
): FooterLinkType[] => [
  {
    label: i18n.t('main_footer.a11y'),
    url: getA11YPageLink(country, language),
    onClick: scrollToTop,
  },
  {
    label: i18n.t('main_footer.cookies'),
    url: getCookiesPageLink(country),
    onClick: scrollToTop,
  },
];
