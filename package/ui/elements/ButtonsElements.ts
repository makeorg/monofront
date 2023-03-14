import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints, DefaultPadding } from '@make.org/assets/vars/Breakpoints';
import { colors } from '@make.org/designsystem/tokens/colors';
import { SvgExternalLink } from '../Svg/elements';

export const UnstyledButtonStyle = styled.button.attrs(props => ({
  type: 'button',
  ...props,
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: none;
  background-color: transparent;
`;

export const BasicButtonStyle = `
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${typography.FontFamily.Condensed};
  text-transform: uppercase;
  border-radius: 20px;
  border: none;
  font-size: ${typography.FontSize.Arrondissement};
  padding: 10px 20px 7px 20px;
  text-decoration: none;
`;

export const RedStyle = `
  color: ${colors.Content.Interface.Light};
  background-color: ${colors.Background.Make.Secondary};
  .tofill {
    fill: ${colors.Content.Interface.Light};
  }
  &:hover,
  &:focus {
    color: ${colors.Content.Interface.Light};
    text-decoration: none;
  }
`;

export const GreyStyle = `
  color: ${colors.Content.Interface.DarkSecondary};
  background-color: ${colors.Background.Interface.DarkMain};
  .tofill {
    fill: ${colors.Content.Make.Secondary};
  }
  &:hover,
  &:focus {
    color: ${colors.Content.Interface.DarkSecondary};
    text-decoration: none;
  }
`;

export const RedButtonStyle = styled.button.attrs(props => ({
  type: 'button',
  ...props,
}))`
  ${BasicButtonStyle};
  ${RedStyle};
  &:disabled {
    ${GreyStyle};
  }
`;

export const RedButtonCenterStyle = styled.button.attrs(props => ({
  type: 'button',
  ...props,
}))`
  ${BasicButtonStyle};
  ${RedStyle};
  align-self: center;
  margin: 15px 0 0 0;
  &:disabled {
    ${GreyStyle};
  }
`;

export const RedButtonProposalStyle = styled(RedButtonCenterStyle)`
  margin: auto auto 0px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 15px 0 0 0;
  }
`;

export const GreyButtonStyle = styled.button.attrs(props => ({
  type: 'button',
  ...props,
}))`
  ${BasicButtonStyle};
  ${GreyStyle};
`;

export const LinkAsRedButtonStyle = styled(Link)`
  ${BasicButtonStyle};
  ${RedStyle};
  &:disabled {
    ${GreyStyle};
  }
`;

export const LinkAsRedButtonBottomMobileStyle = styled(LinkAsRedButtonStyle)`
  margin: auto auto 0px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin: 0;
  }
`;

export const WhiteButtonStyle = styled.button.attrs(props => ({
  type: 'button',
  ...props,
}))`
  ${BasicButtonStyle};
  color: ${colors.Content.Interface.Dark};
  background-color: ${colors.Background.Interface.Lighter};
  svg {
    fill: ${colors.Content.Interface.Dark};
  }
`;

export const ActiveButtonStyle = styled.button.attrs(props => ({
  type: 'button',
  ...props,
}))`
  ${BasicButtonStyle};
  color: ${colors.Content.Interface.Light};
  background-color: ${colors.Background.Make.Secondary};
  svg,
  .tofill {
    fill: ${colors.Content.Interface.Light};
  }
  &:disabled {
    color: ${colors.Content.Interface.DarkSecondary};
    background-color: ${colors.Background.Interface.DarkMain};
    svg,
    .tofill {
      fill: ${colors.Content.Interface.DarkSecondary};
    }
  }
`;

export const ActiveButtonCenterStyle = styled.button.attrs(props => ({
  type: 'button',
  ...props,
}))`
  ${BasicButtonStyle};
  color: ${colors.Content.Interface.Light};
  background-color: ${colors.Background.Make.Secondary};
  align-self: center;
  margin: 30px 0;
  svg,
  .tofill {
    fill: ${colors.Content.Interface.Light};
  }
  &:disabled {
    color: ${colors.Content.Interface.DarkSecondary};
    background-color: ${colors.Background.Interface.DarkMain};
    svg,
    .tofill {
      fill: ${colors.Content.Interface.DarkSecondary};
    }
  }
`;

export const ActiveButtonCenterBottomStyle = styled(ActiveButtonCenterStyle)`
  margin: auto auto 0px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin: 30px 0;
  }
`;

export const RedLinkButtonStyle = styled(UnstyledButtonStyle)`
  display: inline-block;
  color: ${colors.Content.Make.Secondary};
  text-decoration: underline;
  margin: 0 5px;
`;

export const LinkButtonStyle = styled(UnstyledButtonStyle)`
  display: inline-block;
  text-decoration: underline;
  margin: 0 5px;
  font-size: ${typography.FontSize.RueDeLappe};
`;

export const RedButtonAsLinkStyle = styled(UnstyledButtonStyle)`
  font-family: ${typography.FontFamily.Condensed};
  font-size: ${typography.FontSize.PetiteCouronne};
  color: ${colors.Content.Make.Secondary};
  text-transform: uppercase;
  text-decoration: underline;
  &:hover,
  &:focus {
    color: ${colors.Content.Make.Secondary};
  }
  svg {
    fill: ${colors.Content.Make.Secondary};
  }
