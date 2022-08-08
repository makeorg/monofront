import React, { FC } from 'react';
import i18n from 'i18next';
import { HomeQuestionType } from '@make.org/types';
import {
  getBrowseResultsLink,
  getBrowseConsultationsLink,
} from '@make.org/utils/helpers/url';
import { scrollToTop } from '@make.org/utils/helpers/styled';
import {
  trackClickBrowseConsultations,
  trackClickBrowseResults,
} from '@make.org/utils/services/Tracking';
import { useAppContext } from '@make.org/store';
import {
  HomepageSectionTitleStyle,
  HomepageSectionStyle,
  HomepagePageInnerStyle,
} from '../../../pages/Home/style';
import { BrowseConsultationsList } from '../../Consultation/Browse/List';
import { ConsultationElementTitleStyle } from '../../Consultation/Browse/style';
import { HomepageQuestionsButtonStyle, FeaturedSeparatorStyle } from './style';

type Props = {
  currentQuestions: HomeQuestionType[] | [];
  pastQuestions: HomeQuestionType[] | [];
};

export const HomepageQuestions: FC<Props> = ({
  currentQuestions,
  pastQuestions,
}) => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const hasCurrentQuestions = currentQuestions.length > 0;

  let buttonLink = getBrowseResultsLink(country);
  let buttonText = i18n.t('browse.see_closed_consultations');

  if (hasCurrentQuestions) {
    buttonLink = getBrowseConsultationsLink(country);
    buttonText = i18n.t('browse.browse');
  }

  const handleClick = () => {
    if (!hasCurrentQuestions) {
      trackClickBrowseResults();
    } else {
      trackClickBrowseConsultations();
    }
    scrollToTop();
  };

  return (
    <HomepageSectionStyle
      as="section"
      aria-labelledby="current_consultations_title"
      id="current_questions"
    >
      <HomepageSectionTitleStyle
        id="current_consultations_title"
        data-cy-container="current_consultations_title"
        className="with-container"
      >
        {i18n.t('browse.title')}
      </HomepageSectionTitleStyle>
      {hasCurrentQuestions ? (
        <BrowseConsultationsList
          questions={currentQuestions}
          total={currentQuestions.length}
        />
      ) : (
        <>
          <BrowseConsultationsList
            questions={currentQuestions}
            total={currentQuestions.length}
          />
          <HomepagePageInnerStyle>
            <FeaturedSeparatorStyle />
            <ConsultationElementTitleStyle>
              {i18n.t('browse.past_questions')}
            </ConsultationElementTitleStyle>
          </HomepagePageInnerStyle>
          <BrowseConsultationsList
            questions={pastQuestions}
            total={pastQuestions.length}
            resultsContext
            noRegister
          />
        </>
      )}
      <HomepagePageInnerStyle>
        <HomepageQuestionsButtonStyle
          to={buttonLink}
          onClick={handleClick}
          data-cy-link="current-questions-link"
        >
          {buttonText}
        </HomepageQuestionsButtonStyle>
      </HomepagePageInnerStyle>
    </HomepageSectionStyle>
  );
};
