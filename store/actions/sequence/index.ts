import {
  ProposalType,
  SequenceCardType,
  QualificationType,
  VoteType,
  ReducerAction,
  Dispatch,
  ProposalCardStateType,
  StateSequence,
} from '@make.org/types';
import {
  SEQUENCE_DISABLE_FIRST_PROPOSAL,
  SEQUENCE_DECREMENT_INDEX,
  SEQUENCE_DEMOGRAPHICS_SUBMITTED,
  SEQUENCE_INCREMENT_INDEX,
  SEQUENCE_LOAD_CARDS,
  SEQUENCE_LOAD_PROPOSALS,
  SEQUENCE_PROPOSAL_UNVOTE,
  SEQUENCE_PROPOSAL_VOTE,
  SEQUENCE_RESET_VOTED_PROPOSALS,
  SEQUENCE_SET_INDEX,
  SEQUENCE_UPDATE_CARD_STATE,
  SEQUENCE_SET_LOADING,
  SEQUENCE_SET_LENGTH,
  SEQUENCE_SET_LABEL,
  SEQUENCE_DEMOGRAPHICS_RENDER,
} from '../../actionTypes';
import { TopComponentContextValue } from '../../topComponentContext';

export const loadSequenceCards = (
  cards: SequenceCardType[]
): ReducerAction => ({
  type: SEQUENCE_LOAD_CARDS,
  payload: { cards },
});

export const updateSequenceCardState = (
  index: number,
  newCardState: ProposalCardStateType
): ReducerAction => ({
  type: SEQUENCE_UPDATE_CARD_STATE,
  payload: { index, newCardState },
});

export const resetSequenceVotedProposals = (
  questionSlug: string
): ReducerAction => ({
  type: SEQUENCE_RESET_VOTED_PROPOSALS,
  payload: { questionSlug },
});

export const loadSequenceProposals = (
  proposals: ProposalType[]
): ReducerAction => ({
  type: SEQUENCE_LOAD_PROPOSALS,
  payload: { proposals },
});

export const incrementSequenceIndex = (): ReducerAction => ({
  type: SEQUENCE_INCREMENT_INDEX,
});

export const decrementSequenceIndex = (): ReducerAction => ({
  type: SEQUENCE_DECREMENT_INDEX,
});

export const setSequenceIndex = (index: number): ReducerAction => ({
  type: SEQUENCE_SET_INDEX,
  payload: { index },
});

export const setSequenceLength = (length: number): ReducerAction => ({
  type: SEQUENCE_SET_LENGTH,
  payload: { length },
});

export const setSequenceLabel = (label: string): ReducerAction => ({
  type: SEQUENCE_SET_LABEL,
  payload: { label },
});

export const unvote = (
  proposal: ProposalType,
  newVotes: VoteType[],
  context: string,
  dispatch?: Dispatch,
  sequence?: StateSequence
): void => {
  if (context !== TopComponentContextValue.getSequenceProposal()) {
    return;
  }
  const { cards = [], currentIndex = 0 } = sequence || {};

  if (dispatch) {
    dispatch({
      type: SEQUENCE_PROPOSAL_UNVOTE,
      payload: {
        proposalId: proposal.id,
        questionSlug: proposal.question.slug,
      },
    });

    const proposalSequenceCard = cards[currentIndex];

    dispatch(
      updateSequenceCardState(currentIndex, {
        ...proposalSequenceCard.state,
        votes: newVotes,
      })
    );
  }
};

export const vote = (
  proposal: ProposalType,
  newVotes: VoteType[],
  context: string,
  dispatch?: Dispatch,
  sequence?: StateSequence
): void => {
  if (context !== TopComponentContextValue.getSequenceProposal()) {
    return;
  }
  const { cards = [], currentIndex = 0 } = sequence || {};

  if (dispatch) {
    dispatch({
      type: SEQUENCE_PROPOSAL_VOTE,
      payload: {
        proposalId: proposal.id,
        questionSlug: proposal.question.slug,
      },
    });

    const proposalSequenceCard = cards[currentIndex];
    dispatch(
      updateSequenceCardState(proposalSequenceCard.index, {
        ...proposalSequenceCard.state,
        votes: newVotes,
      })
    );
  }
};

const getVotesUpdatedWithQualifification = (
  votes: VoteType[],
  votedKey: string,
  qualification: QualificationType
) => {
  const qualificationMatch = (qualificationItem: QualificationType) =>
    qualificationItem.qualificationKey === qualification.qualificationKey;

  const getUpdatedVote = (voteItem: VoteType) => ({
    ...voteItem,
    qualifications: voteItem.qualifications.map(
      (qualificationItem: QualificationType) =>
        qualificationMatch(qualificationItem)
          ? qualification
          : qualificationItem
    ),
  });

  const newVotes = votes.map(voteItem =>
    voteItem.voteKey === votedKey && voteItem.hasVoted === true
      ? getUpdatedVote(voteItem)
      : voteItem
  );

  return newVotes;
};

export const qualify = (
  votedKey: string,
  qualification: QualificationType,
  context: string,
  dispatch: Dispatch,
  sequence?: StateSequence
): void => {
  if (context !== TopComponentContextValue.getSequenceProposal()) {
    return;
  }
  const { cards = [], currentIndex = 0 } = sequence || {};
  const proposalSequenceCard = cards[currentIndex];
  const { votes } = proposalSequenceCard.state || { votes: [] };
  const newVotes = getVotesUpdatedWithQualifification(
    votes,
    votedKey,
    qualification
  );

  dispatch(
    updateSequenceCardState(proposalSequenceCard.index, {
      ...proposalSequenceCard.state,
      votes: newVotes,
    })
  );
};

export const setDemographicsAsSubmitted = (): ReducerAction => ({
  type: SEQUENCE_DEMOGRAPHICS_SUBMITTED,
  payload: { submitted: true },
});

export const disableDemographicsCard = (): ReducerAction => ({
  type: SEQUENCE_DEMOGRAPHICS_RENDER,
  payload: { renderCard: false },
});

export const disableFirstProposal = (): ReducerAction => ({
  type: SEQUENCE_DISABLE_FIRST_PROPOSAL,
});

export const setSequenceLoading = (isLoading: boolean): ReducerAction => ({
  type: SEQUENCE_SET_LOADING,
  payload: { isLoading },
});
