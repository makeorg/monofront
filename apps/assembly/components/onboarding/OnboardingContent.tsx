import React, { FC } from 'react';
import i18n from 'i18next';
import ReactModal from 'react-modal';
import resume from '../../assets/PromptSuggerex2.png';
import theme from '../../assets/PP_Thematiquex2.png';
import video from '../../assets/Sourcesx2.png';
import {
  OnboardingTitle,
  OnboardingSubTitle,
  OnboardingText,
  OnboardingContentContainer,
  OnboardingBlocksContainer,
  OnboardingBlock,
  OnboardingImg,
} from './style';

ReactModal.setAppElement('#app');

export const OnboardingContent: FC = () => (
  <OnboardingContentContainer>
    <OnboardingTitle>
      Bienvenue au coeur de la Convention Citoyenne sur la fin de vie
    </OnboardingTitle>
    <OnboardingBlocksContainer>
      <OnboardingBlock>
        <OnboardingImg src={resume} alt="Logo" />
        <OnboardingSubTitle>{i18n.t('modal.suggestion')}</OnboardingSubTitle>
        <OnboardingText>{i18n.t('modal.suggestionText')}</OnboardingText>
      </OnboardingBlock>
      <OnboardingBlock>
        <OnboardingImg src={theme} alt="Logo" />
        <OnboardingSubTitle>{i18n.t('modal.explore')}</OnboardingSubTitle>
        <OnboardingText>{i18n.t('modal.exploreText')}</OnboardingText>
      </OnboardingBlock>
      <OnboardingBlock>
        <OnboardingImg src={video} alt="Logo" />
        <OnboardingSubTitle>{i18n.t('modal.sources')}</OnboardingSubTitle>
        <OnboardingText>{i18n.t('modal.sourcesText')}</OnboardingText>
      </OnboardingBlock>
    </OnboardingBlocksContainer>
  </OnboardingContentContainer>
);
