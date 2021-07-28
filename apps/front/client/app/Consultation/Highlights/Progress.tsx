import { ScreenReaderItemStyle } from 'Client/ui/Elements/AccessibilityElements';
import React from 'react';
import { useLocation } from 'react-router';
import { type QuestionHighlightsType } from 'Shared/types/question';
import { useSelector } from 'react-redux';
import { i18n } from 'Shared/i18n';
import { selectCurrentQuestion } from 'Shared/store/selectors/questions.selector';
import { getVotesRatio } from 'Shared/helpers/voteResult';
import { isResultsPage } from 'Shared/routes';
import { formatCountWithLanguage } from 'Shared/helpers/numberFormatter';
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

export const Progress = () => {
  const {
    highlights,
  }: {
    highlights: QuestionHighlightsType,
  } = useSelector((state: StateRoot) => selectCurrentQuestion(state));
  const { language } = useSelector((state: StateRoot) => state.appConfig);
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
