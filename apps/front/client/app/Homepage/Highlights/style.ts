import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { colors } from '@make.org/designsystem/tokens/colors';
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
import { TitleS } from '@make.org/designsystem/components/Titles';
import { BodyMDefault } from '@make.org/designsystem/components/Body';

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

export const FiguresStyle = styled(TitleS).attrs({ as: 'span' })`
  color: ${colors.Content.Interface.Dark};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${typography.FontSize.IleDeFrance};
  }
`;

export const SubtitleFiguresStyle = styled(BodyMDefault).attrs({ as: 'span' })`
  color: ${colors.Content.Interface.DarkSecondary};
  padding-bottom: 30px;
`;

export const FigureSeparationLineStyle = styled.hr`
  margin: 0px;
  width: 50px;
  height: 4px;
  border: solid 0.5px ${colors.Content.Interface.DarkSecondary};
  background-color: ${colors.Content.Interface.DarkSecondary};
`;
