import { ProposalType } from './Proposal';
import { QuestionType } from './Question';
import { VoteType } from './Vote';

export type DemographicDataType = {
  label: string;
  value: string;
};

export type DemographicNameType = 'age' | 'region' | 'gender' | '';

export type DemographicsType = {
  ui: string;
  data: DemographicDataType[];
};

export type DemographicTrackType = {
  demographic: string;
  value: string;
  questionId: string;
  source: 'core';
  country: string;
  parameters: { [n: string]: string };
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
  votes: VoteType[];
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
  | NoProposalCardConfigType;

export type SequenceCardType = {
  type: string;
  configuration: SequenceCardConfigType;
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
