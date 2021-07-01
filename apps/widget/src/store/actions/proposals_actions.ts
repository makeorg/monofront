import { ProposalType } from '@make.org/types';

export const proposals_actions = {
  GET_ALL_PROPOSALS: 'GET_ALL_PROPOSALS',
};

export const getAllProposals = (proposals: ProposalType[]): {
  type: string,
  data: ProposalType[]
} => ({
  type: proposals_actions.GET_ALL_PROPOSALS,
  data: proposals,
});
