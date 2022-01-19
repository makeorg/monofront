import { Reducer, StatePendingProposal, ReducerAction } from '@make.org/types';
import {
  PROPOSAL_CLEAR_PENDING,
  PROPOSAL_INIT_PENDING,
  PROPOSAL_MODIFY_PENDING,
  PROPOSAL_SET_STEP,
  PROPOSAL_RESET_STEP,
} from '../../actionTypes';

export const pendingProposal_state: StatePendingProposal = {
  proposalContent: undefined,
  authMode: {
    enable: false,
  },
};

export const pendingProposal_reducer: Reducer = (
  state = pendingProposal_state,
  action: ReducerAction
): StatePendingProposal => {
  switch (action.type) {
    case PROPOSAL_INIT_PENDING:
      return {
        ...state,
        proposalContent: action.payload.proposalContent,
        firstname: action.payload.firstname,
        authMode: action.payload.authMode,
      };
    case PROPOSAL_CLEAR_PENDING:
      return {
        ...pendingProposal_state,
      };
    case PROPOSAL_MODIFY_PENDING:
      return {
        ...state,
        authMode: { enable: false },
      };
    case PROPOSAL_SET_STEP:
      return {
        ...state,
        authMode: { ...state.authMode, step: action.payload.authMode.step },
      };
    case PROPOSAL_RESET_STEP:
      return {
        ...state,
        authMode: { enable: true },
      };
    default:
      return state;
  }
};
