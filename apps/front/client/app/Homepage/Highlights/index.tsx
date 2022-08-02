/* eslint-disable react/jsx-no-useless-fragment */
import React, { FC } from 'react';
import i18n from 'i18next';
import { HomeHighlightsType } from '@make.org/types';
import { formatMillionToText } from '@make.org/utils/helpers/numberFormatter';
import { useAppContext } from '@make.org/store';
import {
  HomepageSectionStyle,
  HomepageSectionTitleStyle,
} from '../../../pages/Home/style';
import {
  HighlightsBannerFiguresContainerStyle,
  HighlightFigureContainerStyle,
  FiguresStyle,
  SubtitleFiguresStyle,
  FigureSeparationLineStyle,
  PeopleIconStyle,
  LigthIconStyle,
  HeartIconStyle,
} from './style';

type Props = {
  highlights: HomeHighlightsType;
};
export const HighlightsBanner: FC<Props> = ({ highlights }) => {
  const { state } = useAppContext();
  const { language } = state.appConfig;
  const { participantsCount, proposalsCount, partnersCount } = highlights;
  return (
    <HomepageSectionStyle
      as="section"
      aria-labelledby="highlights_title"
      id="highlights"
    >
      <HomepageSectionTitleStyle
        id="highlights_title"
        data-cy-container="highlights_title"
        className="with-container"
      >
        {i18n.t('homepage.highlights.title')}
      </HomepageSectionTitleStyle>
      <HighlightsBannerFiguresContainerStyle as="ul">
        <HighlightFigureContainerStyle as="li">
          <PeopleIconStyle aria-hidden focusable="false" />
          <> </>
          <FiguresStyle>
            {formatMillionToText(participantsCount, language)}
          </FiguresStyle>
          <> </>
          <SubtitleFiguresStyle>
            {i18n.t('homepage.highlights.participants.subtitle')}
          </SubtitleFiguresStyle>
          <FigureSeparationLineStyle />
        </HighlightFigureContainerStyle>
        <HighlightFigureContainerStyle as="li">
          <LigthIconStyle aria-hidden focusable="false" />
          <> </>
          <FiguresStyle>
            {formatMillionToText(proposalsCount, language)}
          </FiguresStyle>
          <> </>
          <SubtitleFiguresStyle>
            {i18n.t('homepage.highlights.proposals.subtitle')}
          </SubtitleFiguresStyle>
          <FigureSeparationLineStyle />
        </HighlightFigureContainerStyle>
        <HighlightFigureContainerStyle as="li">
          <HeartIconStyle aria-hidden focusable="false" />
          <> </>
          <FiguresStyle>
            {formatMillionToText(partnersCount, language)}
          </FiguresStyle>
          <> </>
          <SubtitleFiguresStyle>
            {i18n.t('homepage.highlights.partners.subtitle')}
          </SubtitleFiguresStyle>
          <FigureSeparationLineStyle />
        </HighlightFigureContainerStyle>
      </HighlightsBannerFiguresContainerStyle>
    </HomepageSectionStyle>
  );
};
