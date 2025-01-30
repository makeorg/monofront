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
import { LinkAnchorStyle } from '@make.org/ui/elements/ButtonsElements';
import { PrimaryButton, PRIMARYTYPE } from '@make.org/components/Buttons';
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
              <PrimaryButton
                type={PRIMARYTYPE.BUTTON}
                onClick={() => scrollToElementId(IDS.PUBLIC)}
              >
                <SvgBank aria-hidden focusable="false" />
                {i18n.t('homepage.hero.btog')}
              </PrimaryButton>
            </li>
            <li>
              <PrimaryButton
                type={PRIMARYTYPE.BUTTON}
                onClick={() => scrollToElementId(IDS.BUSINESS)}
              >
                <SvgOffice aria-hidden focusable="false" />
                {i18n.t('homepage.hero.btob')}
              </PrimaryButton>
            </li>
            <li>
              <PrimaryButton
                type={PRIMARYTYPE.BUTTON}
                onClick={() => scrollToElementId(IDS.RESEARCH)}
              >
                <SvgBrain aria-hidden focusable="false" />
                {i18n.t('homepage.hero.research')}
              </PrimaryButton>
            </li>
            <li>
              <LinkAnchorStyle
                type="button"
                className="js-click-animation"
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
        src="https://assets.make.org/assets/home/hero_29012025.png"
        alt=""
      />
    </HeroContentStyle>
  </FlexElementStyle>
);
