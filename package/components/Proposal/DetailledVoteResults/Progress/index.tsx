import React from 'react';
import {
  getTotalVotesCount,
  getVotesPercentFromScore,
} from '@make.org/utils/helpers/voteResult';
import { VoteType } from '@make.org/types';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import i18n from 'i18next';
import {
  VoteProgressContainerStyle,
  VoteProgressWrapperStyle,
  VoteProgressItemStyle,
  VoteCounterStyle,
} from '../style';
import { voteButtonParams } from '../../../Vote/Button/Params';

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
  const votesPercent = getVotesPercentFromScore(votes);
  return (
    <VoteProgressContainerStyle>
      <VoteCounterStyle>
        <ScreenReaderItemStyle as="span">
          <>{i18n.t('results.static_total')}</>
        </ScreenReaderItemStyle>
        <>{i18n.t('vote.label', { count: votesCount })}</>
      </VoteCounterStyle>
      <VoteProgressWrapperStyle>
        {votes.map(vote => (
          <VoteProgressItemStyle
            key={`vote_progress_${proposalId}_${vote.voteKey}`}
            color={voteButtonParams[vote.voteKey].color}
            percent={votesPercent[vote.voteKey]}
          />
        ))}
      </VoteProgressWrapperStyle>
    </VoteProgressContainerStyle>
  );
};
