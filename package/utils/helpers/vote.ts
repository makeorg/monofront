import { VoteType } from '@make.org/types';
import { TopComponentContextValue } from '@make.org/store/topComponentContext';

export const getVoteKey = (voteKey: string, proposalId: string): string =>
  `${voteKey}_${proposalId}`;

export const getSameKey = (wantedKey: string, voteKey: string): boolean => {
  if (wantedKey === voteKey) {
    return true;
  }
  return false;
};

export const getVoteButtonClass = (
  voteKey: string,
  animateVote: string,
  contextType?: string
): string => {
  let buttonClass = voteKey;
  if (animateVote === voteKey) {
    buttonClass = `${voteKey} animated`;
  }

  if (contextType === TopComponentContextValue.getSequenceProposal()) {
    buttonClass = `${buttonClass} sequence`;
  }

  return buttonClass;
};

export const updateAndGetVotes = (
  votesToUpdate: VoteType[],
  vote: VoteType
): VoteType[] =>
  // @todo Temporary fix following changes of Vote structure. Will probably need a complete refacto
  votesToUpdate.map(oldVote =>
    oldVote.voteKey === vote[oldVote.voteKey as keyof VoteType]?.voteKey
      ? vote[oldVote.voteKey as keyof VoteType]
      : oldVote
  );
