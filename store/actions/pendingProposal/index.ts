import { ReducerAction } from '@make.org/types';
import {
  PROPOSAL_CLEAR_PENDING,
  PROPOSAL_INIT_PENDING,
  PROPOSAL_REGISTER_STEP,
} from '../../actionTypes';

export const initProposalPending = (
  pendingProposal: string
): ReducerAction => ({
  type: PROPOSAL_INIT_PENDING,
  payload: {
    pendingProposal,
  },
});

export const clearProposalPending = (): ReducerAction => ({
  type: PROPOSAL_CLEAR_PENDING,
});

export const setRegisterStep = (registerStep: number): ReducerAction => ({
  type: PROPOSAL_REGISTER_STEP,
  payload: registerStep,
});
