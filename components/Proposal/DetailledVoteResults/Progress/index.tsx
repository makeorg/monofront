import React from 'react';
import {
  getTotalVotesCount,
  getVotesPercent,
} from '@make.org/utils/helpers/voteResult';
import { voteStaticParams } from '@make.org/utils/constants/vote';
import { VoteType } from '@make.org/types';
import {
  VoteProgressContainerStyle,
  VoteProgressWrapperStyle,
  VoteProgressItemStyle,
} from '../style';

type Props = {
  /** Array of votes */
  votes: VoteType[];
  /** Id of the proposal */
  proposalId: string;
};

/**
 * Vote Progress component
 */
export const VoteProgress: React.FC<Props> = props => {
  const { votes, proposalId } = props;
  const votesCount = getTotalVotesCount(votes);
  const votesPercent = getVotesPercent(votes, votesCount);
  return (
    <VoteProgressContainerStyle>
      <VoteProgressWrapperStyle>
        {votes.map(vote => (
          <VoteProgressItemStyle
            key={`vote_progress_${proposalId}_${vote.voteKey}`}
            color={voteStaticParams[vote.voteKey].color}
            percent={votesPercent[vote.voteKey]}
          />
        ))}
      </VoteProgressWrapperStyle>
    </VoteProgressContainerStyle>
  );
};
