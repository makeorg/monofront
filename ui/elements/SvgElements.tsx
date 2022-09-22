/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import {
  SvgThumbsUp,
  SvgEnvelope,
  SvgPencil,
  SvgClapping,
  SvgSignOut,
  SvgAngleArrowLeft,
  SvgPlayButton,
  SvgStepForward,
  SvgLock,
  SvgUser,
  SvgBirthday,
  SvgMapMarker,
  SvgSuitcase,
  SvgPaperPlane,
  SvgSaveFileOption,
  SvgLink,
  SvgSmallEarth,
} from '../Svg/elements';

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
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    &.sequence {
      width: 20px;
    }
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

export const ProposalIconStyle = styled(props => <SvgPencil {...props} />)`
  ${ButtonIconStyle};
  &.closed {
    margin: 0;
    @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
      margin-right: 5px;
    }
  }
`;

export const EmailIconStyle = styled(props => <SvgEnvelope {...props} />)`
  ${ButtonIconStyle}
`;

export const ClappingIconStyle = styled(props => <SvgClapping {...props} />)`
  ${ButtonIconStyle}
`;

export const SignOutIconStyle = styled(props => <SvgSignOut {...props} />)`
  ${ButtonIconStyle}
`;

export const PencilIconStyle = styled(props => <SvgPencil {...props} />)`
  ${ButtonIconStyle}
`;

export const AngleArrowLeftIconStyle = styled(props => (
  <SvgAngleArrowLeft {...props} />
))`
  ${ButtonIconStyle}
`;

export const ThumbsUpIconStyle = styled(props => <SvgThumbsUp {...props} />)`
  ${ButtonIconStyle}
`;

export const PlayIconStyle = styled(props => <SvgPlayButton {...props} />)`
  ${ButtonIconStyle}
`;

export const ForwardIconStyle = styled(props => <SvgStepForward {...props} />)`
  ${ButtonIconStyle}
`;

export const LockIconStyle = styled(props => <SvgLock {...props} />)`
  ${ButtonIconStyle}
`;

export const UserIconStyle = styled(props => <SvgUser {...props} />)`
  ${ButtonIconStyle}
`;

export const BirthdayIconStyle = styled(props => <SvgBirthday {...props} />)`
  ${ButtonIconStyle}
`;

export const MapMarkerIconStyle = styled(props => <SvgMapMarker {...props} />)`
  ${ButtonIconStyle}
`;

export const SuitcaseIconStyle = styled(props => <SvgSuitcase {...props} />)`
  ${ButtonIconStyle}
`;

export const PaperPlaneIconStyle = styled(props => (
  <SvgPaperPlane {...props} />
))`
  ${ButtonIconStyle}
`;

export const SaveFileIconStyle = styled(props => (
  <SvgSaveFileOption {...props} />
))`
  ${ButtonIconStyle}
`;

export const LinkIconStyle = styled(props => <SvgLink {...props} />)`
  ${ButtonIconStyle}
`;

export const SmallEarthIconStyle = styled(props => (
  <SvgSmallEarth {...props} />
))`
  ${ButtonIconStyle};
`;
