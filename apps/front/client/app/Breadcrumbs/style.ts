import styled from 'styled-components';
import { typography } from 'athena-design-tokens';
import { colors } from '@make.org/designsystem/tokens/colors';
import { Link } from 'react-router-dom';
import { intToPx } from '@make.org/utils/helpers/styled';
import {
  SvgAngleArrowRight,
  SvgHouse,
  SvgBigArrowRight,
} from '@make.org/ui/Svg/elements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';

// BREADCRUMBS STYLES //

export const BreadcrumbsWrapperStyle = styled.ol`
  padding: 0;
  list-style: none;
  margin: 0 0 24px;
  display: flex;
  flex-flow: wrap;
`;

export const BreadcrumbsListStyle = styled.li`
  display: inline-flex;
  align-items: center;
  &.selected > a {
    text-decoration: none;
    cursor: default;
  }
`;

export const BreadcrumbsLinkStyle = styled(Link)`
  font-family: ${MakeFonts.CircularStandardBook};
  color: ${props =>
    props.theme.fontColor
      ? props.theme.fontColor
      : colors.Content.Interface.Dark};
  text-decoration: underline;
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  &:hover,
  &:focus {
    color: ${props =>
      props.theme.fontColor
        ? props.theme.fontColor
        : colors.Content.Interface.Dark};
  }
`;

export const HomeIconStyle = styled(SvgHouse)`
  margin-right: 10px;
  .tofill {
    fill: ${props =>
      props.theme.fontColor
        ? props.theme.fontColor
        : colors.Content.Interface.Dark};
  }
`;

export const ArrowIconStyle = styled(SvgBigArrowRight)`
  margin: 0 10px;
  .tofill {
    fill: ${props =>
      props.theme.fontColor
        ? props.theme.fontColor
        : colors.Content.Interface.Dark};
  }
`;

// DEPRECATED BREADCRUMBS STYLES //

export const BreadcrumbsListStyleDeprecated = styled.ol`
  padding: 0;
  list-style: none;
  margin: 30px 0 20px;
  padding: 0 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 0;
    margin: 0 0 40px;
  }
`;

export const BreadcrumbsListItemStyleDeprecated = styled.li`
  display: inline-flex;
  &.selected > a {
    color: ${colors.Content.Interface.Dark};
    border-bottom: none;
    cursor: default;
  }
`;

export const BreadcrumbsLinkStyleDeprecated = styled(Link)`
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
  color: ${colors.Content.Make.Secondary};
  text-decoration: none;
  text-transform: uppercase;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  border-bottom: 2px solid ${colors.Content.Make.Secondary};
  &:hover,
  &:focus {
    color: ${colors.Content.Make.Secondary};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.S.value)};
  }
`;

export const SeparatorIconStyleDeprecated = styled(SvgAngleArrowRight)`
  width: 16px;
  height: 16px;
  margin: 1px 5px 0;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: 18px;
    height: 18px;
    margin-top: 2px;
  }
`;
