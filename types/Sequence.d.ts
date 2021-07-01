import { ProposalType } from './Proposal';

export type ConsultationType = {
  presentation: string
  logo: string
};

export type SequenceType = {
  id: string
  proposals: ProposalType[]
};
