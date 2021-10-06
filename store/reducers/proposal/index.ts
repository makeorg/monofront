import { ProposalActionType, Reducer, StateProposal } from '@make.org/types';
import * as actionTypes from '../../actionTypes';

export const proposal_state: StateProposal = {
  popularProposals: [],
  error: undefined,
  data: undefined,
};

export const proposal_reducer: Reducer = (
  state = proposal_state,
  action: ProposalActionType
): StateProposal => {
  switch (action.type) {
    case actionTypes.PROPOSAL_LOAD:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
