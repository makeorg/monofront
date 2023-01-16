import { DemographicDataType } from '.';
import { ProposalType } from './Proposal';

export type ConsultationType = {
  presentation: string;
  logo: string;
};

export type SequenceType = {
  proposals: ProposalType[];
  label?: string;
  key?: string;
  demographics?: DemographicDataType;
  length: number;
};

export type FirstProposalSequenceType = {
  proposal: ProposalType;
  sequenceSize: number;
};

export type ExecuteStartSequence = (
  questionId: string,
  votedIds: string[],
  preferredLanguage: string,
  demographicsCardId?: string,
  token?: string
) => Promise<SequenceType | null>;

export type FetchFirstProposalType = (
  questionId: string
) => Promise<SequenceType | null>;
