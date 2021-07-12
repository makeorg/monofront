import React from 'react';
import { SpaceBetweenRowStyle } from '@make.org/ui/elements/FlexElements';
import { i18n } from '@make.org/utils/i18n';
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

export const SequenceProgress: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const question: QuestionType = selectCurrentQuestion(state);
  const { cards, currentIndex = 0 } = state.sequence || {};
  const index = currentIndex + 1;
  const total = cards ? cards.length : 0;

  return (
    <ThemeProvider theme={question.theme}>
      <SpaceBetweenRowStyle className="fullwidth" data-cy-container="progress">
        <ProgressPreviousButtonStyle
          onClick={() => {
            dispatch(decrementSequenceIndex());
            trackClickPreviousCard();
          }}
          disabled={currentIndex === 0}
          aria-label={i18n.t('sequence_progress.previous')}
          data-cy-button="progress-previous"
        >
          <ProgressIconStyle aria-hidden focusable="false" />
        </ProgressPreviousButtonStyle>
        <ScreenReaderItemStyle aria-live="polite">
          {i18n.t('sequence_progress.counter', {
            current: index,
            total,
          })}
        </ScreenReaderItemStyle>
        <ProgressCounterStyle aria-hidden>
          {`${index}/${total}`}
        </ProgressCounterStyle>
        <ProgressBarWrapperStyle>
          <ProgressBarStyle percentWidth={pxToPercent(index, total)} />
        </ProgressBarWrapperStyle>
      </SpaceBetweenRowStyle>
    </ThemeProvider>
  );
};
