import React, { FC } from 'react';
import i18n from 'i18next';
import video from '../../assets/Frame 293.png';
import { ButtonsSuggestion } from '../Prompt/Suggestions';
import {
  OnboardingTitleStyle,
  OnboardingSubTitleStyle,
  OnboardingTextStyle,
  OnboardingContentContainerStyle,
  OnboardingBlocksContainerStyle,
  OnboardingBlockStyle,
  OnboardingImgContainerStyle,
  OnboardingImgStyle,
  ThemeSvgStyle,
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
            <ButtonsSuggestion
              title={i18n.t('modal.proposal')}
              value={i18n.t('modal.proposal')}
            />
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
            <ThemeSvgStyle aria-hidden focusable="false" />
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
