import styled from 'styled-components';
import { typography } from 'athena-design-tokens';
import {
  SvgClock,
  SvgPeople,
  SvgLightBulb,
  SvgFist,
  SvgThumbsUp,
} from '@make.org/ui/Svg/elements';
import {
  intToPx,
  getFullWidthDividedByItems,
} from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import {
  ColumnElementStyle,
  MiddleColumnStyle,
} from '@make.org/ui/elements/FlexElements';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { Image } from '@make.org/ui/components/Image';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { ContainerWithPadding } from '@make.org/ui/elements/MainElements';
import { TitleXL, TitleXXS } from '@make.org/designsystem/components/Titles';
import {
  BodyMDefault,
  BodyMCondensed,
} from '@make.org/designsystem/components/Body';
import { colors } from '@make.org/designsystem/tokens/colors';

export const BrowseHeaderStyle = styled.header`
  background-color: ${colors.Background.Interface.DarkSecondary};
`;

export const BrowseHeaderInnerStyle = styled.div`
  ${ContainerWithPadding};
  padding-top: 30px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding-top: 35px;
  }
`;

export const BrowseHeaderTitleStyle = styled(TitleXL)`
  margin-bottom: 24px;
  text-transform: none;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.X4L.value)};
    margin-bottom: 33px;
  }
`;

export const ConsultationsTitleWrapperStyle = styled(ColumnElementStyle)`
  background-color: ${colors.Background.Interface.Lighter};
  ${ContainerWithPadding};
  margin-top: 60px;
  margin-bottom: 40px;
`;

export const ConsultationsSubtitleStyle = styled(BodyMDefault)`
  width: 100%;
  color: ${colors.Content.Interface.DarkSecondary};
`;

const linkStyle = (linkColor: string) => `
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

export const ConsultationElementSubtitleStyle = styled(BodyMCondensed).attrs({
  as: 'span',
})`
  text-transform: uppercase;
  color: ${colors.Content.Interface.DarkSecondary};
  margin-bottom: 5px;
`;

export const ConsultationElementTitleStyle = styled(TitleXXS)`
  text-transform: none;
  color: ${colors.Content.Interface.Dark};
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
    fill: ${colors.Content.Make.Secondary};
  }
`;

export const ConsultationVoteIconStyle = styled(SvgThumbsUp)`
  min-width: 15px;
  min-height: 13px;
  margin-right: 20px;
  .tofill {
    fill: rgb(37, 49, 134);
  }
`;

export const ConsultationElementParagraphStyle = styled(BodyMDefault)`
  color: ${colors.Content.Interface.DarkSecondary};
  margin-bottom: 20px;
`;

export const ConsultationItemStyle = styled.span`
  display: block;
  margin-bottom: 5px;
  &.red {
    color: ${colors.Content.Make.Secondary};
  }
  &:last-child {
    margin: 20px 0 0;
  }
  &:only-child {
    margin: 0;
  }
`;

export const NoConsultationWrapperStyle = styled(ColumnElementStyle)`
  max-width: 540px;
  flex: 1;
  margin-bottom: 50px;
`;

export const NoConsultationImageStyle = styled(MiddleColumnStyle)`
  background-color: ${colors.Background.Interface.DarkSecondary};
  min-height: 174px;
  margin-bottom: 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    min-height: 248px;
    margin-bottom: 25px;
  }
`;

export const NoConsultationButtonStyle = styled(UnstyledButtonStyle)`
  align-self: flex-start;
  ${linkStyle(colors.Content.Make.Secondary)};
  text-transform: uppercase;
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
`;
