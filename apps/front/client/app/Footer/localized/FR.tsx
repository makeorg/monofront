import i18n from 'i18next';
import { trackClickBlog } from '@make.org/utils/services/Tracking';
import { URL } from '@make.org/types/enums';
import { FooterLinkType } from './Common';

export const setFRExternalLinks = (isDesktop: boolean): FooterLinkType[] => [
  {
    label: i18n.t('main_footer.news'),
    url: URL.NEWS_LINK,
    onClick: () => trackClickBlog('blog list'),
    isDesktop,
  },
  {
    label: i18n.t('main_footer.press_details'),
    url: URL.PRESS_DETAILS_LINK,
  },
  {
    label: i18n.t('main_footer.jobs'),
    url: URL.JOBS_LINK,
    isDesktop,
  },
  {
    label: i18n.t('main_footer.dotation_funds'),
    url: URL.DOTATION_FUNDS_LINK,
  },
  {
    label: i18n.t('main_footer.moderation_charter'),
    url: URL.MODERATION_CHARTER_FR_LINK,
  },
];
