import i18n from 'i18next';
import { trackClickBlog } from '@make.org/utils/services/Tracking';
import { URL } from '@make.org/types/enums';
import { FooterLinkType } from './Common';

export const setBEExternalLinks = (language: string): FooterLinkType[] => [
  {
    label: i18n.t('main_footer.news'),
    url: URL.NEWS_LINK_BE,
    onClick: () => trackClickBlog('blog list'),
  },
];
