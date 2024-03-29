/* eslint-disable react/jsx-no-useless-fragment */
import React, { FC } from 'react';
import { useAppContext } from '@make.org/store';
import { HomePostType } from '@make.org/types';
import { trackClickBlog } from '@make.org/utils/services/Tracking';
import i18n from 'i18next';
import { URL } from '@make.org/types/enums';
import { ExternalLinkIconStyle } from '@make.org/ui/elements/ButtonsElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { RedUppercaseHTMLLinkElementStyle } from '@make.org/ui/elements/LinkElements';
import {
  ConsultationsListStyle,
  ConsultationsListItemStyle,
  ConsultationArticleStyle,
  ConsultationElementPictureStyle,
  ConsultationElementTitleStyle,
  ConsultationElementParagraphStyle,
} from '../../../Consultation/Browse/style';
import {
  HomepageSectionTitleStyle,
  HomepageSectionStyle,
  HomepagePageInnerStyle,
} from '../../../../pages/Home/style';
import { HomepageQuestionsButtonStyle } from '../../Questions/style';

type Props = {
  posts: HomePostType[];
};

const setLangAndLinksByCountry = (
  country: string
): { link: string; lang: string } => {
  if (country === 'DE') {
    return { link: URL.NEWS_LINK_DE, lang: 'de' };
  }
  if (country === 'GB') {
    return { link: URL.NEWS_LINK_EN, lang: 'en' };
  }
  if (country === 'BE') {
    return { link: URL.NEWS_LINK_BE, lang: 'en' };
  }
  return { link: URL.NEWS_LINK_FR, lang: 'fr' };
};

export const FeaturedPosts: FC<Props> = ({ posts }) => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const noFeaturedPosts = posts.length === 0;

  if (noFeaturedPosts) {
    return null;
  }

  return (
    <HomepageSectionStyle
      as="section"
      aria-labelledby="featured_posts_title"
      id="featured_posts"
    >
      <HomepagePageInnerStyle>
        <HomepageSectionTitleStyle
          data-cy-container="featured_posts_title"
          id="featured_posts_title"
        >
          {i18n.t('homepage.posts.title')}
        </HomepageSectionTitleStyle>
      </HomepagePageInnerStyle>
      <ConsultationsListStyle>
        {posts.map(post => (
          <ConsultationsListItemStyle
            itemsPerRow={3}
            key={post.title}
            lang={setLangAndLinksByCountry(country).lang}
          >
            <ConsultationArticleStyle>
              <ConsultationElementPictureStyle
                width={353}
                height={199}
                src={post.picture}
                alt=""
              />
              <ConsultationElementTitleStyle>
                {post.title}
              </ConsultationElementTitleStyle>
              <ConsultationElementParagraphStyle>
                {post.description}
              </ConsultationElementParagraphStyle>
              <RedUppercaseHTMLLinkElementStyle
                href={post.link || '#'}
                target="_blank"
                rel="noopener"
                onClick={() => trackClickBlog('blog item')}
              >
                {i18n.t('homepage.posts.link_text')}
              </RedUppercaseHTMLLinkElementStyle>
            </ConsultationArticleStyle>
          </ConsultationsListItemStyle>
        ))}
      </ConsultationsListStyle>
      <HomepagePageInnerStyle>
        <HomepageQuestionsButtonStyle
          as="a"
          href={setLangAndLinksByCountry(country).link}
          target="_blank"
          rel="noopener"
          onClick={() => trackClickBlog('blog list')}
          data-cy-link="see-blog"
        >
          {i18n.t('homepage.posts.see_all')}
          <> </>
          <ExternalLinkIconStyle aria-hidden focusable="false" />
          <ScreenReaderItemStyle>
            {i18n.t('common.open_new_window')}
          </ScreenReaderItemStyle>
        </HomepageQuestionsButtonStyle>
      </HomepagePageInnerStyle>
    </HomepageSectionStyle>
  );
};
