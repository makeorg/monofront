import { Reducer, StatePendingProposal, ReducerAction } from '@make.org/types';
import {
  PROPOSAL_CLEAR_PENDING,
  PROPOSAL_INIT_PENDING,
  PROPOSAL_REGISTER_STEP,
  PROPOSAL_PENDING_SOURCE,
} from '../../actionTypes';

export const pendingProposal_state: StatePendingProposal = {
  pendingProposal: undefined,
  registerStep: 1,
  source: '',
};

export const pendingProposal_reducer: Reducer = (
  // eslint-disable-next-line default-param-last
  state = pendingProposal_state,
  action: ReducerAction
): StatePendingProposal => {
  switch (action.type) {
    case PROPOSAL_INIT_PENDING:
      return {
        ...state,
        pendingProposal: action.payload.pendingProposal,
        firstname: action.payload.firstname,
      };
    case PROPOSAL_PENDING_SOURCE:
      return {
        ...pendingProposal_state,
        source: action.payload,
      };
    case PROPOSAL_CLEAR_PENDING:
      return {
        ...pendingProposal_state,
      };
    case PROPOSAL_REGISTER_STEP:
      return {
        ...state,
        registerStep: action.payload,
      };
    default:
      return state;
  }
};
