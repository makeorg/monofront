import React from 'react';
import { SpaceBetweenRowStyle } from '@make.org/ui/elements/FlexElements';
import i18n from 'i18next';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { ThemeProvider } from 'styled-components';
import { pxToPercent } from '@make.org/utils/helpers/styled';
import { trackClickPreviousCard } from '@make.org/utils/services/Tracking';
import { QuestionType } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import { decrementSequenceIndex } from '@make.org/store/actions/sequence';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import {
  ProgressPreviousButtonStyle,
  ProgressIconStyle,
  ProgressCounterStyle,
  ProgressBarWrapperStyle,
  ProgressBarStyle,
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
  const index = currentIndex + 1;
  const total = cards ? cards.length : 0;

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
        {!disabled && (
          <>
            <ScreenReaderItemStyle aria-live="polite">
              {i18n.t('sequence_progress.counter', {
                current: index,
                total,
              })}
            </ScreenReaderItemStyle>
            <ProgressCounterStyle
              aria-hidden
              className={isWidget ? 'widget' : ''}
            >
              {`${index}/${total}`}
            </ProgressCounterStyle>
          </>
        )}
        <ProgressBarWrapperStyle>
          <ProgressBarStyle percentWidth={pxToPercent(index, total)} />
        </ProgressBarWrapperStyle>
      </SpaceBetweenRowStyle>
    </ThemeProvider>
  );
};
