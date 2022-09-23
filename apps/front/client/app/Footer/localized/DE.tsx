/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import i18n from 'i18next';
import { trackClickBlog } from '@make.org/utils/services/Tracking';
import { URL } from '@make.org/types/enums';
import { getModerationLinkByLanguage } from '@make.org/utils/helpers/url';
import { FooterLinkType } from './Common';

export const setDEExternalLinks = (
  isDesktop: boolean,
  language: string
): FooterLinkType[] => [
  {
    label: i18n.t('main_footer.news'),
    url: URL.NEWS_LINK_DE,
    onClick: () => trackClickBlog('blog list'),
    isDesktop,
  },
  {
    label: i18n.t('main_footer.jobs'),
    url: URL.JOBS_LINK_DE,
    isDesktop,
  },
  {
    label: i18n.t('main_footer.moderation_charter'),
    url: getModerationLinkByLanguage(language),
  },
];
