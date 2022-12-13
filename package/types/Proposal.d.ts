import { ProposalQuestionType } from './Question';
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
  questionLanguage: string;
  proposalLanguage: string;
  clientLanguage: string;
  getParameters: Array<string>;
};

export type ProposalQuestionType = {
  questionId: string;
  slug: string;
  wording: {
    title: string;
    question: string;
  };
  preferedLanguage: string;
  returnedLanguage: string;
  countries: Array<string>;
  languages: Array<string>;
  startDate: string;
  endDate: string;
};

export type ProposalKeywordsType = {
  key: string;
  label: string;
};

export type ProposalType = {
  id: string;
  userId: string;
  content: string;
  contentLanguage: string;
  translatedContent: string;
  translatedLanguage: string;
  slug: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  votes: VoteType[];
  context: ContextType;
  author: AuthorType;
  organisations: OrganisationSoftType[];
  tags: Partial<TagType>[];
  selectedStakeTag: Partial<TagType>;
  myProposal: boolean;
  idea: string;
  question: ProposalQuestionType;
  operationId: string;
  proposalKey: string;
  keywords: ProposalKeywords[];
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
