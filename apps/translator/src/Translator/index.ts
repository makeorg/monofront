import {
  TranslationError,
  TranslatorProvider,
} from './TranslatorProvider/types';
import { deeplProvider } from './TranslatorProvider/DeeplProvider';
import { chatGPTProvider } from './TranslatorProvider/ChatGPTProvider';
import {
  SupportedLanguages,
  TranslationResult,
  SupportedLanguagesByProvider,
  MultiTranslationDemand,
} from '../Types/types';

const providers: TranslatorProvider[] = [deeplProvider, chatGPTProvider];

export const translate = async (
  demand: MultiTranslationDemand
): Promise<TranslationResult[]> => {
  const errors: TranslationError[] = [];
  const { sourceLanguage, text, targetLanguages } = demand;
  const targetLanguagesSet = new Set(targetLanguages);
  targetLanguagesSet.delete(sourceLanguage);

  const getResult = async (targetLanguage: string) => {
    const translationResultFromProvider: TranslationResult[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const provider of providers) {
      try {
        if (!translationResultFromProvider.length) {
          // eslint-disable-next-line no-await-in-loop
          const result = await provider.translate({
            sourceLanguage,
            text,
            targetLanguage,
          });
          translationResultFromProvider.push(result);
        }
      } catch (error) {
        errors.push(error as TranslationError);
      }
    }

    const result = translationResultFromProvider.pop();
    if (!result) {
      throw errors;
    }

    return result;
  };

  return Promise.all(
    [...targetLanguagesSet].map(targetLanguage => getResult(targetLanguage))
  );
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
