import React, { useEffect } from 'react';
import { IntroCardConfigType } from '@make.org/types';
import {
  trackDisplayIntroCard,
  trackClickStartSequence,
} from '@make.org/utils/services/Tracking';
import { i18n } from '@make.org/utils/i18n';
import { incrementSequenceIndex } from '@make.org/store/actions/sequence';
import { useAppContext } from '@make.org/store';
import { PlayIconStyle } from '@make.org/ui/elements/SvgElements';
import {
  SequenceIntroButtonStyle,
  SequenceMainTitleStyle,
  SequenceIntroParagraphStyle,
} from './style';

type Props = {
  /** Object with Static properties used to configure the Intro Card */
  configuration: IntroCardConfigType;
};

export const IntroCard: React.FC<Props> = ({ configuration }) => {
  const { dispatch } = useAppContext();
  const { description = '', title } = configuration;
  const descriptionText = description || i18n.t('intro_card.description');
  const handleStartSequence = () => {
    dispatch(incrementSequenceIndex());
    trackClickStartSequence();
  };

  useEffect(() => {
    trackDisplayIntroCard();
  }, []);

  return (
    <>
      <SequenceMainTitleStyle data-cy-container="intro-card-title">
        {title || i18n.t('intro_card.title')}
      </SequenceMainTitleStyle>
      {descriptionText.split('\n').map((text, index) => (
        <SequenceIntroParagraphStyle
          key={text}
          data-cy-container={`intro-card-text-${index}`}
        >
          {text}
        </SequenceIntroParagraphStyle>
      ))}
      <SequenceIntroButtonStyle
        id="sequence-start-sequence-button"
        data-cy-button="start-sequence"
        onClick={handleStartSequence}
      >
        <PlayIconStyle aria-hidden focusable="false" />
        {i18n.t('intro_card.button')}
      </SequenceIntroButtonStyle>
    </>
  );
};
