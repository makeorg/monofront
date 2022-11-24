import {
  SupportedLanguages,
  TranslationDemand,
  TranslationResult,
} from '../../Types/types';

export interface TranslationError extends Error {
  provider: string;
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
  statusCode?: number;
  data?: unknown;
}
export interface LanguageError extends Error {
  provider: string;
  statusCode?: number;
  data?: unknown;
}

export interface TranslatorProvider {
  providerName: string;
  translate: (
    translationDemand: TranslationDemand
  ) => Promise<TranslationResult>;
  supportedLanguages: () => Promise<SupportedLanguages>;
}
