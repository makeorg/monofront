import { ProposalType } from '@make.org/types';
import { GET_ALL_PROPOSALS } from '../../actionTypes';

export const getAllProposals = (
  proposals: ProposalType[]
): {
  type: string;
  payload: ProposalType[];
} => ({
  type: GET_ALL_PROPOSALS,
  payload: proposals,
});
