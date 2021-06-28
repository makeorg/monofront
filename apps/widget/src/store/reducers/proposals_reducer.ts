import { Proposal } from '@make.org/types';
import { Reducer, ReducerAction } from './types';

// types
export type ProposalState = {
  proposals?: Proposal[];
  questionId: string;
};

// state, actions and reducer
export const proposals_state: ProposalState = {
  proposals: undefined,
  questionId: '',
};

export const proposals_actions = {
  GET_PROPOSAL: 'GET_PROPOSAL',
};

export const proposals_reducer: Reducer = (
  state: ProposalState,
  action: ReducerAction
): ProposalState => {
  const { type, data = {} } = action;
  switch (type) {
    case proposals_actions.GET_PROPOSAL:
      return {
        ...state,
        ...data,
      };
    default:
      return state;
  }
};
