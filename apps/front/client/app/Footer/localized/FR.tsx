import i18n from 'i18next';
import { trackClickBlog } from '@make.org/utils/services/Tracking';
import { URL } from '@make.org/types/enums';
import { FooterLinkType } from './Common';

export const setFRExternalLinks = (language: string): FooterLinkType[] => [
  {
    label: i18n.t('main_footer.news'),
    url: URL.NEWS_LINK_FR,
    onClick: () => trackClickBlog('blog list'),
  },
  {
    label: i18n.t('main_footer.press_details'),
    url: URL.PRESS_DETAILS_LINK,
  },
  {
    label: i18n.t('main_footer.jobs'),
    url: URL.JOBS_LINK,
  },
  {
    label: i18n.t('main_footer.dotation_funds'),
    url: URL.DOTATION_FUNDS_LINK,
  },
];
