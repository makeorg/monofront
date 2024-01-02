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

export const OnboardingContent: FC = () => (
  <OnboardingContentContainerStyle>
    <OnboardingTitleStyle>
      Bienvenue au coeur de la Convention Citoyenne sur la fin de vie
    </OnboardingTitleStyle>
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
        <OnboardingTextStyle>{i18n.t('modal.exploreText')}</OnboardingTextStyle>
      </OnboardingBlockStyle>
      <OnboardingBlockStyle>
        <OnboardingImgStyle src={video} alt="Logo" />
        <OnboardingSubTitleStyle>
          {i18n.t('modal.sources')}
        </OnboardingSubTitleStyle>
        <OnboardingTextStyle>{i18n.t('modal.sourcesText')}</OnboardingTextStyle>
      </OnboardingBlockStyle>
    </OnboardingBlocksContainerStyle>
  </OnboardingContentContainerStyle>
);
