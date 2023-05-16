import React from 'react';
import {
  AvatarStyle,
  AvatarWithDotsStyle,
  DotsStyle,
  AvatarImageStyle,
} from './style';
import { SvgAnonymous, SvgEmptyAvatar } from '../../Svg/elements';

type Props = {
  /** Url of avatar */
  avatarUrl?: string;
  /** Width of avatar */
  avatarSize?: number;
  /** Width of avatar */
  avatarAlt?: string;
  /** Special avatar design for sequence */
  isSequence?: boolean;
  /** Anonymous avatar */
  isAnonymous?: boolean;
};

type DotsProps = {
  avatarSize?: number;
};

export const Avatar: React.FC<Props> = ({
  avatarSize = 30,
  avatarUrl,
  avatarAlt = '',
  isSequence,
  isAnonymous,
}) => {
  if (isAnonymous) {
    return (
      <AvatarStyle isSequence={isSequence}>
        <SvgAnonymous
          aria-hidden
          width={avatarSize}
          height={avatarSize}
          focusable="false"
          data-cy-svg="anonymous-svg"
        />
      </AvatarStyle>
    );
  }

  if (avatarUrl) {
    return (
      <AvatarStyle isSequence={isSequence}>
        <AvatarImageStyle
          key="avatar"
          src={avatarUrl}
          alt={avatarAlt}
          width={avatarSize}
          height={avatarSize}
          className="avatar"
          srcSet={avatarUrl}
          loading="eager"
          avatarSize={avatarSize}
          crop
        />
      </AvatarStyle>
    );
  }

  return (
    <AvatarStyle isSequence={isSequence}>
      <SvgEmptyAvatar
        aria-hidden
        width={avatarSize}
        height={avatarSize}
        focusable="false"
      />
    </AvatarStyle>
  );
};
export const AvatarWithDots: React.FC<DotsProps> = ({ avatarSize = 34 }) => (
  <AvatarStyle>
    <AvatarWithDotsStyle avatarSize={avatarSize} as="span">
      <DotsStyle />
      <DotsStyle />
      <DotsStyle />
    </AvatarWithDotsStyle>
  </AvatarStyle>
);
