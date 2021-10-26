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
};

export type ExecuteStartSequence = (
  questionId: string,
  votedIds: string[],
  demographicsCardId?: string,
  token?: string
) => Promise<SequenceType | null>;
