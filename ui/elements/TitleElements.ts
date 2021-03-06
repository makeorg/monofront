import styled from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { typography } from 'athena-design-tokens';

export const ThirdLevelTitleCircularStyle = styled.h3`
  font-size: ${intToPx(typography.font.fontsize.L.value)};
  font-family: ${MakeFonts.CircularStandardBold};
  text-transform: none;
`;

export const SecondLevelTitleStyle = styled.h2`
  font-size: ${intToPx(typography.font.fontsize.M.value)};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XL.value)};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.X2L.value)};
  }
`;

export const ThirdLevelTitleStyle = styled.h3`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.S.value)};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.M.value)};
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    font-size: ${intToPx(typography.font.fontsize.L.value)};
  }
`;

export const FourthLevelTitleStyle = styled.h4`
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  &.not-great-cause-proposal {
    margin: 0 0 15px;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    font-size: ${intToPx(typography.font.fontsize.S.value)};
  }
`;
