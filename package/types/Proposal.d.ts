import { QuestionType } from './Question';
import { OrganisationSoftType } from './Organisation';
import { VoteType } from './Vote';
import { TagType } from './Tag';

export type AuthorType = {
  firstName: string | null;
  displayName: string | null;
  organisationName: string | null;
  organisationSlug: string | null;
  postalCode: string | null;
  age: number | null;
  avatarUrl: string | null;
  userType: string;
};

export type ContextType = {
  operation: string;
  source: string;
  location: string;
  question: string;
  country: string;
  language: string;
  getParameters: Array<string>;
};

export type ProposalType = {
  id: string;
  userId: string;
  content: string;
  slug: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  votes: VoteType[];
  context: ContextType;
  trending: string;
  labels: any[]; // TO DELETE ?
  author: AuthorType;
  organisations: OrganisationSoftType[];
  themeId: string;
  tags: Partial<TagType>[];
  selectedStakeTag: Partial<TagType>;
  myProposal: boolean;
  idea: string;
  questionId: string;
  operationId: string;
  proposalKey: string;
  question: QuestionType;
};

export type ProposalsType = {
  total: number;
  seed?: number;
  results: ProposalType[];
};

export type ProposalAccumulator = {
  unique: ProposalType[];
  duplicates: ProposalType[];
  voted: ProposalType[];
};
