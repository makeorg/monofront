/* eslint-disable react/jsx-no-useless-fragment */
import React, { FC } from 'react';
import { HomeQuestionType } from '@make.org/types';
import { DateHelper, isInProgress } from '@make.org/utils/helpers/date';
import i18n from 'i18next';
import { formatMillionToText } from '@make.org/utils/helpers/numberFormatter';
import { DATE } from '@make.org/types/enums';
import { TextStyleType } from '@make.org/designsystem/components/Typography/Text';
import { ConsultationParticipateString } from './ParticipateString';
import {
  ConsultationElementPictureStyle,
  ConsultationElementSubtitleStyle,
  ConsultationElementTitleStyle,
  ConsultationElementParagraphStyle,
  ClockIconStyle,
  ConsultationArticleStyle,
  ConsultationPeopleIconStyle,
  ConsultationLightIconStyle,
  ConsultationItemStyle,
  ConsultationActionIconStyle,
  ConsultationVoteIconStyle,
} from './style';
import { ConsultationLink } from './Link';

type Props = {
  question: HomeQuestionType;
  resultsContext: boolean;
};

export const ConsultationItem: FC<Props> = ({ question, resultsContext }) => {
  const {
    descriptionImage,
    descriptionImageAlt,
    featured,
    startDate,
    endDate,
    resultsLink,
    participantsCount,
    proposalsCount,
    returnedLanguage,
    actions,
    votesCount,
  } = question;
  const hasTopIdeas =
    resultsContext && resultsLink && resultsLink.value === 'top-ideas';
  const hasInternalResults =
    resultsContext && resultsLink && resultsLink.value === 'results';
  const hasExternalResults =
    resultsContext && resultsLink && resultsLink.kind === 'external';
  const hasContributors = participantsCount > 0;
  const hasProposals = proposalsCount > 0;
  const hasVotes = votesCount > 0;

  let linkText = i18n.t('browse.consultations.participate');

  if (resultsContext) {
    linkText = i18n.t('browse.results.coming_results');
  }

  if (hasTopIdeas) {
    linkText = i18n.t('browse.results.see_topideas');
  }

  if (hasInternalResults || hasExternalResults) {
    linkText = i18n.t('browse.results.see_results');
  }

  return (
    <ConsultationArticleStyle>
      <ConsultationElementPictureStyle
        src={descriptionImage || ''}
        alt={descriptionImageAlt || ''}
        width={555}
      />
      {featured && (
        <ConsultationElementSubtitleStyle className={TextStyleType.condensed}>
          {i18n.t('browse.initiative')}
        </ConsultationElementSubtitleStyle>
      )}
      <ConsultationElementTitleStyle lang={question.returnedLanguage}>
        {question.question}
      </ConsultationElementTitleStyle>
      <ConsultationElementParagraphStyle>
        {/* Display contributors count only for ended consultations */}
        {hasContributors && !isInProgress(question) && (
          <ConsultationItemStyle>
            <ConsultationPeopleIconStyle aria-hidden focusable="false" />
            <> </>
            {formatMillionToText(participantsCount, returnedLanguage)}
            <> </>
            {` ${i18n.t('browse.consultations.contributors', {
              count: participantsCount,
            })}`}
          </ConsultationItemStyle>
        )}
        {hasProposals && (
          <ConsultationItemStyle>
            <ConsultationLightIconStyle aria-hidden focusable="false" />
            <> </>
            {formatMillionToText(proposalsCount, returnedLanguage)}
            <> </>
            {` ${i18n.t('browse.consultations.proposals', {
              count: proposalsCount,
            })}`}
          </ConsultationItemStyle>
        )}
        {hasVotes && (
          <ConsultationItemStyle>
            <ConsultationVoteIconStyle
              width={15}
              height={13}
              aria-hidden
              focusable="false"
            />
            <> </>
            {formatMillionToText(votesCount, returnedLanguage)}
            <> </>
            {` ${i18n.t('browse.consultations.votes', {
              count: votesCount,
            })}`}
          </ConsultationItemStyle>
        )}
        {actions && (
          <ConsultationItemStyle className="red">
            <ConsultationActionIconStyle aria-hidden focusable="false" />
            <> </>
            {actions}
          </ConsultationItemStyle>
        )}
        <ConsultationItemStyle>
          <ClockIconStyle aria-hidden focusable="false" />
          <> </>
          {i18n.t('browse.date', {
            startDate: DateHelper.localizedAndFormattedDate(
              startDate,
              DATE.PPP_FORMAT
            ),
            endDate: DateHelper.localizedAndFormattedDate(
              endDate,
              DATE.PPP_FORMAT
            ),
          })}
        </ConsultationItemStyle>
      </ConsultationElementParagraphStyle>
      <ConsultationParticipateString question={question} label={linkText} />
      <ConsultationLink question={question} label={linkText} />
    </ConsultationArticleStyle>
  );
};
