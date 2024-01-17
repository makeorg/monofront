import React, { FC } from 'react';
import i18n from 'i18next';
import resume from '../../assets/Group 6.png';
import theme from '../../assets/Group 74.png';
import video from '../../assets/Sourcesx2.png';
import {
  OnboardingTitleStyle,
  OnboardingSubTitleStyle,
  OnboardingTextStyle,
  OnboardingContentContainerStyle,
  OnboardingBlocksContainerStyle,
  OnboardingBlockStyle,
  OnboardingImgContainerStyle,
  OnboardingImgStyle,
} from './style';
import { useAssemblyContext } from '../../store/context';

export const OnboardingContent: FC = () => {
  const { state } = useAssemblyContext();
  const { introduction } = state.event;

  return (
    <OnboardingContentContainerStyle>
      <OnboardingTitleStyle>{introduction}</OnboardingTitleStyle>
      <OnboardingBlocksContainerStyle>
        <OnboardingBlockStyle>
          <OnboardingImgContainerStyle>
            <OnboardingImgStyle src={resume} alt="" />
          </OnboardingImgContainerStyle>
          <OnboardingSubTitleStyle>
            {i18n.t('modal.suggestion')}
          </OnboardingSubTitleStyle>
          <OnboardingTextStyle>
            {i18n.t('modal.suggestionText')}
          </OnboardingTextStyle>
        </OnboardingBlockStyle>
        <OnboardingBlockStyle>
          <OnboardingImgContainerStyle>
            <OnboardingImgStyle src={video} alt="" />
          </OnboardingImgContainerStyle>
          <OnboardingSubTitleStyle>
            {i18n.t('modal.sources')}
          </OnboardingSubTitleStyle>
          <OnboardingTextStyle>
            {i18n.t('modal.sourcesText')}
          </OnboardingTextStyle>
        </OnboardingBlockStyle>
        <OnboardingBlockStyle>
          <OnboardingImgContainerStyle>
            <OnboardingImgStyle src={theme} alt="" />
          </OnboardingImgContainerStyle>
          <OnboardingSubTitleStyle>
            {i18n.t('modal.explore')}
          </OnboardingSubTitleStyle>
          <OnboardingTextStyle>
            {i18n.t('modal.exploreText')}
          </OnboardingTextStyle>
        </OnboardingBlockStyle>
      </OnboardingBlocksContainerStyle>
    </OnboardingContentContainerStyle>
  );
};
