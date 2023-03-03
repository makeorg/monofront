import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints, DefaultPadding } from '@make.org/assets/vars/Breakpoints';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
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
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
  text-transform: uppercase;
  border-radius: 20px;
  border: none;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  padding: 10px 20px 7px 20px;
  text-decoration: none;
`;

export const RedStyle = `
  color: ${color.white};
  background-color: ${color.brandSecondary};
  .tofill {
    fill: ${color.white};
  }
  &:hover,
  &:focus {
    color: ${color.white};
    text-decoration: none;
  }
`;

export const GreyStyle = `
  color: ${color.greyDark};
  background-color: ${color.grey};
  .tofill {
    fill: ${color.brandSecondary};
  }
  &:hover,
  &:focus {
    color: ${color.greyDark};
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
  color: ${color.black};
  background-color: ${color.white};
  svg {
    fill: ${color.black};
  }
`;

export const ActiveButtonStyle = styled.button.attrs(props => ({
  type: 'button',
  ...props,
}))`
  ${BasicButtonStyle};
  color: ${color.white};
  background-color: ${color.brandSecondary};
  svg,
  .tofill {
    fill: ${color.white};
  }
  &:disabled {
    color: ${color.greyDark};
    background-color: ${color.grey};
    svg,
    .tofill {
      fill: ${color.greyDark};
    }
  }
`;

export const ActiveButtonCenterStyle = styled.button.attrs(props => ({
  type: 'button',
  ...props,
}))`
  ${BasicButtonStyle};
  color: ${color.white};
  background-color: ${color.brandSecondary};
  align-self: center;
  margin: 30px 0;
  svg,
  .tofill {
    fill: ${color.white};
  }
  &:disabled {
    color: ${color.greyDark};
    background-color: ${color.grey};
    svg,
    .tofill {
      fill: ${color.greyDark};
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
  color: ${color.brandSecondary};
  text-decoration: underline;
  margin: 0 5px;
`;

export const LinkButtonStyle = styled(UnstyledButtonStyle)`
  display: inline-block;
  text-decoration: underline;
  margin-right: 5px;
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
`;

export const RedButtonAsLinkStyle = styled(UnstyledButtonStyle)`
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
  font-size: ${intToPx(typography.font.fontsize.M.value)};
  color: ${color.brandSecondary};
  text-transform: uppercase;
  text-decoration: underline;
  &:hover,
  &:focus {
    color: ${color.brandSecondary};
  }
  svg {
    fill: ${color.brandSecondary};
  }
`;

export const CloseButtonStyle = styled(UnstyledButtonStyle)`
  position: absolute;
  top: ${intToPx(DefaultPadding.Mobile)};
  right: ${intToPx(DefaultPadding.Mobile)};
  fill: ${color.brandSecondary};
  z-index: 1;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  .tofill {
    fill: ${color.greyDark};
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
  font-family: ${MakeFonts.CircularStandardBold};
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
  background-color: ${color.white};
  min-width: 128px;
  &.qualified {
    color: ${color.white};
    background-color: ${props => props.color};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
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
  background-color: ${color.white};
  transform: scale(1);
  transition: transform 0.1s ease-in;
  &:hover,
  &:focus {
    transform: scale(1.1);
  }
  &.agree {
    color: ${color.agree};
    border-color: ${color.agree};
  }
  &.disagree {
    color: ${color.disagree};
    border-color: ${color.disagree};
  }
  &.neutral,
  &.other {
    color: ${color.neutral};
    border-color: ${color.neutral};
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
    background-color: ${color.agree};
  }
  &.disagree.voted {
    background-color: ${color.disagree};
  }
  &.neutral.voted,
  &.other.voted {
    background-color: ${color.neutral};
  }
  &.agree .tofill {
    fill: ${color.agree};
  }
  &.disagree .tofill {
    fill: ${color.disagree};
  }
  &.neutral .tofill,
  &.other .tofill {
    fill: ${color.neutral};
  }
  &.voted {
    color: ${color.white};
  }
  &.voted .tofill {
    fill: ${color.white};
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
  color: ${color.greyDark};
`;

export const ExternalLinkIconStyle = styled(SvgExternalLink)`
  width: 14px;
  height: 14px;
  margin-left: 7px;
`;

const ButtonNoBackgroundStyle = `
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  text-decoration: underline;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

const GreyNoBackgroundStyle = `
  color: ${color.greyDark};
  .tofill {
    fill: ${color.greyDark};
  }
`;

const BlackBordersStyle = `
  background-color: transparent;
  color: ${color.black};
  border: 1px solid ${color.black};
  padding: 9px 19px 6px 19px;
  .tofill {
    fill: ${color.black};
  }
`;

export const BlackNoBackgroundButtonStyle = styled(UnstyledButtonStyle)`
  ${ButtonNoBackgroundStyle};
  background-color: transparent;
  color: ${color.black};
  border: none;
  .tofill {
    fill: ${color.black};
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
