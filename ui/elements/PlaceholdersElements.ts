import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints, DefaultPadding } from '@make.org/assets/vars/Breakpoints';
import { ShadowColors } from '@make.org/assets/vars/Colors';
import { ParagraphStyle } from './ParagraphElements';

export const SvgLikeStyle = {
  width: '72px',
  height: '72px',
  margin: '15px 0 5px',
  fill: `${color.brandSecondary}`,
};

export const LightBulbStyle = {
  width: '72px',
  height: '72px',
  margin: '15px 0 5px',
  fill: 'rgb(255, 212, 0)',
};

export const ThumbsUpStyle = {
  fontSize: '72px',
  width: '72px',
  height: '72px',
  margin: '15px 0 5px',
};

export const ThumbsUpWrapperStyle = styled.span`
  .tofill {
    fill: ${color.agree};
  }
`;

export const PlaceholderParagraphStyle = styled(ParagraphStyle)`
  font-family: ${MakeFonts.CircularStandardBold};
  margin: ${intToPx(DefaultPadding.Mobile)} 0 0;
  padding: 0 10px;
  text-align: center;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 0;
  }
`;

export const FavouritesCardStyle = styled.aside`
  width: 100%;
  padding: 20px;
  background-color: ${color.white};
  box-shadow: 0 1px 1px 0 ${ShadowColors.BlackZeroFiveOpacity};
  margin-top: 30px;
`;

export const FavouritesProposalStyle = styled.p`
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  line-height: normal;
  font-family: ${MakeFonts.CircularStandardBold};
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.S.value)};
  }
`;
