import React, { FC } from 'react';
import i18n from 'i18next';
import resume from '../../assets/PromptSuggerex2.png';
import theme from '../../assets/PP_Thematiquex2.png';
import video from '../../assets/Sourcesx2.png';
import {
  OnboardingTitleStyle,
  OnboardingSubTitleStyle,
  OnboardingTextStyle,
  OnboardingContentContainerStyle,
  OnboardingBlocksContainerStyle,
  OnboardingBlockStyle,
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
          <OnboardingImgStyle src={resume} alt="Logo" />
          <OnboardingSubTitleStyle>
            {i18n.t('modal.suggestion')}
          </OnboardingSubTitleStyle>
          <OnboardingTextStyle>
            {i18n.t('modal.suggestionText')}
          </OnboardingTextStyle>
        </OnboardingBlockStyle>
        <OnboardingBlockStyle>
          <OnboardingImgStyle src={theme} alt="Logo" />
          <OnboardingSubTitleStyle>
            {i18n.t('modal.explore')}
          </OnboardingSubTitleStyle>
          <OnboardingTextStyle>
            {i18n.t('modal.exploreText')}
          </OnboardingTextStyle>
        </OnboardingBlockStyle>
        <OnboardingBlockStyle>
          <OnboardingImgStyle src={video} alt="Logo" />
          <OnboardingSubTitleStyle>
            {i18n.t('modal.sources')}
          </OnboardingSubTitleStyle>
          <OnboardingTextStyle>
            {i18n.t('modal.sourcesText')}
          </OnboardingTextStyle>
        </OnboardingBlockStyle>
      </OnboardingBlocksContainerStyle>
    </OnboardingContentContainerStyle>
  );
};
