import {
  TranslationError,
  TranslatorProvider,
} from './TranslatorProvider/types';
import { deeplProvider } from './TranslatorProvider/DeeplProvider';
import {
  SupportedLanguages,
  TranslationDemand,
  TranslationResult,
  SupportedLanguagesByProvider,
} from '../Types/types';

const providers: TranslatorProvider[] = [deeplProvider];

export const translate = async (
  demand: TranslationDemand
): Promise<TranslationResult> => {
  const errors: TranslationError[] = [];
  const translationResult: TranslationResult[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const provider of providers) {
    try {
      if (!translationResult.length) {
        // eslint-disable-next-line no-await-in-loop
        const result = await provider.translate(demand);
        translationResult.push(result);
      }
    } catch (error) {
      errors.push(error as TranslationError);
    }
  }

  const result = translationResult.at(0);
  if (!result) {
    throw errors;
  }

  return result;
};

export const supportedLanguages = async (): Promise<
  SupportedLanguagesByProvider[]
> => {
  const supportedLanguagesByProvider: {
    provider: string;
    supportedLanguages: SupportedLanguages;
  }[] = [];
  const errors: Error[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const provider of providers) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const languages = await provider.supportedLanguages();
      supportedLanguagesByProvider.push({
        provider: provider.providerName,
        supportedLanguages: languages,
      });
    } catch (error) {
      errors.push(error as Error);
    }
  }

  if (!supportedLanguagesByProvider.length) {
    Promise.reject(errors);
  }

  return supportedLanguagesByProvider;
};
