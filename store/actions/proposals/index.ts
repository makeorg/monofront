import { ProposalType, ReducerAction } from '@make.org/types';
import { GET_ALL_PROPOSALS } from '../../actionTypes';

export const getAllProposals = (proposals: ProposalType[]): ReducerAction => ({
  type: GET_ALL_PROPOSALS,
  payload: proposals,
});
