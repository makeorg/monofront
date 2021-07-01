// @flow
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { type IntroCardConfigType } from 'Shared/types/card';
import {
  trackDisplayIntroCard,
  trackClickStartSequence,
} from 'Shared/services/Tracking';
import { i18n } from 'Shared/i18n';
import { incrementSequenceIndex } from 'Shared/store/actions/sequence';
import { PlayIconStyle } from 'Client/ui/Elements/Buttons/style';
import {
  SequenceIntroButtonStyle,
  SequenceMainTitleStyle,
  SequenceIntroParagraphStyle,
} from './style';

type Props = {
  /** Object with Static properties used to configure the Intro Card */
  configuration: IntroCardConfigType,
};

export const IntroCard = ({ configuration }: Props) => {
  const dispatch = useDispatch();
  const { description, title } = configuration;
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
