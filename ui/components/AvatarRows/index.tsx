import React, { FC } from 'react';
import { Avatar, AvatarWithDots } from '../Avatar';

import { AvatarStyle, AvatarRowsStyle } from './style';

type Props = {
  avatars: string[];
};

const getAvatarKey = (index: number): string => `avatar_${index}`;

const getZindex = (index: number): number => 10 - index;

export const AvatarRows: FC<Props> = ({ avatars }) => (
  <AvatarRowsStyle>
    {avatars.map((avatar, index) => (
      <AvatarStyle
        key={getAvatarKey(index)}
        style={{ zIndex: getZindex(index) }}
      >
        <Avatar avatarSize={34} avatarUrl={avatar} />
      </AvatarStyle>
    ))}
    {avatars.length > 3 && (
      <AvatarStyle>
        <AvatarWithDots />
      </AvatarStyle>
    )}
  </AvatarRowsStyle>
);
