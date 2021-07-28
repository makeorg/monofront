import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import {
  SvgClock,
  SvgPeople,
  SvgLightBulb,
  SvgFist,
} from 'Client/ui/Svg/elements';
import { Link } from 'react-router-dom';
import { intToPx, getFullWidthDividedByItems } from 'Shared/helpers/styled';
import { Breakpoints } from 'Client/app/assets/vars/Breakpoints';
import { MakeFonts } from 'Client/app/assets/vars/Fonts';
import {
  ColumnElementStyle,
  MiddleColumnStyle,
} from 'Client/ui/Elements/FlexElements';
import { UnstyledListStyle } from 'Client/ui/Elements/ListElements';
import { Image } from 'Client/ui/Image';
import { UnstyledButtonStyle } from 'Client/ui/Elements/Buttons/style';
import { ContainerWithPadding } from 'Client/app/Styled/MainElements';

export const BrowseHeaderStyle = styled.header`
  background-color: ${color.greyLighter};
`;

export const BrowseHeaderInnerStyle = styled.div`
  ${ContainerWithPadding};
  padding-top: 30px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding-top: 35px;
  }
`;

export const BrowseHeaderTitleStyle = styled.h2`
  font-family: ${MakeFonts.CircularStandardBold};
  font-size: ${intToPx(typography.font.fontsize.X3L.value)};
  margin-bottom: 24px;
  text-transform: none;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.X4L.value)};
    margin-bottom: 33px;
  }
`;

export const BrowseNavItemStyle = styled.li`
  display: inline-flex;
  flex-wrap: wrap;
  max-width: 106px;
  margin-right: 45px;
  &:last-child {
    margin-right: 0;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    max-width: 228px;
    margin-right: 80px;
  }
`;

export const BrowseNavLinkStyle = styled(Link)`
  font-family: ${MakeFonts.CircularStandardBold};
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  text-decoration: none;
  padding-bottom: 8px;
  color: ${color.greyDark};
  border-bottom: 2px solid transparent;
  &:hover,
  &:focus {
    color: ${color.black};
  }
  &.selected,
  &.selected:hover,
  &.selected:focus {
    color: ${color.brandSecondary};
    border-bottom: 2px solid ${color.brandSecondary};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
    padding-bottom: 14px;
  }
`;

export const ConsultationsTitleWrapperStyle = styled(ColumnElementStyle)`
  background-color: ${color.white};
  ${ContainerWithPadding};
  margin-top: 60px;
  margin-bottom: 40px;
`;

export const ConsultationsSubtitleStyle = styled.p`
  font-family: ${MakeFonts.CircularStandardBook};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  width: 100%;
  color: ${color.greyDark};
`;

const linkStyle = linkColor => `
  color: ${linkColor};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  &:hover,
  &:focus {
    color: ${linkColor};
  }
`;

export const ConsultationsListStyle = styled(UnstyledListStyle)`
  display: flex;
  flex-flow: column;
  ${ContainerWithPadding};
  /* Override padding values handled by children in ConsultationsListItemStyle */
  padding: 0;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    flex-flow: wrap;
  }
`;

export const ConsultationsListItemStyle = styled.li`
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

export const ConsultationArticleStyle = styled.article`
  display: flex;
  flex-flow: column;
  flex: 1;
`;

export const ConsultationElementPictureStyle = styled(Image)`
  margin-bottom: 20px;
  object-fit: cover;
  max-height: 248px;
`;

export const ConsultationElementSubtitleStyle = styled.span`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  text-transform: uppercase;
  color: ${color.greyDark};
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
  margin-bottom: 5px;
`;

export const ConsultationElementTitleStyle = styled.h3`
  text-transform: none;
  font-size: ${intToPx(typography.font.fontsize.S.value)};
  color: ${color.black};
  font-family: ${MakeFonts.CircularStandardBold};
  margin-bottom: 20px;
`;

export const ClockIconStyle = styled(SvgClock)`
  min-width: 12px;
  min-height: 12px;
  margin-top: 2px;
  margin-right: 20px;
  .tofill {
    fill: rgb(37, 49, 134);
  }
`;

export const ConsultationPeopleIconStyle = styled(SvgPeople)`
  min-width: 16px;
  width: 16px;
  min-height: 14px;
  height: 14px;
  margin-right: 16px;
  .tofill {
    fill: rgb(37, 49, 134);
  }
`;

export const ConsultationLightIconStyle = styled(SvgLightBulb)`
  min-width: 12px;
  min-height: 12px;
  margin-right: 20px;
  .tofill {
    fill: rgb(37, 49, 134);
  }
`;

export const ConsultationActionIconStyle = styled(SvgFist)`
  min-width: 11px;
  min-height: 13px;
  margin-right: 21px;
  .tofill {
    fill: ${color.brandSecondary};
  }
`;

export const ConsultationElementParagraphStyle = styled.p`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  font-family: ${MakeFonts.CircularStandardBook};
  color: ${color.greyDark};
  margin-bottom: 20px;
`;

export const ConsultationItemStyle = styled.span`
  display: block;
  margin-bottom: 5px;
  &.red {
    color: ${color.brandSecondary};
  }
  &:last-child {
    margin: 20px 0 0;
  }
  &:only-child {
    margin: 0;
  }
`;

export const ConsultationRedLinkElementStyle = styled(Link)`
  ${linkStyle(color.brandSecondary)};
  text-transform: uppercase;
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
`;

export const NoConsultationWrapperStyle = styled(ColumnElementStyle)`
  max-width: 540px;
  flex: 1;
  margin-bottom: 50px;
`;

export const NoConsultationImageStyle = styled(MiddleColumnStyle)`
  background-color: ${color.greyLighter};
  min-height: 174px;
  margin-bottom: 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    min-height: 248px;
    margin-bottom: 25px;
  }
`;

export const NoConsultationButtonStyle = styled(UnstyledButtonStyle)`
  align-self: flex-start;
  ${linkStyle(color.brandSecondary)};
  text-transform: uppercase;
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
`;
