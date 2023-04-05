import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints, DefaultPadding } from '@make.org/assets/vars/Breakpoints';
import { shadows } from '@make.org/designsystem/tokens/shadows';
import { BodyXSHighlight } from '@make.org/designsystem/components/Body';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { ParagraphStyle } from './ParagraphElements';

export const SvgLikeStyle = {
  width: '72px',
  height: '72px',
  margin: `${spacings.sm} 0 ${spacings.xs}`,
  fill: `${colors.Content.Make.Secondary}`,
};

export const LightBulbStyle = {
  width: '72px',
  height: '72px',
  margin: `${spacings.sm} 0 ${spacings.xs}`,
  fill: 'rgb(255, 212, 0)',
};

export const ThumbsUpStyle = {
  fontSize: '72px',
  width: '72px',
  height: '72px',
  margin: `${spacings.sm} 0 ${spacings.xs}`,
};

export const ThumbsUpWrapperStyle = styled.span`
  .tofill {
    fill: ${colors.Content.Alert.Positive};
  }
`;

export const PlaceholderParagraphStyle = styled(ParagraphStyle)`
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
  margin: ${intToPx(DefaultPadding.Mobile)} 0 0;
  padding: 0 ${spacings.s};
  text-align: center;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 0;
  }
`;

export const FavouritesCardStyle = styled.aside`
  width: 100%;
  padding: ${spacings.m};
  background-color: ${colors.Background.Interface.Lighter};
  box-shadow: ${shadows.s10};
  margin-top: ${spacings.l};
`;

export const FavouritesProposalStyle = styled(BodyXSHighlight)`
  text-align: center;
  margin-top: ${spacings.s};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Paris};
  }
`;
