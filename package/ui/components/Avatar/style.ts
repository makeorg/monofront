import styled from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { BorderRadius } from '@make.org/ui/elements/CardsElements';
import { colors } from '@make.org/designsystem/tokens/colors';
import { Image } from '../Image';

export const AvatarStyle = styled.span<{
  isSequence?: boolean;
}>`
  position: ${props => (props.isSequence ? 'absolute' : 'static')};
  top: ${props => (props.isSequence ? '-17px' : '')};
  left: ${props => (props.isSequence ? '50%' : '')};
  border: ${props =>
    props.isSequence ? `3px solid ${colors.Border.Interface.Lighter}` : ''};
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
  border: 1px solid ${colors.Border.Interface.DarkSecondary};
  background-color: ${colors.Background.Interface.Lighter};
`;

export const PartnerAvatarStyle = styled.span<any>`
  margin: 0;
  display: block;
  svg,
  img {
    border-radius: ${intToPx(BorderRadius)};
    overflow: hidden;
    border: 1px solid ${colors.Border.Interface.DarkMain};
    background-color: ${colors.Background.Interface.Lighter};
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
  border: 2px solid ${colors.Border.Interface.Lighter};
  overflow: hidden;
  background-color: rgb(127, 127, 127);
  box-sizing: content-box;
`;

export const DotsStyle = styled.span`
  border-radius: 50%;
  width: 3px;
  height: 3px;
  background-color: ${colors.Background.Interface.Lighter};
  margin-left: 2px;
  &:nth-child(1) {
    margin-left: 0;
  }
`;
