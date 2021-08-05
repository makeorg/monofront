import React, { FC } from 'react';
import { Avatar, AvatarWithDots } from '../Avatar';

import { AvatarStyle, AvatarRowsStyle } from './style';

type Props = {
  avatars: string[];
};

const getAvatarKey = (index: number): string => `avatar_${index}`;
const getZindex = (index: number): number => 10 - index;
const avatarSize = 34;

export const AvatarRows: FC<Props> = ({ avatars }) => (
  <AvatarRowsStyle avatarSize={avatarSize}>
    {avatars.map((avatar, index) => (
      <AvatarStyle
        key={getAvatarKey(index)}
        style={{ zIndex: getZindex(index) }}
      >
        <Avatar avatarSize={avatarSize} avatarUrl={avatar} />
      </AvatarStyle>
    ))}
    {avatars.length > 3 && (
      <AvatarStyle>
        <AvatarWithDots />
      </AvatarStyle>
    )}
  </AvatarRowsStyle>
);
