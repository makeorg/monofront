import { ProposalType } from './Proposal';

type ProposalLoadActionType = {
  type: 'PROPOSAL_LOAD';
  payload: ProposalType;
};
type ProposalProposeSuccessActionType = {
  type: 'PROPOSAL_PROPOSE_SUCCESS';
  payload: string;
};

export type ProposalActionType =
  | ProposalLoadActionType
  | ProposalProposeSuccessActionType;
