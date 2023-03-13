import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { Link } from 'react-router-dom';
import { intToPx, pxToPercent } from '@make.org/utils/helpers/styled';
import {
  ColumnElementStyle,
  SpaceBetweenRowStyle,
} from '@make.org/ui/elements/FlexElements';
// import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { Breakpoints, Layouts } from '@make.org/assets/vars/Breakpoints';
import { SvgFiltersMobileIcon } from '@make.org/ui/Svg/elements';
import { ContainerWithPadding } from '@make.org/ui/elements/MainElements';
import { TitleL, TitleS } from '@make.org/designsystem/components/Titles';
import { BodyMDefault } from '@make.org/designsystem/components/Body';
import { colors } from '@make.org/designsystem/tokens/colors';

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

const ContentElementStyle = styled(ColumnElementStyle)`
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
  font-size: ${typography.FontSize.Arrondissement};
  line-height: 1.5;
  margin: 10px 0 20px;
  padding: 0 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 0 0 20px;
    padding: 0;
    font-size: ${typography.FontSize.Paris};
  }
`;

export const TopIdeaDetailsPageTitleStyle = styled(TopIdeasPageTitleStyle)`
  margin: 40px 0 25px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 40px 0 25px;
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

export const ParticipateTitleStyle = styled(TitleL).attrs({ as: 'h3' })`
  text-transform: none;
  margin: 40px 0 15px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Earth};
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

export const ExploreTitleStyle = styled(TitleS).attrs({ as: 'h3' })`
  text-transform: none;
  letter-spacing: 0.5px;
  margin: 40px 0px 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.IleDeFrance};
    margin-bottom: 0;
    margin-right: 15px;
  }
`;

export const ExploreSubTitleWrapperStyle = styled(BodyMDefault).attrs({
  as: 'div',
})`
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
  font-family: ${typography.FontFamily.Default};
  font-size: ${typography.FontSize.Paris};
  color: ${colors.Content.Interface.Dark};
  letter-spacing: 0.12px;
  > strong {
    font-family: ${typography.FontFamily.Hightlight};
    font-weight: bold;
  }
`;

export const NoProposalWrapperStyle = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  margin: 45px 0;
`;

export const ResetLinkButtonWrapperStyle = styled.div`
  display: flex;
  margin-top: 15px;
  justify-content: center;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-top: 30px;
    justify-content: flex-start;
  }
`;
export const ResetLinkStyle = styled(Link)`
  font-family: ${typography.FontFamily.Default};
  border: none;
  text-decoration: underline;
  font-size: ${typography.FontSize.Arrondissement};
  color: ${colors.Content.Make.Secondary};
  padding: 0;
  background-color: transparent;
  &:hover,
  &:focus {
    color: ${colors.Content.Make.Secondary};
  }
`;

export const ParticipateDescriptionStyle = styled.p`
  font-size: ${typography.FontSize.Arrondissement};
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
  background-color: ${colors.Background.Interface.Lighter};
  ${ContainerWithPadding};
`;

export const FiltersAndSortCTAStyle = styled.button`
  line-height: 12px;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  border: none;
  font-family: ${typography.FontFamily.Condensed};
  color: ${colors.Content.Interface.Dark};
  background-color: ${colors.Background.Interface.Lighter};
  color: ${colors.Content.Interface.Dark};
`;

export const FiltersCounterStyle = styled.span`
  margin-left: 5px;
  min-width: 20px;
  line-height: 20px;
  color: ${colors.Content.Interface.Light};
  font-family: ${typography.FontFamily.Condensed};
  font-size: ${typography.FontSize.RueDeLappe};
  background-color: ${colors.Content.Make.Secondary};
  text-align: center;
  border-radius: 30px;
`;

export const SvgFiltersMobile = styled(SvgFiltersMobileIcon)`
  margin-right: 10px;
`;
