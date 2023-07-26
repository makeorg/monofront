import React, { useEffect } from 'react';
import { useAppContext } from '@make.org/store';
import { trackDisplayIntroDemographics } from '@make.org/utils/services/Tracking';
import i18n from 'i18next';
import { incrementSequenceIndex } from '@make.org/store/actions/sequence';
import {
  SequenceIntroButtonStyle,
  SequenceMainTitleStyle,
  SequenceIntroParagraphStyle,
} from './style';

export const DemographicsIntroCard: React.FC = () => {
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
        data-cy-button="demographics-intro-next"
      >
        {i18n.t('demographics_intro.next')}
      </SequenceIntroButtonStyle>
    </>
  );
};
