import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { shadows } from '@make.org/designsystem/tokens/shadows';
import { intToPx, pxToPercent } from '@make.org/utils/helpers/styled';
import {
  Breakpoints,
  Layouts,
  DefaultPadding,
} from '@make.org/assets/vars/Breakpoints';
import { TextMStyle } from '@make.org/designsystem/components/Typography/Text/style';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { BorderRadius } from './CardsElements';
import {
  FlexElementStyle,
  MiddleRowStyle,
  ColumnElementStyle,
} from './FlexElements';
import { ParagraphStyle } from './ParagraphElements';
import { SeparatorStyle } from './SeparatorsElements';
import { GreyButtonStyle, UnstyledButtonStyle } from './ButtonsElements';
import { RedHTMLLinkElementStyle } from './LinkElements';
import { SvgLink, SvgLike, SvgMapMarker } from '../Svg/elements';

const TabsOffsetDesktop = 62;
const DesktopOffset = intToPx(TabsOffsetDesktop);
const DesktopMarginWithOffset = DefaultPadding.Desktop - TabsOffsetDesktop;

export const ProfileHeaderStyle = styled.div`
  height: 100px;
  width: 100%;
  background-color: ${colors.Background.Make.Primary};
`;

export const ProfilePageContentWrapperStyle = styled.div`
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  width: 100%;
  align-items: flex-start;
  max-width: ${intToPx(Layouts.ContainerWithPadding)};
  margin: 0 auto;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 0 ${spacings.m};
    flex-flow: row;
    justify-content: space-between;
    margin: 0 auto ${intToPx(DesktopMarginWithOffset)};
    transform: translateY(-${DesktopOffset});
  }
`;

const ContentElementStyle = styled(ColumnElementStyle)`
  width: 100%;
  height: 100%;
`;

export const ProfilePageContentStyle = styled(ContentElementStyle)`
  margin: ${intToPx(DefaultPadding.Mobile)} 0 ${spacings.l};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 0;
    width: ${pxToPercent(760, 1140)};
    padding-left: ${pxToPercent(20, 1140)};
  }
`;

export const ProfilePageSidebarWrapperStyle = styled.div`
  width: 100%;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: ${pxToPercent(360, 1140)};
  }
`;

export const ProfilePageSidebarStyle = styled(ContentElementStyle)`
  align-items: center;
  background-color: ${colors.Background.Interface.Lighter};
  box-shadow: ${shadows.s10};
  padding: 0 ${spacings.m} ${spacings.m};
  margin-bottom: ${spacings.m};
  &:last-child {
    margin-bottom: 0;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    border-radius: ${intToPx(BorderRadius)};
  }
`;

export const ProfileContentHeaderStyle = styled.header`
  width: 100%;
  padding: 0 ${spacings.s};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 0;
  }
`;

export const ProfileTitleSeparatorStyle = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.Background.Interface.DarkMain};
  margin: ${spacings.xs} auto ${intToPx(DefaultPadding.Mobile)};
`;

export const ProfileTabIconStyle = styled(SvgLike)`
  width: 14px;
  height: 14px;
  align-self: center;
  margin-left: ${spacings.xs};
  .tofill {
    fill: ${colors.Content.Make.Secondary};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: 18px;
    height: 18px;
  }
`;

export const ProfileAvatarLayoutStyle = styled(FlexElementStyle)`
  align-self: center;
  flex-flow: column;
`;

export const ProfileAvatarStyle = styled.div<{ avatarSize: number }>`
  display: flex;
  justify-content: center;
  transform: translateY(-${props => intToPx(props.avatarSize / 2)});
  margin-bottom: -${props => intToPx(props.avatarSize / 2)};
  > span {
    margin: 0;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    transform: translateY(-20px);
    margin-bottom: -${spacings.m};
    margin-right: 0;
  }
`;

export const ProfileContentWrapperStyle = styled(ColumnElementStyle)`
  align-content: flex-start;
  margin: ${spacings.m} 0 ${spacings.s};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    align-content: center;
  }
`;

export const ProfileNavigationStyle = styled(ColumnElementStyle)`
  margin-top: ${spacings.s};
`;

export const ProfileTitleStyle = styled(TextMStyle)`
  text-transform: uppercase;
  margin-bottom: ${spacings.s};
  text-align: center;
  &:last-child {
    margin-bottom: 0;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Paris};
  }
`;

export const ProfileContentStyle = styled(ParagraphStyle)`
  margin-bottom: ${spacings.s};
  svg {
    fill: ${colors.Content.Interface.DarkSecondary};
  }
  &:last-child {
    margin-bottom: 0;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    text-align: center;
  }
`;

export const ProfileAlignLeftContentStyle = styled(ProfileContentStyle)`
  width: 100%;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    text-align: left;
  }
`;

export const ProfileDescriptionStyle = styled(ParagraphStyle)<{
  isCollapsed: boolean;
}>`
  width: 100%;
  overflow-wrap: break-word;
  align-self: flex-start;
  max-height: ${props => (props.isCollapsed ? '126px' : '100%')};
  overflow: ${props => (props.isCollapsed ? 'hidden' : 'visible')};
`;

export const ProfileSeparatorStyle = styled(SeparatorStyle)`
  margin: ${spacings.s} 0;
`;

export const ProfileInformationButtonStyle = styled(GreyButtonStyle)`
  margin: ${spacings.s} 0 0;
`;

export const ProfileLinkIconStyle = styled(SvgLink)`
  margin-right: ${spacings.xs};
`;

export const ProfileWebsiteLinkStyle = styled(RedHTMLLinkElementStyle)`
  word-break: break-all;
`;

export const ProfileCollapseWrapperStyle = styled(MiddleRowStyle)`
  position: relative;
  z-index: 0;
  width: 100%;
  margin: ${spacings.s} 0;
`;

export const ProfileCollapseSeparatorStyle = styled(SeparatorStyle)<{
  isCollapsed: boolean;
}>`
  position: absolute;
  z-index: 0;
  top: 50%;
  left: 0;
  &:before {
    display: ${props => (props.isCollapsed ? 'block' : 'none')};
    content: '';
    position: absolute;
    z-index: 0;
    bottom: 100%;
    left: 0;
    width: 100%;
    height: 100px;
    background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        rgb(255, 255, 255)
      ),
      linear-gradient(to bottom, rgba(255, 255, 255, 0) 3%, rgb(255, 255, 255));
  }
`;

export const ProfileCollapseButtonStyle = styled(UnstyledButtonStyle)`
  position: relative;
  z-index: 1;
  background-color: ${colors.Background.Interface.Lighter};
  font-family: ${typography.FontFamily.Condensed};
  color: ${colors.Content.Make.Secondary};
  text-transform: uppercase;
  text-decoration: none;
  padding: 0 ${spacings.s};
`;

export const ProfileMapIconStyle = styled(SvgMapMarker)`
  margin-right: 7.5px;
`;
