// @flow
import React from 'react';
import { color } from 'athena-design-tokens';
import { useSelector } from 'react-redux';
import { type StateRoot } from '@make.org/utils/store/types';
import { type QuestionType } from '@make.org/utils/types/question';
import { isInProgress } from '@make.org/utils/helpers/date';
import { getParticipateLink } from '@make.org/utils/helpers/url';
import { trackClickHomepageConsultations } from '@make.org/utils/services/Tracking';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import i18n from 'i18next';
import {
  SearchResultsConsultationListStyle,
  BusinessConsultationsItemStyle,
  BusinessConsultationsItemWrapperStyle,
  BusinessConsultationsItemBorderStyle,
  BusinessConsultationStyle,
  BusinessConsultationsItemStatusStyle,
  BusinessConsultationsItemArrowStyle,
  BusinessConsultationsItemLinkStyle,
} from '../Styled';

type Props = {
  questions: QuestionType[],
};

const businessConsultation = (question, country) => (
  <BusinessConsultationsItemStyle
    key={question.slug}
    backgroundColor={color.white}
  >
    <BusinessConsultationsItemWrapperStyle>
      <BusinessConsultationsItemBorderStyle color={question.theme.color} />
      <BusinessConsultationStyle>
        <BusinessConsultationsItemStatusStyle>
          <ScreenReaderItemStyle>
            {i18n.t('search.main_results.status')}
          </ScreenReaderItemStyle>
          {isInProgress(question)
            ? i18n.t('search.main_results.open_consultation')
            : i18n.t('search.main_results.finished_consultation')}
        </BusinessConsultationsItemStatusStyle>
        <BusinessConsultationsItemLinkStyle
          to={
            isInProgress(question)
              ? getParticipateLink(country, question.slug)
              : undefined
          }
          as={!isInProgress(question) && 'a'}
          href={isInProgress(question) ? undefined : question.aboutUrl || '#'}
          onClick={() => trackClickHomepageConsultations()}
        >
          {question.question}
        </BusinessConsultationsItemLinkStyle>
      </BusinessConsultationStyle>

      <BusinessConsultationsItemArrowStyle aria-hidden focusable="false" />
    </BusinessConsultationsItemWrapperStyle>
  </BusinessConsultationsItemStyle>
);
export const BusinessConsultationsList = ({ questions }: Props) => {
  const { country } = useSelector((state: StateRoot) => state.appConfig);

  return (
    <SearchResultsConsultationListStyle>
      {questions.map(question => businessConsultation(question, country))}
    </SearchResultsConsultationListStyle>
  );
};
