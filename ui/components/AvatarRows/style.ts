import styled from 'styled-components';
import { color } from 'athena-design-tokens';
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
    border: 2px solid ${color.white};
  }
  &:nth-child(1) {
    margin-left: 0;
  }
`;
