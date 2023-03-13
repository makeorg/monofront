import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Layouts, Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { FlexElementStyle } from '@make.org/ui/elements/FlexElements';
import { Link } from 'react-router-dom';
import { SvgExternalLink } from '@make.org/ui/Svg/elements';
import {
  BodyMCondensed,
  BodyMHighLight,
} from '@make.org/designsystem/components/Body';
import { TitleL } from '@make.org/designsystem/components/Titles';
import { colors } from '@make.org/designsystem/tokens/colors';

export const HeaderWrapperStyle = styled(FlexElementStyle)`
  background-color: ${props => props.theme.color};
`;

export const HeaderContentStyle = styled(FlexElementStyle)`
  width: 100%;
  color: ${props => props.theme.fontColor};
  max-width: ${intToPx(Layouts.ContainerWidth)};
  margin: auto;
  justify-content: flex-start;
  flex-flow: column;
  padding: 30px 20px 40px;
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const HeaderWrapperLabelStyle = styled(FlexElementStyle)`
  flex-direction: row;
`;

export const HeaderLabelStyle = styled(BodyMCondensed).attrs({ as: 'span' })`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  padding: 10px 10px 8px;
  height: 25px;
  width: max-content;
  margin: 5px 0 15px;
  color: ${colors.Content.Interface.Light};
  background-color: ${colors.Background.Interface.DarkMain};
  &.white-text {
    color: ${colors.Content.Interface.Light};
    background-color: ${colors.Background.Interface.DarkMain};
  }
  &.black-text {
    color: ${colors.Content.Interface.Dark};
    background-color: ${colors.Background.Interface.Lighter};
  }
  &.margin-left {
    margin-left: 10px;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 15px 0;
  }
`;

export const HeaderTitleStyle = styled(TitleL)`
  text-transform: none;
  color: ${props =>
    props.theme.fontColor
      ? props.theme.fontColor
      : colors.Content.Interface.Dark};
  margin-bottom: 30px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    line-height: 1.5;
    letter-spacing: 0.5px;
    font-size: ${typography.FontSize.Earth};
    margin-bottom: 20px;
  }
`;

export const HeaderListWrapperStyle = styled.div`
  display: inline;
  margin-bottom: 20px;
  &.no-margin {
    margin-bottom: 0;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-bottom: 15px;
    &.no-margin {
      margin-bottom: 0;
    }
  }
`;

export const HeaderListLabelStyle = styled(BodyMHighLight).attrs({
  as: 'span',
})`
  color: ${props =>
    props.theme.fontColor
      ? props.theme.fontColor
      : colors.Content.Interface.Dark};
  font-size: ${typography.FontSize.Arrondissement};
`;

export const HeaderListStyle = styled.ul`
  display: inline;
  padding-left: 0;
  list-style: none;
`;

export const HeaderListItemStyle = styled.li`
  display: inline;
`;

export const PartnerStyle = styled.span`
  color: ${props =>
    props.theme.fontColor
      ? props.theme.fontColor
      : colors.Content.Interface.Dark};
  letter-spacing: 0.14px;
  font-size: ${typography.FontSize.Arrondissement};
`;

export const PartnerLinkStyle = styled(Link)`
  color: ${props =>
    props.theme.fontColor
      ? props.theme.fontColor
      : colors.Content.Interface.Dark};
  letter-spacing: 0.14px;
  font-size: ${typography.FontSize.Arrondissement};
  &:hover {
    color: ${props =>
      props.theme.fontColor
        ? props.theme.fontColor
        : colors.Content.Interface.Dark};
  }
`;

export const NewWindowLinkStyle = styled.a`
  display: inline-flex;
  align-items: center;
  font-weight: bold;
  color: ${props =>
    props.theme.fontColor
      ? props.theme.fontColor
      : colors.Content.Interface.Dark};
  &:hover,
  &:focus {
    color: ${props =>
      props.theme.fontColor
        ? props.theme.fontColor
        : colors.Content.Interface.Dark};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-weight: normal;
  }
`;

export const NewWindowIconStyle = styled(SvgExternalLink)`
  margin-left: 5px;
  width: 14px;
  height: 14px;
  fill: ${props =>
    props.theme.fontColor
      ? props.theme.fontColor
      : colors.Content.Make.Secondary};
`;
