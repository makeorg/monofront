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
  SvgChild,
  SvgMapMarker,
  SvgSuitcase,
  SvgPaperPlane,
  SvgSaveFileOption,
  SvgLink,
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
