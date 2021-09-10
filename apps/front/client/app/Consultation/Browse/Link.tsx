import React, { FC } from 'react';
import { HomeQuestionType } from '@make.org/types';
import {
  NewWindowIconStyle,
  RedUppercaseHTMLLinkElementStyle,
  RedUppercaseLinkElementStyle,
} from '@make.org/ui/elements/LinkElements';
import { Link } from 'react-router-dom';
import i18n from 'i18next';
import {
  getDynamicConsultationLink,
  getParticipateLink,
} from '@make.org/utils/helpers/url';
import { scrollToTop } from '@make.org/utils/helpers/styled';
import { isInProgress } from '@make.org/utils/helpers/date';
import {
  trackClickResults,
  trackClickParticipate,
} from '@make.org/utils/services/Tracking';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { useAppContext } from '@make.org/store';

type Props = {
  question: HomeQuestionType;
  label: string;
};
export const ConsultationLink: FC<Props> = ({ question, label }) => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
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
      <RedUppercaseLinkElementStyle
        as={Link}
        to={consultationPath}
        onClick={handleClick}
        data-cy-link={`item-link-${question.questionId}`}
      >
        {label}
      </RedUppercaseLinkElementStyle>
    );
  }

  if (closedConsultationWithoutResults || externalResultLink) {
    return (
      <RedUppercaseHTMLLinkElementStyle
        href={
          externalResultLink
            ? resultsLink && resultsLink.value
            : aboutUrl || '#'
        }
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
      </RedUppercaseHTMLLinkElementStyle>
    );
  }

  return (
    <RedUppercaseLinkElementStyle
      to={
        internalResultLink
          ? getDynamicConsultationLink(
              country,
              questionSlug,
              (resultsLink && resultsLink.value) || ''
            )
          : consultationPath
      }
      onClick={handleClick}
      data-cy-link={`item-link-${question.questionId}`}
    >
      {label}
    </RedUppercaseLinkElementStyle>
  );
};
