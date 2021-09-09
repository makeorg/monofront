import React, { FC } from 'react';
import {
  SkeletonCardStyle,
  SkeletonRoundStyle,
  SkeletonLineStyle,
  SkeletonVoteWrapperStyle,
} from './style';

type Props = {
  isWidget?: boolean;
};

export const ProposalSkeleton: FC<Props> = ({ isWidget }) => (
  <SkeletonCardStyle className={isWidget ? 'widget' : ''}>
    <SkeletonRoundStyle className="avatar" />
    <SkeletonLineStyle className="small name" />
    <SkeletonLineStyle className="medium proposal" />
    <SkeletonLineStyle className="large propsal" />
    <SkeletonLineStyle className="medium" />
    <SkeletonVoteWrapperStyle>
      <SkeletonRoundStyle />
      <SkeletonRoundStyle />
      <SkeletonRoundStyle />
    </SkeletonVoteWrapperStyle>
  </SkeletonCardStyle>
);
