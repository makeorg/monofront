export type CustomerType = {
  id: string;
  slug: string;
  name: string;
};

export type EventType = {
  id: string;
  slug: string;
  customerId: string;
  language: string;
  name: string;
  introMediaUrl: string;
};

export type TermQueryType = {
  title: string;
  value: string;
};

export type GeneratedContentType = {
  title: string;
  subtitle: string;
  name: string;
  content: string;
  position: number;
};

export type FeedItemType = {
  id: string;
  type: string;
  question: string;
  content: string;
  links?: [];
};

export type AssemblyStateType = {
  customer: CustomerType;
  event: EventType;
  termQueries: TermQueryType[];
  generatedContents: GeneratedContentType[];
  feed: FeedItemType[];
};
