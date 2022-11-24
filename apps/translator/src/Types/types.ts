import { Application } from 'express';

export type RoutesInput = {
  app: Application;
};

export type TranslationDemand = {
  sourceLanguage: string;
  text: string;
  targetLanguage: string;
};

export type TranslationResult = {
  text: string;
  language: string;
  provider: string;
};

export type SupportedLanguages = {
  source: string[];
  target: string[];
};

export type SupportedLanguagesByProvider = {
  provider: string;
  supportedLanguages: SupportedLanguages;
};

declare module 'express-serve-static-core' {
  interface Request {
    requestId: string;
    token: string;
  }
}
