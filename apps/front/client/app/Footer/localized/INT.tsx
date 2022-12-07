import i18n from 'i18next';
import { getModerationLinkByLanguage } from '@make.org/utils/helpers/url';
import { trackClickBlog } from '@make.org/utils/services/Tracking';
import { URL } from '@make.org/types/enums';
import { FooterLinkType } from './Common';

export const setINTExternalLinks = (language: string): FooterLinkType[] => [
  {
    label: i18n.t('main_footer.moderation_charter'),
    url: getModerationLinkByLanguage(language),
  },
  {
    label: i18n.t('main_footer.news'),
    url: URL.NEWS_LINK_EN,
    onClick: () => trackClickBlog('blog list'),
  },
];
