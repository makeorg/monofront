// @flow
import React from 'react';
import { type HomeQuestionType } from 'Shared/types/question';
import { RegistrationIncentive } from 'Client/features/consultation/Browse/RegistrationIncentive';
import { ConsultationItem } from 'Client/features/consultation/Browse/Item';
import { HomepagePageInnerStyle } from 'Client/pages/Home/style';
import { ConsultationsListStyle, ConsultationsListItemStyle } from './style';

type Props = {
  questions: HomeQuestionType[] | [],
  total: number,
  resultsContext?: boolean,
  noRegister?: boolean,
};

export const BrowseConsultationsList = ({
  questions,
  total,
  resultsContext = false,
  noRegister = false,
}: Props) => {
  const hasQuestions = total > 0;
  const hasOneQuestion = total === 1;
  let ITEMS_PER_ROW = 4;

  if (hasOneQuestion) {
    // setted at 2 because one question + RegistrationIncentive will be rendered
    ITEMS_PER_ROW = 2;
  }

  if (!hasOneQuestion && total < ITEMS_PER_ROW) {
    ITEMS_PER_ROW = total;
  }

  if (!hasQuestions) {
    return (
      <HomepagePageInnerStyle>
        <RegistrationIncentive
          questionsCount={total}
          resultsContext={resultsContext}
        />
      </HomepagePageInnerStyle>
    );
  }

  return (
    <ConsultationsListStyle>
      {questions.map(question => (
        <ConsultationsListItemStyle
          itemsPerRow={ITEMS_PER_ROW}
          key={question.questionId}
        >
          <ConsultationItem
            key={question.questionId}
            question={question}
            resultsContext={resultsContext}
            itemsCount={ITEMS_PER_ROW}
          />
        </ConsultationsListItemStyle>
      ))}
      {hasOneQuestion && !noRegister && (
        <ConsultationsListItemStyle itemsPerRow={ITEMS_PER_ROW}>
          <RegistrationIncentive
            questionsCount={total}
            resultsContext={resultsContext}
          />
        </ConsultationsListItemStyle>
      )}
    </ConsultationsListStyle>
  );
};
