import { LanguageType } from './enums';

export type CustomerType = {
  id: string;
  slug: string;
  name: string;
};

export type LinksType = {
  label: string;
  url: string;
};

export type DocumentSourceType = {
  name: string;
  type: 'AUDIO' | 'VIDEO' | 'PDF';
  title: string;
  url: string;
};

export type EventType = {
  id: string;
  slug: string;
  customerId: string;
  language: keyof typeof LanguageType;
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

export type FeedType = {
  isStreaming: boolean;
  items: FeedItemType[];
};

export type SourceAnswerType = {
  source_title: string;
  source_url: string;
  source_page: string;
  source_speech_time: string;
};

export type FeedItemType = {
  id: string;
  question: string;
  text: string;
  chunks?: ChunkType[];
  mode: string;
  language: string;
  displayActions?: boolean;
  sources?: SourceAnswerType;
};

export type EventRouteType = {
  customer: CustomerType;
  event: EventType;
  termQueries: TermQueryType[] | [];
  generatedContents: GeneratedContentType[] | [];
  documentSources: DocumentSourceType[] | [];
};

export type AssemblyStateType = {
  feed: FeedType;
  language: keyof typeof LanguageType;
  visitorId: string;
  sessionId: string;
};

export type AssemblyGlobalStateType = AssemblyStateType & EventRouteType;
