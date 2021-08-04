import React, { FC } from 'react';
import { HomePostType } from '@make.org/types';
import { trackClickBlog } from '@make.org/utils/services/Tracking';
import i18n from 'i18next';
import { URL } from '@make.org/types/enums';
import { ExternalLinkIconStyle } from '@make.org/ui/elements/ButtonsElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  ConsultationsListStyle,
  ConsultationsListItemStyle,
  ConsultationArticleStyle,
  ConsultationElementPictureStyle,
  ConsultationElementTitleStyle,
  ConsultationElementParagraphStyle,
  ConsultationRedHTMLLinkElementStyle,
} from '../../../Consultation/Browse/style';
import { HomepagePageInnerStyle } from '../../../../pages/Home/style';
import { HomepageQuestionsButtonStyle } from '../../Questions/style';

type Props = {
  posts: HomePostType[];
};

export const FeaturedPosts: FC<Props> = ({ posts }) => {
  const noFeaturedPosts = posts.length === 0;

  if (noFeaturedPosts) {
    return null;
  }

  return (
    <>
      <ConsultationsListStyle>
        {posts.map(post => (
          <ConsultationsListItemStyle itemsPerRow={3} key={post.title}>
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
              <ConsultationRedHTMLLinkElementStyle
                href={post.link || '#'}
                target="_blank"
                rel="noopener"
                onClick={() => trackClickBlog('blog item')}
              >
                {i18n.t('homepage.posts.link_text')}
              </ConsultationRedHTMLLinkElementStyle>
            </ConsultationArticleStyle>
          </ConsultationsListItemStyle>
        ))}
      </ConsultationsListStyle>
      <HomepagePageInnerStyle>
        <HomepageQuestionsButtonStyle
          as="a"
          href={URL.ABOUT_MAKE_LINK}
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
    </>
  );
};
