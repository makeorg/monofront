import React, { FC } from 'react';
import i18n from 'i18next';
import {
  trackClickHomepageParticipate,
  trackClickHomepageDiscover,
} from '@make.org/utils/services/Tracking';
import { useAppContext } from '@make.org/store';
import { matchDesktopDevice } from '@make.org/utils/helpers/styled';
import { HeroPictures } from './Pictures';
import {
  ColumnToRowToColumnStyle,
  HeroTitleStyle,
  HeroDescriptionStyle,
  HeroRedButtonStyle,
  HeroTransparentButtonStyle,
  WhiteArrowDownIcon,
  BlackArrowDownIcon,
  HeroContentStyle,
  HeroInnerContentStyle,
  HeroWrapperStyle,
} from './style';

export const Hero: FC = () => {
  const { state } = useAppContext();
  const { country, device } = state.appConfig;
  const { homepage } = state.views;
  const isDesktop = matchDesktopDevice(device);
  const isFr = country === 'FR';
  const hasActiveConsultations =
    homepage && homepage.currentQuestions.length > 0;

  const { featuredQuestions, posts } = homepage || {
    featuredQuestions: [],
    posts: [],
  };

  const hasFeaturedQuestions = featuredQuestions?.length > 0;
  const hasPosts = posts?.length > 0;

  return (
    <HeroWrapperStyle as="section" aria-labelledby="hero-title">
      <HeroContentStyle>
        <HeroInnerContentStyle>
          <HeroTitleStyle id="hero-title" data-cy-container="hero-title">
            {i18n.t('homepage.hero.title')}
          </HeroTitleStyle>
          {!isDesktop && <HeroPictures />}
          <HeroDescriptionStyle>
            {i18n.t('homepage.hero.description')}
          </HeroDescriptionStyle>
          <ColumnToRowToColumnStyle>
            {hasActiveConsultations && (
              <HeroRedButtonStyle
                as="a"
                href="#current_questions"
                onClick={() => trackClickHomepageParticipate()}
                data-cy-link="participate-consultations"
              >
                {i18n.t('homepage.hero.participate')}
                <WhiteArrowDownIcon aria-hidden focusable="false" />
              </HeroRedButtonStyle>
            )}
            {isFr && hasFeaturedQuestions && hasPosts && (
              <HeroTransparentButtonStyle
                as="a"
                href="#featured_questions"
                onClick={() => trackClickHomepageDiscover()}
                data-cy-link="discover-great-causes"
              >
                {i18n.t('homepage.hero.discover')}
                <BlackArrowDownIcon aria-hidden focusable="false" />
              </HeroTransparentButtonStyle>
            )}
          </ColumnToRowToColumnStyle>
        </HeroInnerContentStyle>
        {isDesktop && <HeroPictures />}
      </HeroContentStyle>
    </HeroWrapperStyle>
  );
};
