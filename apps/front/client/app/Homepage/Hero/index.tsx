import React, { FC } from 'react';
import i18n from 'i18next';
import { Image } from '@make.org/ui/components/Image';
import { SvgOffice } from '@make.org/ui/Svg/elements/Office';
import { SvgBank } from '@make.org/ui/Svg/elements/Bank';
import { SvgBrain } from '@make.org/ui/Svg/elements/Brain';
import { FlexElementStyle } from '@make.org/ui/elements/FlexElements';
import { IDS } from '@make.org/types/enums';
import {
  scrollToElementClass,
  scrollToElementId,
} from '@make.org/utils/helpers/styled';
import {
  ButtonAnchorStyle,
  LinkAnchorStyle,
} from '@make.org/ui/elements/ButtonsElements';
import {
  HeroTitleStyle,
  HeroDescriptionStyle,
  HeroContentStyle,
  HeroInnerContentStyle,
  HeroIncentiveStyle,
  HeroListStyle,
} from './style';

export const Hero: FC = () => (
  <FlexElementStyle as="section" aria-labelledby="hero-title">
    <HeroContentStyle>
      <HeroInnerContentStyle>
        <HeroTitleStyle id="hero-title" data-cy-container="hero-title">
          {i18n.t('homepage.hero.title')}
        </HeroTitleStyle>
        <HeroDescriptionStyle>
          {i18n.t('homepage.hero.description')}
        </HeroDescriptionStyle>
        <HeroIncentiveStyle as="div">
          {i18n.t('homepage.hero.incentive')}
          <HeroListStyle>
            <li>
              <ButtonAnchorStyle
                type="button"
                onClick={() => scrollToElementId(IDS.PUBLIC)}
              >
                <SvgBank aria-hidden focusable="false" />
                {i18n.t('homepage.hero.btog')}
              </ButtonAnchorStyle>
            </li>
            <li>
              <ButtonAnchorStyle
                type="button"
                onClick={() => scrollToElementId(IDS.BUSINESS)}
              >
                <SvgOffice aria-hidden focusable="false" />
                {i18n.t('homepage.hero.btob')}
              </ButtonAnchorStyle>
            </li>
            <li>
              <ButtonAnchorStyle
                type="button"
                onClick={() => scrollToElementId(IDS.RESEARCH)}
              >
                <SvgBrain aria-hidden focusable="false" />
                {i18n.t('homepage.hero.research')}
              </ButtonAnchorStyle>
            </li>
            <li>
              <LinkAnchorStyle
                type="button"
                onClick={() => scrollToElementClass(IDS.CITIZEN)}
              >
                {i18n.t('homepage.hero.btoc')}
              </LinkAnchorStyle>
              →
            </li>
          </HeroListStyle>
        </HeroIncentiveStyle>
      </HeroInnerContentStyle>
      <Image
        width={520}
        height={440}
        src="https://assets.make.org/assets/home/hero_20012025.png"
        alt=""
      />
    </HeroContentStyle>
  </FlexElementStyle>
);
