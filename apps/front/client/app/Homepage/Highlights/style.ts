import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import {
  SpaceBetweenRowStyle,
  ColumnElementStyle,
} from '@make.org/ui/elements/FlexElements';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import {
  intToPx,
  getFullWidthDividedByItems,
} from '@make.org/utils/helpers/styled';
import { SvgPeople, SvgLight, SvgHandHeart } from '@make.org/ui/Svg/elements';
import { ContainerWithPadding } from '@make.org/ui/elements/MainElements';

export const ConsultationsListItemStyle = styled.li<{ itemsPerRow: number }>`
  margin-bottom: 50px;
  padding-left: 20px;
  padding-right: 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: ${getFullWidthDividedByItems(2)};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    width: ${props => getFullWidthDividedByItems(props.itemsPerRow)};
  }
`;

export const HighlightsBannerFiguresContainerStyle = styled(
  SpaceBetweenRowStyle
)`
  ${ContainerWithPadding};
  padding: 0;
  flex-wrap: wrap;
`;

export const HighlightFigureContainerStyle = styled(ColumnElementStyle)`
  margin-bottom: 50px;
  padding-left: 20px;
  padding-right: 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: ${getFullWidthDividedByItems(2)};
  }
  &:last-child {
    margin-bottom: 0;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: 0;
    width: ${getFullWidthDividedByItems(3)};
  }
`;

const IconStyle = `
  margin-bottom: 20px;
  .tofill {
    fill: #253186
  }
`;

export const PeopleIconStyle = styled(SvgPeople)`
  ${IconStyle}
  height: 31px;
`;

export const LigthIconStyle = styled(SvgLight)`
  ${IconStyle}
`;

export const HeartIconStyle = styled(SvgHandHeart)`
  ${IconStyle}
`;

export const FiguresStyle = styled.span`
  font-family: ${MakeFonts.CircularStandardBold};
  font-size: ${intToPx(typography.font.fontsize.L.value)};
  color: ${color.black};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.XL.value)};
  }
`;

export const SubtitleFiguresStyle = styled.span`
  font-family: ${MakeFonts.CircularStandardBook};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  color: ${color.greyDark};
  padding-bottom: 30px;
`;

export const FigureSeparationLineStyle = styled.hr`
  margin: 0px;
  width: 50px;
  height: 4px;
  border: solid 0.5px ${color.greyDark};
  background-color: ${color.greyDark};
`;
