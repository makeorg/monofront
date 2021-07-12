import React from 'react';
import {
  SkeletonCardStyle,
  SkeletonRoundStyle,
  SkeletonLineStyle,
  SkeletonVoteWrapperStyle,
} from './style';

export const ProposalSkeleton: React.FC = () => (
  <SkeletonCardStyle>
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
