import React, { FC } from 'react';
import { useAppContext } from '@make.org/store';
import { useLocation } from 'react-router';
import { DateHelper, isInProgress } from '@make.org/utils/helpers/date';
import i18n from 'i18next';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { isGreatCause } from '@make.org/utils/helpers/question';
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_DE,
} from '@make.org/utils/constants/config';
import { QuestionType } from '@make.org/types';
import { isResultsPage } from '@make.org/utils/routes';
import { DATE, FEATURE_FLIPPING } from '@make.org/types/enums';

import { checkIsFeatureActivated } from '@make.org/utils/helpers/featureFlipping';
import {
  buildTimeline,
  getStepTitle,
  selectStep,
} from '../../../helpers/timeline';
import {
  TimelineWrapperStyle,
  TimelineListWrapperStyle,
  TimelineItemTitleStyle,
  TimelineItemDateStyle,
  TimelineItemTextStyle,
  TimelineItemWrapperStyle,
  TimelineTitleStyle,
  TimelineContentStyle,
  TimelineWorkshopLinkStyle,
  TimelineItemMarkerIsCurrent,
} from './style';

type Props = {
  title: string;
  dateText: string;
  description: string;
  withLink?: boolean;
  isCurrent?: boolean;
};

const TimelineItem: FC<Props> = ({
  title,
  dateText,
  description,
  withLink = false,
  isCurrent = false,
}) => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const isDE = country === 'DE';
  const EMAIL = isDE ? CONTACT_EMAIL_DE : CONTACT_EMAIL;

  return (
    <TimelineItemWrapperStyle>
      <TimelineItemTitleStyle>
        {title}
        {isCurrent && <TimelineItemMarkerIsCurrent />}
      </TimelineItemTitleStyle>
      <TimelineItemDateStyle>{dateText}</TimelineItemDateStyle>
      <TimelineItemTextStyle>{description}</TimelineItemTextStyle>
      {withLink && (
        <TimelineWorkshopLinkStyle href={`mailto:${EMAIL}`}>
          {i18n.t('consultation.timeline.workshop_link')}
        </TimelineWorkshopLinkStyle>
      )}
    </TimelineItemWrapperStyle>
  );
};

export const Timeline: FC = () => {
  const { state } = useAppContext();
  const question: QuestionType = selectCurrentQuestion(state);
  const { timeline } = question;
  const { result, workshop, action } = timeline;
  const oneStepTimeline = !result && !workshop && !action;
  const questionIsGreatCause = isGreatCause(question.operationKind);
  const location = useLocation();
  const resultsPage = isResultsPage(location.pathname);

  const firstStepDateText = resultsPage
    ? i18n.t('consultation.timeline.consultation_from_to', {
        startDate: DateHelper.localizedAndFormattedDate(
          question.startDate,
          DATE.D_MMMM_FORMAT
        ),
        endDate: DateHelper.localizedAndFormattedDate(
          question.endDate,
          DATE.D_MMMM_YYYY_FORMAT
        ),
      })
    : DateHelper.localizedAndFormattedDate(
        question.startDate,
        DATE.MMMM_YYYY_FORMAT
      );
  const timelineSteps = buildTimeline(timeline);

  const isTimelineActive: boolean = checkIsFeatureActivated(
    FEATURE_FLIPPING.CONSULTATION_TIMELINE_ACTIVE,
    question.activeFeatures
  );

  if (!isTimelineActive) {
    return null;
  }

  return (
    <TimelineWrapperStyle>
      <TimelineContentStyle>
        <TimelineTitleStyle>
          {questionIsGreatCause
            ? i18n.t('consultation.timeline.timeline_title_great_cause')
            : i18n.t('consultation.timeline.timeline_title_consultation')}
        </TimelineTitleStyle>
        {oneStepTimeline ? (
          <TimelineListWrapperStyle as="div">
            <TimelineItem
              title={i18n.t('consultation.timeline.consultation_title')}
              dateText={firstStepDateText || ''}
              description={i18n.t(
                'consultation.timeline.consultation_description'
              )}
              isCurrent
            />
          </TimelineListWrapperStyle>
        ) : (
          <TimelineListWrapperStyle>
            <li>
              <TimelineItem
                title={i18n.t('consultation.timeline.consultation_title')}
                dateText={firstStepDateText || ''}
                description={i18n.t(
                  'consultation.timeline.consultation_description'
                )}
                isCurrent={isInProgress(question)}
              />
            </li>
            {timelineSteps.map((step, index) => (
              <li key={step.name}>
                <TimelineItem
                  title={getStepTitle(step.name)}
                  dateText={step.dateText}
                  description={step.description}
                  isCurrent={selectStep(
                    timeline,
                    step.name,
                    timelineSteps[index + 1] && timelineSteps[index + 1].name
                  )}
                />
              </li>
            ))}
          </TimelineListWrapperStyle>
        )}
      </TimelineContentStyle>
    </TimelineWrapperStyle>
  );
};
