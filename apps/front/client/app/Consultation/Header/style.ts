import styled from 'styled-components';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { color, typography } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Layouts, Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { FlexElementStyle } from '@make.org/ui/elements/FlexElements';
import { Link } from 'react-router-dom';
import { SvgExternalLink } from '@make.org/ui/Svg/elements';

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

export const HeaderLabelStyle = styled.span`
  display: flex;
  align-items: center;
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  text-transform: uppercase;
  padding: 10px 10px 8px;
  height: 25px;
  width: max-content;
  margin: 5px 0 15px;
  color: ${color.white};
  background-color: ${color.black};
  &.white-text {
    color: ${color.white};
    background-color: ${color.black};
  }
  &.black-text {
    color: ${color.black};
    background-color: ${color.white};
  }
  &.margin-left {
    margin-left: 10px;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 15px 0;
  }
`;

export const HeaderTitleStyle = styled.h2`
  font-family: ${MakeFonts.CircularStandardBold};
  font-size: ${intToPx(typography.font.fontsize.X2L.value)};
  text-transform: none;
  color: ${props =>
    props.theme.fontColor ? props.theme.fontColor : color.black};
  margin-bottom: 30px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    line-height: 1.5;
    letter-spacing: 0.5px;
    font-size: ${intToPx(typography.font.fontsize.X4L.value)};
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

export const HeaderListLabelStyle = styled.span`
  font-family: ${MakeFonts.CircularStandardBold};
  color: ${props =>
    props.theme.fontColor ? props.theme.fontColor : color.black};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
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
    props.theme.fontColor ? props.theme.fontColor : color.black};
  letter-spacing: 0.14px;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
`;

export const PartnerLinkStyle = styled(Link)`
  color: ${props =>
    props.theme.fontColor ? props.theme.fontColor : color.black};
  letter-spacing: 0.14px;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  &:hover {
    color: ${props =>
      props.theme.fontColor ? props.theme.fontColor : color.black};
  }
`;

export const NewWindowLinkStyle = styled.a`
  display: inline-flex;
  align-items: center;
  font-weight: bold;
  color: ${props =>
    props.theme.fontColor ? props.theme.fontColor : color.black};
  &:hover,
  &:focus {
    color: ${props =>
      props.theme.fontColor ? props.theme.fontColor : color.black};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-weight: normal;
  }
`;

export const NewWindowIconStyle = styled(SvgExternalLink)`
  margin-left: 5px;
  width: 12px;
  height: 12px;
  fill: ${props =>
    props.theme.fontColor ? props.theme.fontColor : color.brandSecondary};
`;
