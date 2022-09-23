import i18n from 'i18next';
import {
  getCookiesPageLink,
  getModerationLinkByLanguage,
} from '@make.org/utils/helpers/url';
import { scrollToTop } from '@make.org/utils/helpers/styled';
import { FooterLinkType } from './Common';

export const setINTExternalLinks = (language: string): FooterLinkType[] => [
  {
    label: i18n.t('main_footer.moderation_charter'),
    url: getModerationLinkByLanguage(language),
  },
];

export const setINTExtraLinks = (country: string): FooterLinkType[] => {
  if (!country) {
    return [];
  }
  return [
    {
      label: i18n.t('main_footer.cookies'),
      url: getCookiesPageLink(country),
      onClick: scrollToTop,
    },
  ];
};
