// @flow
import React from 'react';
import { type StateRoot } from 'Shared/store/types';
import { type HomeQuestionType } from 'Shared/types/question';
import { NewWindowIconStyle } from 'Client/ui/Elements/LinkElements';
import { Link } from 'react-router-dom';
import { i18n } from 'Shared/i18n';
import {
  getDynamicConsultationLink,
  getParticipateLink,
} from 'Shared/helpers/url';
import { scrollToTop } from 'Shared/helpers/styled';
import { isInProgress } from 'Shared/helpers/date';
import {
  trackClickResults,
  trackClickParticipate,
} from 'Shared/services/Tracking';
import { useSelector } from 'react-redux';
import { ScreenReaderItemStyle } from 'Client/ui/Elements/AccessibilityElements';
import { ConsultationRedLinkElementStyle } from './style';

type Props = {
  question: HomeQuestionType,
  label: string,
};
export const ConsultationLink = ({ question, label }: Props) => {
  const { country } = useSelector((state: StateRoot) => state.appConfig);
  const { questionSlug, resultsLink, aboutUrl } = question;
  const consultationPath = getParticipateLink(country, questionSlug);

  const openedConsultation = isInProgress(question);
  const closedConsultationWithoutResults = !openedConsultation && !resultsLink;
  const externalResultLink =
    resultsLink && resultsLink.kind === 'external' && resultsLink.value;
  const internalResultLink =
    resultsLink && resultsLink.kind === 'internal' && resultsLink.value;

  const handleClick = () => {
    if (!openedConsultation) {
      trackClickResults();
    } else {
      trackClickParticipate(question.questionId);
    }
    scrollToTop();
  };

  if (openedConsultation) {
    return (
      <ConsultationRedLinkElementStyle
        as={Link}
        to={consultationPath}
        onClick={handleClick}
        data-cy-link={`item-link-${question.questionId}`}
      >
        {label}
      </ConsultationRedLinkElementStyle>
    );
  }

  if (closedConsultationWithoutResults || externalResultLink) {
    return (
      <ConsultationRedLinkElementStyle
        as="a"
        // $FlowFixMe : flow cannot understrand desctructuring externalResultLink
        href={externalResultLink ? resultsLink.value : aboutUrl || '#'}
        target="_blank"
        rel="noopener"
        onClick={handleClick}
        data-cy-link={`item-link-${question.questionId}`}
      >
        {label}
        <> </>
        <NewWindowIconStyle aria-hidden focusable="false" />
        <ScreenReaderItemStyle>
          {i18n.t('common.open_new_window')}
        </ScreenReaderItemStyle>
      </ConsultationRedLinkElementStyle>
    );
  }

  return (
    <ConsultationRedLinkElementStyle
      to={
        internalResultLink
          ? getDynamicConsultationLink(
              country,
              questionSlug,
              // $FlowFixMe : flow cannot understrand desctructuring internalResultLink
              resultsLink.value
            )
          : consultationPath
      }
      onClick={handleClick}
      data-cy-link={`item-link-${question.questionId}`}
    >
      {label}
    </ConsultationRedLinkElementStyle>
  );
};
