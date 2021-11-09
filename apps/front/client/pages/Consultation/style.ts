import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { Link } from 'react-router-dom';
import { intToPx, pxToPercent } from '@make.org/utils/helpers/styled';
import {
  ColumnElementStyle,
  SpaceBetweenRowStyle,
} from '@make.org/ui/elements/FlexElements';
// import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { Breakpoints, Layouts } from '@make.org/assets/vars/Breakpoints';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import {
  SvgArrowGroupUpDown,
  SvgChat,
  SvgFiltersMobileIcon,
} from '@make.org/ui/Svg/elements';
import { ContainerWithPadding } from '@make.org/ui/elements/MainElements';

export const ConsultationHeaderWrapperStyle = styled.div<{
  backgroundcolor: string;
}>`
  background-color: ${props => props.backgroundcolor};
  margin-top: -5px;
`;

export const ConsultationPageWrapperStyle = styled.div<{
  isGreatCause?: boolean;
}>`
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  width: 100%;
  max-width: ${intToPx(Layouts.ContainerWithPadding)};
  margin: ${({ isGreatCause = false }) =>
    isGreatCause ? '20px auto' : '0 auto 20px'};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 0 20px;
    margin: 20px auto;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    flex-flow: row;
    margin: 45px auto;
  }
`;

export const ContentElementStyle = styled(ColumnElementStyle)`
  width: 100%;
  height: 100%;
`;

export const ConsultationPageContentStyle = styled(ContentElementStyle)`
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    width: ${pxToPercent(780, 1140)};
  }
`;

export const ConsultationPageSidebarStyle = styled(ContentElementStyle)<{
  bottomAffix: boolean;
}>`
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-bottom: 20px;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: 0;
    padding-left: ${pxToPercent(20, 1140)};
    order: 1;
    width: ${pxToPercent(390, 1140)};
    position: sticky;
    ${props =>
      props.bottomAffix
        ? `bottom: 0; align-self: flex-end`
        : 'top: 0; align-self: flex-start'};
  }
`;

export const TopIdeasPageTitleStyle = styled.h2`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: 1.5;
  margin: 10px 0 20px;
  padding: 0 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 0 0 20px;
    padding: 0;
    font-size: ${intToPx(typography.font.fontsize.S.value)};
  }
`;

export const TopIdeaDetailsPageTitleStyle = styled(TopIdeasPageTitleStyle)`
  margin: 40px 0 25px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 40px 0 25px;
  }
`;

export const TopIdeaDetailsIconStyle = styled(SvgChat)`
  margin-right: 15px;
  .tofill {
    fill: ${color.black};
  }
`;

export const TopIdeasListStyle = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const TopIdeasListItemStyle = styled.li`
  margin: 0 0 20px;
`;

export const ParticipateContentStyle = styled.section`
  display: flex;
  flex-flow: column;
  ${ContainerWithPadding};
`;

export const ParticipateTitleStyle = styled.h3`
  font-family: ${MakeFonts.CircularStandardBold};
  text-transform: none;
  font-size: ${intToPx(typography.font.fontsize.X2L.value)};
  margin: 40px 0 15px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.X4L.value)};
    margin: 50px 0 5px;
  }
`;

export const ResultsTitleStyle = styled(ParticipateTitleStyle)`
  margin: 60px 0 40px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 60px 0px;
  }
`;

export const ExploreTitleWrapperStyle = styled(ColumnElementStyle)`
  margin-top: 30px;
  margin-bottom: 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    align-items: baseline;
    margin-bottom: 30px;
  }
`;

export const ExploreTitleStyle = styled.h3`
  font-family: ${MakeFonts.CircularStandardBold};
  text-transform: none;
  font-size: ${intToPx(typography.font.fontsize.L.value)};
  letter-spacing: 0.5px;
  margin: 40px 0px 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XL.value)};
    margin-bottom: 0;
    margin-right: 15px;
  }
`;

export const ExploreSubTitleWrapperStyle = styled.div`
  font-family: ${MakeFonts.CircularStandardBook};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  letter-spacing: 0.14px;
  margin-top: 15px;
  margin-bottom: 35px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    width: 60%;
  }
`;
export const ExploreDescriptionStyle = styled(SpaceBetweenRowStyle)`
  width: 100%;
`;

export const ExploreProposalsCountStyle = styled.span`
  font-family: ${MakeFonts.CircularStandardBold};
  font-size: ${intToPx(typography.font.fontsize.S.value)};
  color: ${color.black};
  letter-spacing: 0.12px;
`;

export const NoProposalWrapperStyle = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  margin: 45px 0;
`;

export const ResetLinkButtonWrapperStyle = styled.div`
  display: flex;
  margin: 15px auto 0;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 30px 0 0;
  }
`;
export const ResetLinkStyle = styled(Link)`
  font-family: ${MakeFonts.CircularStandardBook};
  border: none;
  text-decoration: underline;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  color: ${color.brandSecondary};
  padding: 0;
  background-color: transparent;
  &:hover,
  &:focus {
    color: ${color.brandSecondary};
  }
`;

export const ParticipateDescriptionStyle = styled.p`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  max-width: 750px;
  margin-bottom: 40px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-bottom: 50px;
  }
`;

export const ParticipateInnerStyle = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  max-width: ${intToPx(Layouts.ContainerWithPadding)};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    flex-flow: row;
  }
`;

export const ParticipateMainContentStyle = styled(ColumnElementStyle)`
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    width: ${pxToPercent(750, 1140)};
  }
`;

export const ParticipateSidebarContentStyle = styled(ColumnElementStyle)`
  width: 100%;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-left: ${pxToPercent(30, 1140)};
    width: ${pxToPercent(360, 1140)};
  }
`;

export const ParticipateFullwidthContentStyle = styled(ColumnElementStyle)`
  width: 100%;
`;

export const ParticipateCTAProposalBloc = styled.div<{
  isKeywordActive: boolean;
}>`
  display: flex;
  flex-flow: column;
  width: 100%;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    flex-flow: ${props => (props.isKeywordActive ? 'column' : 'row')};
    width: ${props => (props.isKeywordActive ? '50%' : '100%')};
    margin-right: 10px;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-right: 15px;
  }
`;

export const FiltersAndSortCTAWrapperStyle = styled(SpaceBetweenRowStyle)`
  height: 55px;
  background-color: ${color.white};
  ${ContainerWithPadding};
`;

export const FiltersAndSortCTAStyle = styled.button`
  line-height: 12px;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  border: none;
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
  background-color: ${color.white};
`;

export const SvgArrowsGroupMobile = styled(SvgArrowGroupUpDown)`
  width: 8.5px;
  height: 12px;
  margin-right: 12px;
`;

export const SvgFiltersMobile = styled(SvgFiltersMobileIcon)`
  width: 12px;
  height: 11.25px;
  margin-right: 10px;
`;
