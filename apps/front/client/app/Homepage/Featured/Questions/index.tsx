import React, { FC } from 'react';
import { HomeQuestionType } from '@make.org/types';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { orderByEndDate, isInProgress } from '@make.org/utils/helpers/date';
import i18n from 'i18next';
import { TextStyleType } from '@make.org/designsystem/components/Typography/Text';
import { FeaturedListItemStyle } from './style';
import { FeaturedLink } from './Link';
import {
  HomepageSectionTitleStyle,
  HomepageSectionStyle,
  HomepagePageInnerStyle,
} from '../../../../pages/Home/style';
import { ConsultationElementSubtitleStyle } from '../../../Consultation/Browse/style';

type Props = {
  questions: HomeQuestionType[];
};

export const FeaturedQuestions: FC<Props> = ({ questions }) => {
  const sortedQuestions = questions
    .filter(question => isInProgress(question) || question.aboutUrl)
    .sort(orderByEndDate);
  return (
    <HomepageSectionStyle
      as="section"
      aria-labelledby="featured_questions_title"
      id="featured_questions"
    >
      <HomepagePageInnerStyle>
        <ConsultationElementSubtitleStyle
          className={TextStyleType.condensed}
          data-cy-container="featured_questions_subtitle"
        >
          {i18n.t('homepage.featured_questions.label')}
        </ConsultationElementSubtitleStyle>
        <HomepageSectionTitleStyle
          data-cy-container="featured_questions_title"
          id="featured_questions_title"
        >
          {i18n.t('homepage.featured_questions.title')}
        </HomepageSectionTitleStyle>
        <nav data-cy-container="featured_questions_navigation">
          <UnstyledListStyle>
            {sortedQuestions.map(question => (
              <FeaturedListItemStyle key={question.questionId}>
                <FeaturedLink question={question} />
              </FeaturedListItemStyle>
            ))}
          </UnstyledListStyle>
        </nav>
      </HomepagePageInnerStyle>
    </HomepageSectionStyle>
  );
};
