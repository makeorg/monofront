import { ProposalType, Reducer, ReducerAction } from '@make.org/types';
import { GET_ALL_PROPOSALS } from '../../actionTypes';

// state, actions and reducer
export const proposals_state: ProposalType[] = [];

export const proposals_reducer: Reducer = (
  state: ProposalType[],
  action: ReducerAction
): ProposalType[] => {
  const { type = '', payload = [] } = action;
  switch (type) {
    case GET_ALL_PROPOSALS:
      return payload;
    default:
      return state;
  }
};
