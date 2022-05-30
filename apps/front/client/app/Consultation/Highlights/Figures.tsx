import React, { FC } from 'react';
import { useLocation } from 'react-router';
import { QuestionType } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { DateHelper, getRemainingDays } from '@make.org/utils/helpers/date';
import i18n from 'i18next';
import { isResultsPage } from '@make.org/utils/routes';
import {
  formatCountWithLanguage,
  formatMillionToText,
} from '@make.org/utils/helpers/numberFormatter';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { DATE } from '@make.org/types/enums';
import {
  FiguresValueStyle,
  FiguresListStyle,
  FiguresListItemStyle,
  HigthlightsTitleStyle,
} from './style';

export const Figures: FC = () => {
  const { state } = useAppContext();
  const { language } = state.appConfig;
  const question: QuestionType = selectCurrentQuestion(state);
  const remainingDays = getRemainingDays(question ? question.endDate : '');
  const location = useLocation();
  const resultsPage = isResultsPage(location.pathname);

  return (
    <FiguresListStyle>
      <FiguresListItemStyle>
        <HigthlightsTitleStyle>
          {resultsPage
            ? i18n.t('consultation.highlights.end_date')
            : i18n.t('consultation.highlights.start_date')}
        </HigthlightsTitleStyle>
        <ScreenReaderItemStyle> : </ScreenReaderItemStyle>
        <FiguresValueStyle
          className="padding-right"
          as="time"
          dateTime={
            resultsPage
              ? DateHelper.localizedAndFormattedDate(
                  question.endDate,
                  DATE.P_FORMAT
                )
              : DateHelper.localizedAndFormattedDate(
                  question.startDate,
                  DATE.P_FORMAT
                )
          }
        >
          {resultsPage
            ? question &&
              DateHelper.localizedAndFormattedDate(
                question.endDate,
                DATE.PP_FORMAT
              )
            : DateHelper.localizedAndFormattedDate(
                question.startDate,
                DATE.PP_FORMAT
              )}
        </FiguresValueStyle>
      </FiguresListItemStyle>
      <FiguresListItemStyle>
        <HigthlightsTitleStyle>
          {resultsPage
            ? i18n.t('consultation.highlights.proposals')
            : i18n.t('consultation.highlights.remaining', {
                count: remainingDays || 0,
              })}
        </HigthlightsTitleStyle>
        <ScreenReaderItemStyle> : </ScreenReaderItemStyle>
        <FiguresValueStyle>
          {resultsPage
            ? formatCountWithLanguage(
                question.highlights.proposalsCount,
                language
              )
            : formatCountWithLanguage(remainingDays || 0, language)}
        </FiguresValueStyle>
      </FiguresListItemStyle>
      <FiguresListItemStyle>
        <HigthlightsTitleStyle>
          {resultsPage
            ? i18n.t('consultation.highlights.participant', {
                count: question.highlights.participantsCount,
              })
            : i18n.t('consultation.highlights.proposals')}
        </HigthlightsTitleStyle>
        <ScreenReaderItemStyle> : </ScreenReaderItemStyle>
        <FiguresValueStyle className="mobile-extra-margin-bottom">
          {resultsPage
            ? formatMillionToText(
                question.highlights.participantsCount,
                language
              )
            : formatCountWithLanguage(
                question.highlights.proposalsCount,
                language
              )}
        </FiguresValueStyle>
      </FiguresListItemStyle>
    </FiguresListStyle>
  );
};
