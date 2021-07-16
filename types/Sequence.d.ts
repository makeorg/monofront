import { ProposalType } from './Proposal';

export type ConsultationType = {
  presentation: string;
  logo: string;
};

export type SequenceType = {
  id: string;
  proposals: ProposalType[];
};

export type KeywordSequenceType = {
  proposals: ProposalType[];
  label: string;
  key: string;
};
