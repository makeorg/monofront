import React from 'react';
import { colors } from '@make.org/designsystem/tokens/colors';
import { QuestionType } from '@make.org/types';
import { isInProgress } from '@make.org/utils/helpers/date';
import { getParticipateLink } from '@make.org/utils/helpers/url';
import { trackClickHomepageConsultations } from '@make.org/utils/services/Tracking';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import {
  SearchResultsConsultationListStyle,
  BusinessConsultationsItemStyle,
  BusinessConsultationsItemWrapperStyle,
  BusinessConsultationsItemBorderStyle,
  BusinessConsultationStyle,
  BusinessConsultationsItemStatusStyle,
  BusinessConsultationsItemArrowStyle,
  BusinessConsultationsItemLinkStyle,
  BusinessConsultationsItemHTMLLinkStyle,
} from './style';

type Props = {
  questions: QuestionType[];
};

const businessConsultation = (question: QuestionType, country: string) => (
  <BusinessConsultationsItemStyle
    key={question.slug}
    backgroundColor={colors.Background.Interface.Lighter}
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
        {isInProgress(question) ? (
          <BusinessConsultationsItemLinkStyle
            to={getParticipateLink(country, question.slug)}
            onClick={() => trackClickHomepageConsultations()}
          >
            {question.question}
          </BusinessConsultationsItemLinkStyle>
        ) : (
          <BusinessConsultationsItemHTMLLinkStyle
            href={question.aboutUrl || '#'}
            onClick={() => trackClickHomepageConsultations()}
          >
            {question.question}
          </BusinessConsultationsItemHTMLLinkStyle>
        )}
      </BusinessConsultationStyle>

      <BusinessConsultationsItemArrowStyle aria-hidden focusable="false" />
    </BusinessConsultationsItemWrapperStyle>
  </BusinessConsultationsItemStyle>
);
export const BusinessConsultationsList: React.FC<Props> = ({ questions }) => {
  const { state } = useAppContext();
  const { country } = state.appConfig;

  return (
    <SearchResultsConsultationListStyle>
      {questions.map(question => businessConsultation(question, country))}
    </SearchResultsConsultationListStyle>
  );
};
