import { VoteType } from '@make.org/types';
import { BadArgumentError } from '@make.org/utils/errors';
import {
  VOTE_AGREE_KEY,
  VOTE_DISAGREE_KEY,
  VOTE_NEUTRAL_KEY,
} from '@make.org/utils/constants/vote';

/**
 * calculate total number of vote
 *
 * @param {VoteType[]} votes
 */
export const getTotalVotesCount = (votes: VoteType[]): number => {
  if (!votes.length) {
    throw new BadArgumentError('votes cannot be an empty array');
  }

  return votes
    .map(vote => vote.count)
    .reduce((total, voteCount) => total + voteCount);
};

/**
 * calculate the percent by vote key
 *
 * @param {VoteType} votes
 * @param {number} votesScore
 */
export const getVotesPercentFromScore = (
  votes: VoteType[]
): { [n: string]: number } => {
  const agreeVote: VoteType | undefined = votes.find(
    vote => vote.voteKey === VOTE_AGREE_KEY
  );
  const disagreeVote: VoteType | undefined = votes.find(
    vote => vote.voteKey === VOTE_DISAGREE_KEY
  );
  const neutralVote: VoteType | undefined = votes.find(
    vote => vote.voteKey === VOTE_NEUTRAL_KEY
  );

  return {
    [VOTE_AGREE_KEY]: agreeVote ? Math.round(agreeVote.score * 100) : 0,
    [VOTE_DISAGREE_KEY]: disagreeVote
      ? Math.round(disagreeVote.score * 100)
      : 0,
    [VOTE_NEUTRAL_KEY]: neutralVote ? Math.round(neutralVote.score * 100) : 0,
  };
};

/**
 * calculate the vote ratio betweem votesCount and votesTarget
 *
 * @param {number} votesCount
 * @param {number} votesTarget
 */
export const getVotesRatioInteger = (
  votesCount: number,
  votesTarget: number
): number => {
  const percent = (votesCount * 100) / votesTarget;

  return Math.round(percent);
};
