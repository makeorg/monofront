import { ReducerAction } from '@make.org/types';
import {
  PROPOSAL_CLEAR_PENDING,
  PROPOSAL_INIT_PENDING,
  PROPOSAL_REGISTER_STEP,
  PROPOSAL_PENDING_SOURCE,
  PROPOSAL_DISABLE_ANONYMOUS,
  PROPOSAL_ENABLE_ANONYMOUS,
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

export const setProposalSource = (proposalSource: string): ReducerAction => ({
  type: PROPOSAL_PENDING_SOURCE,
  payload: proposalSource,
});

export const enableProposalAnonymous = (): ReducerAction => ({
  type: PROPOSAL_ENABLE_ANONYMOUS,
});

export const disableProposalAnonymous = (): ReducerAction => ({
  type: PROPOSAL_DISABLE_ANONYMOUS,
});
