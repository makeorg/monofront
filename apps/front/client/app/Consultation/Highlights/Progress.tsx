import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import React, { FC } from 'react';
import { useLocation } from 'react-router';
import { QuestionHighlightsType } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import i18n from 'i18next';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { getVotesRatio } from '@make.org/utils/helpers/voteResult';
import { isResultsPage } from '@make.org/utils/routes';
import { formatCountWithLanguage } from '@make.org/utils/helpers/numberFormatter';
import {
  ProgressWrapperStyle,
  ProgressInnerStyle,
  ProgressTitleStyle,
  VotesTargetStyle,
  ProgressBarContainerStyle,
  ProgressBarStyle,
  ProgressParticipateStyle,
  ProgressDescriptionStyle,
} from './style';

export const Progress: FC = () => {
  const { state } = useAppContext();
  const {
    highlights,
  }: {
    highlights: QuestionHighlightsType;
  } = selectCurrentQuestion(state);
  const { language } = state.appConfig;
  const { votesCount, votesTarget } = highlights;
  const votesPercent = getVotesRatio(votesCount, votesTarget);
  const location = useLocation();
  const resultsPage = isResultsPage(location.pathname);

  return (
    <ProgressWrapperStyle>
      <ProgressInnerStyle>
        <ProgressTitleStyle as="h3">
          {resultsPage
            ? i18n.t('consultation.highlights.progress_total')
            : i18n.t('consultation.highlights.progress_title')}
        </ProgressTitleStyle>
        <ScreenReaderItemStyle> : </ScreenReaderItemStyle>
        <VotesTargetStyle>
          <span>{formatCountWithLanguage(votesCount, language)}</span>
          {i18n.t('consultation.highlights.progress_target', {
            votesTarget: formatCountWithLanguage(votesTarget, language),
            percent: votesPercent,
          })}
        </VotesTargetStyle>
        <ProgressBarContainerStyle>
          <ProgressBarStyle percent={votesPercent} />
        </ProgressBarContainerStyle>
        {!resultsPage && (
          <ProgressParticipateStyle>
            <ProgressDescriptionStyle>
              {i18n.t('consultation.highlights.progress_description')}
            </ProgressDescriptionStyle>
          </ProgressParticipateStyle>
        )}
      </ProgressInnerStyle>
    </ProgressWrapperStyle>
  );
};
