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
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const ConsultationHeaderWrapperStyle = styled.div<{
  backgroundcolor: string;
}>`
  background-color: ${props => props.backgroundcolor};
  margin-top: -${spacings.xs};
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
    isGreatCause ? `${spacings.m} auto` : `0 auto ${spacings.m}`};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 0 ${spacings.m};
    margin: ${spacings.m} auto;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    flex-flow: row;
    margin: ${spacings.xl} auto;
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
    margin-bottom: ${spacings.m};
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
  margin: ${spacings.s} 0 ${spacings.m};
  padding: 0 ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 0 0 ${spacings.m};
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
  margin: 0 0 ${spacings.m};
`;

export const ParticipateContentStyle = styled.section`
  display: flex;
  flex-flow: column;
  ${ContainerWithPadding};
`;

export const ParticipateTitleStyle = styled(TitleL).attrs({ as: 'h3' })`
  text-transform: none;
  margin: 40px 0 ${spacings.sm};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Earth};
    margin: ${spacings.xl} 0 ${spacings.xs};
  }
`;

export const ResultsTitleStyle = styled(ParticipateTitleStyle)`
  margin: 60px 0 40px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 60px 0px;
  }
`;

export const ExploreTitleStyle = styled(TitleS).attrs({ as: 'h3' })`
  text-transform: none;
  letter-spacing: 0.5px;
  margin: 40px 0px ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.IleDeFrance};
    margin-bottom: 0;
    margin-right: ${spacings.sm};
  }
`;

export const ExploreSubTitleWrapperStyle = styled(BodyMDefault).attrs({
  as: 'div',
})`
  letter-spacing: 0.14px;
  margin-top: ${spacings.sm};
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

export const ResetLinkButtonWrapperStyle = styled.div`
  display: flex;
  margin-top: ${spacings.sm};
  justify-content: center;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-top: ${spacings.l};
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
    margin-bottom: ${spacings.xl};
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
    margin-right: ${spacings.s};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-right: ${spacings.sm};
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
  margin-left: ${spacings.xs};
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
  margin-right: ${spacings.s};
`;
