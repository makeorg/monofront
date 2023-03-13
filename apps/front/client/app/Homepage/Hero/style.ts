import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { typography } from '@make.org/designsystem/tokens/typography';
import { colors } from '@make.org/designsystem/tokens/colors';
import { pxToRem, intToPx } from '@make.org/utils/helpers/styled';
import {
  FlexElementStyle,
  ColumnToRowElementStyle,
  ColumnElementStyle,
} from '@make.org/ui/elements/FlexElements';
import { SvgBlackArrowDown } from '@make.org/ui/Svg/elements/BlackArrowDown';
import { SvgWhiteArrowDown } from '@make.org/ui/Svg/elements/WhiteArrowDown';
import { Breakpoints, Layouts } from '@make.org/assets/vars/Breakpoints';
import {
  LinkAsRedButtonStyle,
  BasicButtonStyle,
} from '@make.org/ui/elements/ButtonsElements';
import { Image } from '@make.org/ui/components/Image';
import { ContainerWithPadding } from '@make.org/ui/elements/MainElements';
import { TitleXL } from '@make.org/designsystem/components/Titles';
import { BodyMDefault } from '@make.org/designsystem/components/Body';

export const HeroWrapperStyle = styled(FlexElementStyle)`
  background-color: ${colors.Background.Interface.DarkSecondary};
`;

export const HeroContentStyle = styled(FlexElementStyle)`
  width: 100%;
  flex-flow: column;
  max-width: ${intToPx(Layouts.ContainerWidth)};
  ${ContainerWithPadding}
  padding-top: 30px;
  padding-bottom: 50px;
  @media (min-width: ${pxToRem(Breakpoints.Desktop)}) {
    flex-flow: row;
    padding-top: 50px;
    align-items: center;
  }
`;

export const HeroInnerContentStyle = styled(ColumnElementStyle)`
  flex: 1;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding-right: 30px;
  }
`;

export const ColumnToRowToColumnStyle = styled(ColumnToRowElementStyle)`
  @media (min-width: ${pxToRem(Breakpoints.Desktop)}) {
    flex-flow: column;
  }
`;

export const HeroTitleStyle = styled(TitleXL)`
  color: ${colors.Content.Interface.Dark};
  margin-bottom: 30px;
  text-transform: none;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    max-width: 520px;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${typography.FontSize.Earth};
  }
`;

export const HeroDescriptionStyle = styled(BodyMDefault)`
  display: flex;
  color: ${colors.Content.Interface.DarkSecondary};
  margin-bottom: 40px;
  margin-top: 30px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: 57px;
  }
`;

export const HeroRedButtonStyle = styled(LinkAsRedButtonStyle)`
  display: inline-flex;
  align-self: flex-start;
  margin-bottom: 15px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-right: 24px;
    margin-bottom: 0;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: 15px;
  }
`;

export const HeroTransparentButtonStyle = styled(Link)`
  display: inline-flex;
  align-self: flex-start;
  ${BasicButtonStyle};
  border: solid 1px ${colors.Border.Interface.Darker};
  background-color: transparent;
  &:hover,
  &:focus {
    color: ${colors.Content.Interface.Dark};
    text-decoration: none;
  }
`;

export const WhiteArrowDownIcon = styled(SvgWhiteArrowDown)`
  margin-left: 22px;
`;

export const BlackArrowDownIcon = styled(SvgBlackArrowDown)`
  margin-left: 10px;
`;

export const HeroPicturesStyle = styled(Image)`
  flex: 1;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    object-fit: contain;
    max-width: 50%;
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    padding-left: 30px;
  }
`;