`;

export const CloseButtonStyle = styled(UnstyledButtonStyle)`
  position: absolute;
  top: ${intToPx(DefaultPadding.Mobile)};
  right: ${intToPx(DefaultPadding.Mobile)};
  fill: ${colors.Content.Make.Secondary};
  z-index: 1;
  font-size: ${typography.FontSize.Arrondissement};
  .tofill {
    fill: ${colors.Content.Interface.DarkSecondary};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    top: ${intToPx(DefaultPadding.Desktop)};
    right: ${intToPx(DefaultPadding.Desktop)};
  }
`;

export const QualifyButtonStyle = styled.button.attrs(props => ({
  type: 'button',
  ...props,
}))`
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
  display: flex;
  justify-content: center;
  width: 100%;
  border-width: 1px;
  font-size: 14px;
  line-height: 24px;
  border-style: solid;
  padding: 0 10px;
  border-radius: 36px;
  border-color: ${props => props.color};
  color: ${props => props.color};
  background-color: ${colors.Background.Interface.Lighter};
  min-width: 128px;
  &.qualified {
    color: ${colors.Content.Interface.Light};
    background-color: ${props => props.color};
    border-color: transparent;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

const RotateButton = keyframes`
  0% { transform: rotate(0deg); }
  45% { transform: rotate(-20deg); }
  65% { transform: rotate(20deg); }
  100% { transform: rotate(0deg); }
`;

const InverseRotateButton = keyframes`
  0% { transform: rotate(0deg); }
  45% { transform: rotate(20deg); }
  65% { transform: rotate(-20deg); }
  100% { transform: rotate(0deg); }
`;

export const VoteButtonStyle = styled.button.attrs(props => ({
  type: 'button',
  ...props,
}))`
  position: relative;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  border-width: 2px;
  border-style: solid;
  border-radius: 50%;
  overflow: hidden;
  padding: 0;
  background-color: ${colors.Background.Interface.Lighter};
  transform: scale(1);
  transition: transform 0.1s ease-in;
  &:hover,
  &:focus {
    transform: scale(1.1);
  }
  &.agree {
    color: ${colors.Content.Alert.Positive};
    border-color: ${colors.Border.Alert.Positive};
  }
  &.disagree {
    color: ${colors.Content.Alert.Disagree};
    border-color: ${colors.Border.Alert.Disagree};
  }
  &.neutral,
  &.other {
    color: ${colors.Content.Alert.Neutral};
  }
  &.animated {
    box-shadow: 0 0 0 0 ${props => props.color};
    animation: ${RotateButton} 0.5s 1;
    transform: scale(0.9);
  }
  &.animated.disagree {
    animation: ${InverseRotateButton} 0.5s 1;
  }
  &.agree.voted {
    background-color: ${colors.Background.Alert.Positive};
  }
  &.disagree.voted {
    background-color: ${colors.Background.Alert.Disagree};
  }
  &.neutral.voted,
  &.other.voted {
    background-color: ${colors.Background.Alert.Neutral};
  }
  &.agree .tofill {
    fill: ${colors.Content.Alert.Positive};
  }
  &.disagree .tofill {
    fill: ${colors.Content.Alert.Disagree};
  }
  &.neutral .tofill,
  &.other .tofill {
    fill: ${colors.Content.Alert.Neutral};
  }
  &.voted {
    color: ${colors.Content.Interface.Light};
  }
  &.voted .tofill {
    fill: ${colors.Content.Interface.Light};
  }
  &.voted:hover,
  &.voted:focus {
    transform: scale(1);
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    &.sequence {
      width: 48px;
      height: 48px;
      min-width: 48px;
      min-height: 48px;
    }
  }
`;

export const HidePasswordIconStyle = styled(UnstyledButtonStyle)`
  color: ${colors.Content.Interface.DarkSecondary};
`;

export const ExternalLinkIconStyle = styled(SvgExternalLink)`
  width: 14px;
  height: 14px;
  margin-left: 7px;
`;

const ButtonNoBackgroundStyle = `
font-size: ${typography.FontSize.Arrondissement};
text-decoration: underline;
`;

const GreyNoBackgroundStyle = `
  color: ${colors.Content.Interface.DarkSecondary};
  .tofill {
    fill: ${colors.Content.Interface.DarkSecondary};
  }
`;

const BlackBordersStyle = `
  background-color: transparent;
  color: ${colors.Content.Interface.Dark};
  border: 1px solid ${colors.Border.Interface.Darker};
  padding: 9px 19px 6px 19px;
  .tofill {
    fill: ${colors.Content.Interface.Dark};
  }
`;

export const BlackNoBackgroundButtonStyle = styled(UnstyledButtonStyle)`
  ${ButtonNoBackgroundStyle};
  background-color: transparent;
  color: ${colors.Content.Interface.Dark};
  border: none;
  .tofill {
    fill: ${colors.Content.Interface.Dark};
  }
`;

export const GreyNoBackgroundButtonStyle = styled(UnstyledButtonStyle)`
  ${ButtonNoBackgroundStyle};
  ${GreyNoBackgroundStyle};
  margin-bottom: 10px;
`;

export const GreyLinkStyle = styled(Link)`
  ${ButtonNoBackgroundStyle};
  ${GreyNoBackgroundStyle};
`;

export const BlackBorderLinkStyle = styled(Link)`
  ${BasicButtonStyle};
  ${BlackBordersStyle};
`;

export const BlackBorderButtonStyle = styled.button.attrs(props => ({
  type: 'button',
  ...props,
}))`
  ${BasicButtonStyle};
  ${BlackBordersStyle};
`;
