import React, { useEffect, useState } from 'react';
import { SpaceBetweenRowStyle } from '@make.org/ui/elements/FlexElements';
import i18n from 'i18next';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { ThemeProvider } from 'styled-components';
import { pxToPercent } from '@make.org/utils/helpers/styled';
import {
  // trackClickNextOnLastProposal,
  trackClickNextCard,
  trackClickNextOnLastProposal,
  trackClickPreviousCard,
} from '@make.org/utils/services/Tracking';
import { QuestionType } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import {
  decrementSequenceIndex,
  incrementSequenceIndex,
} from '@make.org/store/actions/sequence';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { CARD } from '@make.org/types/enums';
import {
  ProgressPreviousButtonStyle,
  ProgressNextButtonStyle,
  ProgressIconStyle,
  ProgressCounterStyle,
  ProgressBarWrapperStyle,
  ProgressBarStyle,
  ProgressNextIconStyle,
} from './style';

export const SequenceProgress: React.FC<{
  disabled?: boolean;
}> = ({ disabled }) => {
  const { dispatch, state } = useAppContext();
  const { source } = state.appConfig;
  const isWidget = source === 'widget';
  const question: QuestionType | null = selectCurrentQuestion(state);
  const { theme } = question || {};
  const { cards, currentIndex = 0 } = state.sequence || {};
  const { votes = [] } =
    cards[currentIndex] && cards[currentIndex].state
      ? cards[currentIndex].state
      : {};
  const userVote = votes && votes.find(vote => vote.hasVoted === true);
  const index = currentIndex + 1;
  const total = cards ? cards.length : 0;
  const getLastCardIndex = () => {
    const allProposals = cards.filter(
      card => card.type === CARD.CARD_TYPE_PROPOSAL
    );
    const lastCard = allProposals.pop();
    if (lastCard) {
      return lastCard.index;
    }
    return 0;
  };
  const [isLastProposalCard, setIsLastProposalCard] = useState(
    currentIndex === getLastCardIndex()
  );

  useEffect(() => {
    setIsLastProposalCard(currentIndex === getLastCardIndex());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const goToNextCard = () => {
    dispatch(incrementSequenceIndex());
    if (isLastProposalCard) {
      return trackClickNextOnLastProposal();
    }
    return trackClickNextCard();
  };

  const goToPreviousCard = () => {
    dispatch(decrementSequenceIndex());
    return trackClickPreviousCard();
  };

  return (
    <ThemeProvider theme={theme}>
      <SpaceBetweenRowStyle className="fullwidth" data-cy-container="progress">
        <ProgressPreviousButtonStyle
          className={isWidget ? 'widget' : ''}
          onClick={goToPreviousCard}
          disabled={currentIndex === 0 || disabled}
          aria-label={i18n.t('sequence_progress.previous')}
          data-cy-button="progress-previous"
        >
          <ProgressIconStyle
            className={isWidget ? 'widget' : ''}
            aria-hidden
            focusable="false"
          />
        </ProgressPreviousButtonStyle>
        <ScreenReaderItemStyle aria-live="polite">
          {i18n.t('sequence_progress.counter', {
            current: index,
            total,
          })}
        </ScreenReaderItemStyle>
        {!isWidget && (
          <ProgressCounterStyle aria-hidden>
            {`${index}/${total}`}
          </ProgressCounterStyle>
        )}
        <ProgressBarWrapperStyle>
          <ProgressBarStyle percentWidth={pxToPercent(index, total)} />
        </ProgressBarWrapperStyle>
        {isWidget && (
          <>
            <ProgressCounterStyle
              disabled={disabled}
              aria-hidden
              isWidget={isWidget}
            >
              {!disabled && `${index}/${total}`}
            </ProgressCounterStyle>

            <ProgressNextButtonStyle
              onClick={goToNextCard}
              disabled={!(userVote && userVote.voteKey) || disabled}
              // aria-label={i18n.t('sequence_progress.previous')} TO DO IN I18N
              data-cy-button="next-proposal"
            >
              <ProgressNextIconStyle
                className={isWidget ? 'widget' : ''}
                aria-hidden
                focusable="false"
              />
            </ProgressNextButtonStyle>
          </>
        )}
      </SpaceBetweenRowStyle>
    </ThemeProvider>
  );
};
