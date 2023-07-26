import { ProposalType } from './Proposal';
import { QuestionType } from './Question';
import { VoteType } from './Vote';

export type DemographicParameterType = {
  label: string;
  value: string;
};

export type DemographicDataType = {
  id: string;
  name: string;
  layout: 'OneColumnRadio' | 'Select' | 'ThreeColumnsRadio';
  title: string;
  parameters: DemographicParameterType[];
  token: string;
};

export type PartnerItemType = {
  name: string;
  imageUrl: string;
};

export type IntroCardConfigType = {
  enabled: boolean;
  title?: string;
  description?: string;
};

export type PushProposalCardConfigType = {
  enabled: boolean;
};

export type ProposalCardConfigType = {
  proposal: ProposalType;
};

export type NoProposalCardConfigType = {
  title: string;
  description: string;
};

export type ProposalCardStateType = {
  votes: VoteType[] | [];
};

export type ProposalCardType = {
  type: string;
  configuration: ProposalCardConfigType;
  state: ProposalCardStateType;
  index: number;
};

export type SequenceCardConfigType =
  | IntroCardConfigType
  | PushProposalCardConfigType
  | ProposalCardConfigType
  | NoProposalCardConfigType
  | DemographicDataType;

export type SequenceCardType = {
  type: string;
  configuration?: SequenceCardConfigType;
  state: ProposalCardStateType;
  index: number;
};

export type ProposalListCardType = {
  type: string;
  proposal: ProposalType;
};

export type TopProposalListCardType = {
  type: string;
  question: QuestionType;
};

export type NoProposalCardType = {
  type: string;
  configuration: NoProposalCardConfigType;
  index: number;
};
