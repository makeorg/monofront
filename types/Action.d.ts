import { ProposalType } from './Proposal';

type ProposalLoadActionType = {
  type: 'PROPOSAL_LOAD';
  payload: ProposalType;
};

export type ProposalActionType = ProposalLoadActionType;
