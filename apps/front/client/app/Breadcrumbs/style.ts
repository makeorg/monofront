import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { Link } from 'react-router-dom';
import { intToPx } from '@make.org/utils/helpers/styled';
import {
  SvgAngleArrowRight,
  SvgHouse,
  SvgBigArrowRight,
} from '@make.org/ui/Svg/elements';
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
  font-family: ${typography.FontFamily.Default};
  color: ${props =>
    props.theme.fontColor
      ? props.theme.fontColor
      : colors.Content.Interface.Dark};
  text-decoration: underline;
  font-size: ${typography.FontSize.RueDeLappe};
  &:hover,
  &:focus {
    color: ${props =>
      props.theme.fontColor
        ? props.theme.fontColor
        : colors.Content.Interface.Dark};
  }
`;

export const HomeIconStyle = styled(SvgHouse)`
  margin-right: ${spacings.s};
  .tofill {
    fill: ${props =>
      props.theme.fontColor
        ? props.theme.fontColor
        : colors.Content.Interface.Dark};
  }
`;

export const ArrowIconStyle = styled(SvgBigArrowRight)`
  margin: 0 ${spacings.s};
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
  margin: ${spacings.l} 0 ${spacings.m};
  padding: 0 ${spacings.m};
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
  font-family: ${typography.FontFamily.Condensed};
  color: ${colors.Content.Make.Secondary};
  text-decoration: none;
  text-transform: uppercase;
  font-size: ${typography.FontSize.Arrondissement};
  border-bottom: 2px solid ${colors.Content.Make.Secondary};
  &:hover,
  &:focus {
    color: ${colors.Content.Make.Secondary};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Paris};
  }
`;

export const SeparatorIconStyleDeprecated = styled(SvgAngleArrowRight)`
  width: 16px;
  height: 16px;
  margin: 1px ${spacings.xs} 0;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: 18px;
    height: 18px;
    margin-top: 2px;
  }
`;
