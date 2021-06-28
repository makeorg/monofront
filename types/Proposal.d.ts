export type Question = {
  questionId: string;
  slug: string;
  wording: {
    title: string;
    question: string;
  };
  countries: string;
  language: string;
  startDate: Date;
  endDate: Date;
};
export type Tag = {
  tagId: string;
  label: string;
  display: boolean;
};
export type Vote = {
  voteKey: string;
  count: number;
  qualifications: [
    {
      qualificationKey: string;
      count: number;
      hasQualified: boolean;
    }
  ];
  hasVoted: boolean;
};

export type Author = {
  firstName: string;
  displayName: string;
  organisationName: string;
  organisationSlug: string;
  postalCode: string;
  age: number;
  avatarUrl: string;
  userType: string;
};

export type ContextParameter = {
  key: string;
  value: string;
};
export type Language = {
  value: string;
};
export type Country = {
  value: string;
};
export type Context = {
  operation: string;
  source: string;
  location: string;
  question: string;
  country: Country;
  language: Language;
  getParameters: ContextParameter[];
};
export type Organisation = {
  organisationId: string;
  organisationName: string;
  organisationSlug: string;
};
export type Keyword = {
  key: {
    value: string;
  };
  label: string;
};
export type Proposal = {
  id: string;
  userId: string;
  content: string;
  slug: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  votes: Vote[];
  context: Context;
  trending: string;
  labels: [string];
  author: Author;
  organisations: Organisation[];
  tags: Tag[];
  selectedStakeTag: Tag[];
  myProposal: boolean;
  idea: string;
  question: Question;
  operationId: string;
  proposalKey: string;
  keywords: Keyword[];
};
