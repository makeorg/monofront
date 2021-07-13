// @flow
import React from 'react';
import {
  AvatarStyle,
  AvatarWithDotsStyle,
  DotsStyle,
  AvatarImageStyle,
} from './style';
import { SvgEmptyAvatar } from '../../Svg/elements';

type Props = {
  /** Url of avatar */
  avatarUrl: string,
  /** Width of avatar */
  avatarSize: number,
  /** Width of avatar */
  avatarAlt: string,
  /** Special avatar design for sequence */
  isSequence: boolean,
};

type DotsProps = {
  avatarSize: number,
};

export const Avatar: React.FC<Props> = ({
  avatarSize = 30,
  avatarUrl,
  avatarAlt = '',
  isSequence,
}) => (
  <AvatarStyle isSequence={isSequence}>
    {avatarUrl ? (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // styled component doesn't handle props overloading on an extended object
      <AvatarImageStyle
        src={avatarUrl}
        alt={avatarAlt}
        width={avatarSize}
        height={avatarSize}
        avatarSize={avatarSize}
        crop
      />
    ) : (
      <SvgEmptyAvatar
        aria-hidden
        width={avatarSize}
        height={avatarSize}
        focusable="false"
      />
    )}
  </AvatarStyle>
);

export const AvatarWithDots: React.FC<DotsProps> = ({ avatarSize = 34 }) => (
  <AvatarStyle>
    <AvatarWithDotsStyle avatarSize={avatarSize} as="span">
      <DotsStyle />
      <DotsStyle />
      <DotsStyle />
    </AvatarWithDotsStyle>
  </AvatarStyle>
);
