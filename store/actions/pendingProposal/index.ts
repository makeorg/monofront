import { ReducerAction } from '@make.org/types';
import {
  PROPOSAL_CLEAR_PENDING,
  PROPOSAL_INIT_PENDING,
  PROPOSAL_MODIFY_PENDING,
  PROPOSAL_SET_STEP,
  PROPOSAL_RESET_STEP,
} from '../../actionTypes';

export const initProposalPending = (
  proposalContent: string
): ReducerAction => ({
  type: PROPOSAL_INIT_PENDING,
  payload: {
    proposalContent,
    authMode: {
      enable: true,
    },
  },
});

export const clearProposalPending = (): ReducerAction => ({
  type: PROPOSAL_CLEAR_PENDING,
});

export const modifyProposalPending = (): ReducerAction => ({
  type: PROPOSAL_MODIFY_PENDING,
});

export const setProposalAuthStep = (step: string): ReducerAction => ({
  type: PROPOSAL_SET_STEP,
  payload: {
    authMode: {
      step,
    },
  },
});

export const resetProposalAuthStep = (): ReducerAction => ({
  type: PROPOSAL_RESET_STEP,
});
