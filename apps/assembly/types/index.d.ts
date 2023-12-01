export type EventType = {
  id: string;
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

export type AssemblyStateType = {
  event?: EventType;
  termQueries?: TermQueryType[];
  generatedContents?: GeneratedContentType[];
};
