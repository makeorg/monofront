import { VoteType } from '@make.org/types';

export const getVoteKey = (voteKey: string, proposalId: string): string => `${voteKey}_${proposalId}`;

export const getSameKey = (wantedKey: string, voteKey: string): boolean => {
  if (wantedKey === voteKey) {
    return true;
  }
  return false;
};

export const getVoteButtonClass = (
  voteKey: string,
  animateVote: string,
  pendingVoteKey: string,
  isVoted: boolean
): string => {
  if (animateVote === voteKey) {
    return `${voteKey} animated`;
  }

  if (isVoted) {
    return `${voteKey} voted`;
  }

  return voteKey;
};

export const updateAndGetVotes = (
  votesToUpdate: VoteType[],
  vote: VoteType
): VoteType[] => votesToUpdate.map((oldVote) => (oldVote.voteKey === vote.voteKey ? vote : oldVote));
