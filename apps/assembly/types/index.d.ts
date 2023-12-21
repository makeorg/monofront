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
  mode: string;
};

export type TranscriptMetadataType = {
  description: string;
  session: string;
  sourceType: string;
  speaker: string;
  speakerGroup: string;
  time: string;
  transcriptId: string;
  transcriptTitle: string;
  youtubeId: string;
};

export type DocumentMetadataType = {
  documentId: string;
  documentTitle: string;
  documentURL: string;
  page: number;
  sourceType: string;
};

export type ChunkType = {
  pageContent: string;
  metadata: TranscriptMetadataType | DocumentMetadataType;
};

export type FeedItemType = {
  id: string;
  question: string;
  text: string;
  mode?: string;
  chunks?: ChunkType[];
};

export enum SourceType {
  transcript = 'transcript',
  document = 'document',
}

export type AssemblyStateType = {
  customer: CustomerType;
  event: EventType;
  termQueries: TermQueryType[];
  generatedContents: GeneratedContentType[];
  feed: FeedItemType[];
};
