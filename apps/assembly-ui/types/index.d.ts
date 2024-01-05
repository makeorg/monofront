export type CustomerType = {
  id: string;
  slug: string;
  name: string;
};

export type LinksType = {
  label: string;
  url: string;
};

export type EventType = {
  id: string;
  slug: string;
  customerId: string;
  language: string;
  name: string;
  introMediaUrl: string;
  introduction: string;
  links: LinksType[];
  logoUrl: string;
};

export type TermQueryType = {
  title: string;
  value: string;
  type: 'THEME' | 'SUGGESTION';
};

export type GeneratedContentType = {
  title: string;
  subtitle: string;
  name: string;
  content: string;
  position: number;
  mode: string;
};

export type ChunkType = {
  document_source_title: string;
  document_source_url: string;
  document_source_metadata: Record<string, string>;
  document_source_type: 'AUDIO' | 'VIDEO' | 'PDF';
  page_number?: string;
  speech_time?: string;
  speaker_name?: string;
  speaker_role?: string;
  speaker_gender?: string;
};

export type StreamType = {
  isSubmitted: boolean;
  stopStreaming: boolean;
};

export type FeedItemType = {
  id: string;
  question: string;
  text: string;
  chunks?: ChunkType[];
  mode: string;
  language: string;
};

export type AssemblyStateType = {
  customer: CustomerType;
  event: EventType;
  termQueries: TermQueryType[];
  generatedContents: GeneratedContentType[];
  feed: FeedItemType[];
  stream: StreamType;
};
