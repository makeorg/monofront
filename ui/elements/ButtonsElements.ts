import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints, DefaultPadding } from '@make.org/assets/vars/Breakpoints';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { SvgExternalLinkPlain } from '../Svg/elements';

export const ButtonsWrapperStyle = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    flex-flow: row;
    margin: 20px 0;
  }
`;

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

export const BasicButtonStyle = styled.button.attrs(props => ({
  type: 'button',
  ...props,
}))`
  display: flex;
  justify-content: center;
  align-items: baseline;
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: 1;
  border: none;
  border-radius: 20px;
  text-transform: uppercase;
  padding: 12px 25px 8px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
    padding: 13px 25px 10px;
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    font-size: ${intToPx(typography.font.fontsize.S.value)};
  }
`;

const RedStyle = `
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

const GreyStyle = `
  color: ${color.greyDark};
  background-color: ${color.greyLighter};
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

export const WhiteButtonStyle = styled(BasicButtonStyle)`
  color: ${color.black};
  background-color: ${color.white};
  svg {
    fill: ${color.black};
  }
`;

export const SmallRedButtonStyle = styled(RedButtonStyle)`
  padding: 5px 15px 2.5px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 10px 20px;
  }
`;

export const SmallGreyButtonStyle = styled(GreyButtonStyle)`
  padding: 5px 15px 2.5px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 10px 20px;
  }
`;

export const ActiveButtonStyle = styled(BasicButtonStyle)`
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

export const SocialButtonStyle = styled(ActiveButtonStyle)`
  width: 100%;
  margin: 0 5px;
  padding: 5px 15px;
  color: ${color.white};
  svg {
    fill: ${color.white};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 10px 20px;
  }
`;
export const RedLinkButtonStyle = styled(UnstyledButtonStyle)`
  display: inline-block;
  color: ${color.brandSecondary};
  text-decoration: underline;
  margin: 0 5px;
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

export const NavButtonStyle = styled(UnstyledButtonStyle)`
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  color: ${color.brandSecondary};
  text-transform: uppercase;
`;

export const QualifyButtonStyle = styled.button`
  font-family: ${MakeFonts.CircularStandardBold};
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-width: 2px;
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  line-height: 20px;
  border-style: solid;
  padding: 0 10px;
  border-radius: 36px;
  border-color: ${props => props.color};
  color: ${props => props.color};
  background-color: ${color.white};
  &.qualified {
    color: ${color.white};
    background-color: ${props => props.color};
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
    line-height: 26px;
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
  width: 38px;
  height: 38px;
  min-width: 38px;
  min-height: 38px;
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
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    width: 43px;
    height: 43px;
    min-width: 43px;
    min-height: 43px;
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    width: 48px;
    height: 48px;
    min-width: 48px;
    min-height: 48px;
  }
`;

export const HidePasswordIconStyle = styled(UnstyledButtonStyle)`
  color: ${color.greyDark};
`;

export const ExternalLinkIconStyle = styled(SvgExternalLinkPlain)<{
  className?: string;
}>`
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

const RedNoBackgroundStyle = `
  color: ${color.brandSecondary};
  .tofill {
    fill: ${color.brandSecondary};
  }
`;

const BlackBordersStyle = `
  background-color: transparent;
  color: ${color.black};
  border: 1px solid ${color.black};
  .tofill {
    fill: ${color.black};
  }
`;

export const GreyNoBackgroundButtonStyle = styled(UnstyledButtonStyle)`
  ${ButtonNoBackgroundStyle};
  ${GreyNoBackgroundStyle};
`;

export const RedNoBackgroundButtonStyle = styled(UnstyledButtonStyle)`
  ${ButtonNoBackgroundStyle};
  ${RedNoBackgroundStyle};
`;

export const GreyLinkStyle = styled(Link)`
  ${ButtonNoBackgroundStyle};
  ${GreyNoBackgroundStyle};
`;

export const BlackBorderButtonStyle = styled.button.attrs(props => ({
  type: 'button',
  ...props,
}))`
  ${BasicButtonStyle};
  ${BlackBordersStyle};
`;
