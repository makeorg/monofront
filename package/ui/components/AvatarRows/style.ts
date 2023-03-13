import styled from 'styled-components';
import { colors } from '@make.org/designsystem/tokens/colors';
import { intToPx } from '@make.org/utils/helpers/styled';

export const AvatarRowsStyle = styled.div<{ avatarSize: number }>`
  display: flex;
  align-items: flex-start;
  height: ${props => intToPx(props.avatarSize)};
  max-height: ${props => intToPx(props.avatarSize)};
`;

export const AvatarStyle = styled.div`
  margin-left: -20px;
  img {
    border: 2px solid ${colors.Border.Interface.Lighter};
  }
  &:nth-child(1) {
    margin-left: 0;
  }
`;
