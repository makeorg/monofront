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

export const setCommonInternalLinks = (country: string): FooterLinkType[] => {
  if (!country) {
    return [];
  }

  return [
    {
      label: i18n.t('main_footer.legal'),
      url: getLegalPageLink(country),
      onClick: scrollToTop,
    },
    {
      label: i18n.t('main_footer.terms'),
      url: getGTUPageLink(country),
      onClick: scrollToTop,
    },
    {
      label: i18n.t('main_footer.data'),
      url: getDataPageLink(country),
      onClick: scrollToTop,
    },
  ];
};

export const setCommonExtraLinks = (country: string): FooterLinkType[] => {
  if (!country) {
    return [];
  }

  return [
    {
      label: i18n.t('main_footer.a11y'),
      url: getA11YPageLink(country),
      onClick: scrollToTop,
    },
    {
      label: i18n.t('main_footer.cookies'),
      url: getCookiesPageLink(country),
      onClick: scrollToTop,
    },
  ];
};
