import React, { useEffect } from 'react';
import { IntroCardConfigType } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import { trackDisplayIntroDemographics } from '@make.org/utils/services/Tracking';
import i18n from 'i18next';
import { incrementSequenceIndex } from '@make.org/store/actions/sequence';
import {
  SequenceIntroButtonStyle,
  SequenceMainTitleStyle,
  SequenceIntroParagraphStyle,
} from './style';

type Props = {
  /** Object with Static properties used to configure the Intro Card */
  configuration: IntroCardConfigType;
};

export const DemographicsIntroCard: React.FC<Props> = () => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    trackDisplayIntroDemographics();
  }, []);

  return (
    <>
      <SequenceMainTitleStyle data-cy-container="intro-card-title">
        {i18n.t('demographics_intro.title')}
      </SequenceMainTitleStyle>
      <SequenceIntroParagraphStyle>
        {i18n.t('demographics_intro.protect')}
      </SequenceIntroParagraphStyle>
      <SequenceIntroButtonStyle
        onClick={() => dispatch(incrementSequenceIndex())}
      >
        {i18n.t('demographics_intro.next')}
      </SequenceIntroButtonStyle>
    </>
  );
};
