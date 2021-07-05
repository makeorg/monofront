import { Link } from 'react-router-dom';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints, DefaultPadding } from '@make.org/assets/vars/Breakpoints';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import {
  SvgThumbsUp,
  SvgEnvelope,
  SvgExternalLinkPlain,
  SvgPencil,
  SvgClapping,
  SvgSignOut,
  SvgAngleArrowLeft,
  SvgPlayButton,
  SvgStepForward,
  SvgLock,
  SvgUser,
  SvgChild,
  SvgMapMarker,
  SvgSuitcase,
  SvgPaperPlane,
  SvgSaveFileOption,
  SvgLink,
} from '../../Svg/elements';

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

// eslint-disable-next-line react/jsx-props-no-spreading
export const VoteIconStyle = styled(props => <SvgThumbsUp {...props} />)`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  width: 16px;
  &.agree {
    transform: translate(-50%, -50%);
  }
  &.disagree {
    transform: translate(-50%, -50%) rotate(180deg) scaleX(-1);
  }
  &.neutral,
  &.other {
    transform: translate(-50%, -50%) rotate(-90deg);
  }
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    width: 22px;
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    width: 25px;
  }
`;

/**
 * Icons in buttons
 */

const ButtonIconStyle = `
  display: inline-flex;
  justify-content: flex-start;
  align-content: center;
  margin-right: 5px;
  width: 14px;
  height: 14px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: 16px;
    height: 16px;
  }
`;

// eslint-disable-next-line react/jsx-props-no-spreading
export const ProposalIconStyle = styled(props => <SvgPencil {...props} />)`
  ${ButtonIconStyle};
  &.closed {
    margin: 0;
    @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
      margin-right: 5px;
    }
  }
`;

// eslint-disable-next-line react/jsx-props-no-spreading
export const EmailIconStyle = styled(props => <SvgEnvelope {...props} />)`
  ${ButtonIconStyle}
`;

// eslint-disable-next-line react/jsx-props-no-spreading
export const ClappingIconStyle = styled(props => <SvgClapping {...props} />)`
  ${ButtonIconStyle}
`;

// eslint-disable-next-line react/jsx-props-no-spreading
export const SignOutIconStyle = styled(props => <SvgSignOut {...props} />)`
  ${ButtonIconStyle}
`;

// eslint-disable-next-line react/jsx-props-no-spreading
export const PencilIconStyle = styled(props => <SvgPencil {...props} />)`
  ${ButtonIconStyle}
`;

export const AngleArrowLeftIconStyle = styled(props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <SvgAngleArrowLeft {...props} />
))`
  ${ButtonIconStyle}
`;

// eslint-disable-next-line react/jsx-props-no-spreading
export const ThumbsUpIconStyle = styled(props => <SvgThumbsUp {...props} />)`
  ${ButtonIconStyle}
`;

// eslint-disable-next-line react/jsx-props-no-spreading
export const PlayIconStyle = styled(props => <SvgPlayButton {...props} />)`
  ${ButtonIconStyle}
`;

// eslint-disable-next-line react/jsx-props-no-spreading
export const ForwardIconStyle = styled(props => <SvgStepForward {...props} />)`
  ${ButtonIconStyle}
`;

// eslint-disable-next-line react/jsx-props-no-spreading
export const LockIconStyle = styled(props => <SvgLock {...props} />)`
  ${ButtonIconStyle}
`;

// eslint-disable-next-line react/jsx-props-no-spreading
export const UserIconStyle = styled(props => <SvgUser {...props} />)`
  ${ButtonIconStyle}
`;

// eslint-disable-next-line react/jsx-props-no-spreading
export const ChildIconStyle = styled(props => <SvgChild {...props} />)`
  ${ButtonIconStyle}
`;

// eslint-disable-next-line react/jsx-props-no-spreading
export const MapMarkerIconStyle = styled(props => <SvgMapMarker {...props} />)`
  ${ButtonIconStyle}
`;

// eslint-disable-next-line react/jsx-props-no-spreading
export const SuitcaseIconStyle = styled(props => <SvgSuitcase {...props} />)`
  ${ButtonIconStyle}
`;

export const PaperPlaneIconStyle = styled(props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <SvgPaperPlane {...props} />
))`
  ${ButtonIconStyle}
`;

export const SaveFileIconStyle = styled(props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <SvgSaveFileOption {...props} />
))`
  ${ButtonIconStyle}
`;

// eslint-disable-next-line react/jsx-props-no-spreading
export const LinkIconStyle = styled(props => <SvgLink {...props} />)`
  ${ButtonIconStyle}
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
export const ExternalLinkIconStyle = styled(SvgExternalLinkPlain)`
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
