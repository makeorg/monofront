import styled from 'styled-components';
import { color } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Elements } from '@make.org/assets/vars/Elements';
import { Image } from '../Image';

export const AvatarStyle = styled.span<{ isSequence?: boolean }>`
  position: ${props => (props.isSequence ? 'absolute' : 'static')};
  top: ${props => (props.isSequence ? '-17px' : '')};
  left: ${props => (props.isSequence ? '50%' : '')};
  border: ${props => (props.isSequence ? `3px solid ${color.white}` : '')};
  border-radius: ${props => (props.isSequence ? '50%' : '')};
  margin-right: ${props => (props.isSequence ? '' : '10px')};
  transform: ${props => (props.isSequence ? 'translateX(-50%)' : '')};
  display: inline-flex;
`;

export const AvatarImageStyle = styled(Image)<{ avatarSize: number }>`
  box-sizing: content-box;
  min-width: ${props => intToPx(props.avatarSize)};
  width: ${props => intToPx(props.avatarSize)};
  height: ${props => intToPx(props.avatarSize)};
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid ${color.greyLighter};
  background-color: ${color.white};
`;

export const PartnerAvatarStyle = styled.span<any>`
  margin: 0;
  display: block;
  svg,
  img {
    border-radius: ${intToPx(Elements.BorderRadius)};
    overflow: hidden;
    border: 1px solid ${color.grey};
    background-color: ${color.white};
    margin: 0 auto;
  }
`;

export const AvatarWithDotsStyle = styled.div<{ avatarSize: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${props => intToPx(props.avatarSize)};
  width: ${props => intToPx(props.avatarSize)};
  height: ${props => intToPx(props.avatarSize)};
  border-radius: 50%;
  border: 2px solid ${color.white};
  overflow: hidden;
  background-color: rgb(127, 127, 127);
  box-sizing: content-box;
`;

export const DotsStyle = styled.span`
  border-radius: 50%;
  width: 3px;
  height: 3px;
  background-color: ${color.white};
  margin-left: 2px;
  &:nth-child(1) {
    margin-left: 0;
  }
`;
