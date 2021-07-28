import React, { FC } from 'react';
import { HomeQuestionType } from '@make.org/types';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { orderByEndDate, isInProgress } from '@make.org/utils/helpers/date';
import { FeaturedListItemStyle } from './style';
import { FeaturedLink } from './Link';

type Props = {
  questions: HomeQuestionType[];
};

export const FeaturedQuestions: FC<Props> = ({ questions }) => {
  const sortedQuestions = questions
    .filter(question => isInProgress(question) || question.aboutUrl)
    .sort(orderByEndDate);
  return (
    <nav data-cy-container="featured_questions_navigation">
      <UnstyledListStyle>
        {sortedQuestions.map(question => (
          <FeaturedListItemStyle key={question.questionId}>
            <FeaturedLink question={question} />
          </FeaturedListItemStyle>
        ))}
      </UnstyledListStyle>
    </nav>
  );
};
