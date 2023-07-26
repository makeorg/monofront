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
  demographics: DemographicDataType[];
  length: number;
  sessionBindingMode: boolean;
};

export type FirstProposalSequenceType = {
  proposal: ProposalType;
  sequenceSize: number;
};

export type ExecuteStartSequence = (
  questionId: string,
  votedIds: string[],
  preferredLanguage: string,
  demographicsCardId: string | null,
  token: string | null
) => Promise<SequenceType | null>;

export type FetchFirstProposalType = (
  questionId: string
) => Promise<SequenceType | null>;
