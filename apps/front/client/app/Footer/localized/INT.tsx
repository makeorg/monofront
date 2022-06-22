import i18n from 'i18next';
import { URL } from '@make.org/types/enums';
import { getCookiesPageLink } from '@make.org/utils/helpers/url';
import { scrollToTop } from '@make.org/utils/helpers/styled';
import { FooterLinkType } from './Common';

export const setINTExternalLinks = (): FooterLinkType[] => [
  {
    label: i18n.t('main_footer.moderation_charter'),
    url: URL.MODERATION_CHARTER_EN_LINK,
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
