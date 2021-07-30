import React, { FC } from 'react';
import { HomeQuestionType, HomePostType } from '@make.org/types';
import i18n from 'i18next';
import {
  HomepageSectionTitleStyle,
  HomepageSectionStyle,
  HomepagePageInnerStyle,
} from '../../../pages/Home/style';
import { ConsultationElementSubtitleStyle } from '../../Consultation/Browse/style';

import { FeaturedQuestions } from './Questions';
import { FeaturedPosts } from './Posts';
import { FeaturedSeparatorStyle } from './Posts/style';

type Props = {
  questions: HomeQuestionType[];
  posts: HomePostType[];
};

export const FeaturedNews: FC<Props> = ({ questions, posts }) => (
  <HomepageSectionStyle
    as="section"
    aria-labelledby="featured_questions_title"
    id="featured_questions"
  >
    <HomepagePageInnerStyle>
      <ConsultationElementSubtitleStyle data-cy-container="featured_questions_subtitle">
        {i18n.t('homepage.featured_questions.label')}
      </ConsultationElementSubtitleStyle>
      <HomepageSectionTitleStyle
        data-cy-container="featured_questions_title"
        id="featured_questions_title"
      >
        {i18n.t('homepage.featured_questions.title')}
      </HomepageSectionTitleStyle>
      <FeaturedQuestions questions={questions} />
      <FeaturedSeparatorStyle />
    </HomepagePageInnerStyle>
    <FeaturedPosts posts={posts} />
  </HomepageSectionStyle>
);
