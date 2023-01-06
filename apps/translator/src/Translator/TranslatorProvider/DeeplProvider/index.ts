import { getLoggerInstance } from '@make.org/logger/';
import axios, { AxiosError, AxiosResponse } from 'axios';
import querystring from 'querystring';
import { LanguageError, TranslationError, TranslatorProvider } from '../types';
import {
  SupportedLanguages,
  TranslationDemand,
  TranslationResult,
} from '../../../Types/types';
import { env } from '../../../env';

const deeplTranslatePath = '/translate';
const deeplLanguagesPath = '/languages';

type requestDeepl = {
  source_lang?: string;
  target_lang: string;
  text: string;
  split_sentences: 0 | 1;
  preserve_formatting?: 0 | 1;
};

type responseTranslationDeepl = {
  detected_source_language?: string;
  text: string;
};
type responseDeepl = {
  translations: responseTranslationDeepl[];
};
type responseLanguagesDeepl = {
  language: string;
  name: string;
  supports_formality: boolean;
}[];

const providerName = 'deepL';
let supportedLanguagesCache: SupportedLanguages;

export const deeplProvider: TranslatorProvider = {
  providerName,
  translate: async (demand: TranslationDemand): Promise<TranslationResult> => {
    const requestData: requestDeepl = {
      source_lang: demand.sourceLanguage,
      target_lang: demand.targetLanguage,
      text: demand.text,
      split_sentences: 0,
      preserve_formatting: 0,
    };

    try {
      const response: AxiosResponse = await axios({
        method: 'POST',
        url: `${env.deeplUrl()}${deeplTranslatePath}`,
        data: querystring.stringify(requestData),
        headers: {
          Authorization: `DeepL-Auth-Key ${env.deeplKey()}`,
          'content-type': 'application/x-www-form-urlencoded',
        },
      });

      const deeplTranslations = response?.data as responseDeepl;
      const deeplTranslation = deeplTranslations.translations[0];

      const translationResult: TranslationResult = {
        text: deeplTranslation.text,
        language: demand.targetLanguage,
        provider: providerName,
      };

      return translationResult;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const { message } = axiosError;

      getLoggerInstance().logError({
        name: 'deepl-provider',
        message,
        app_request_data: {
          data: demand,
        },
        app_response_data: axiosError?.response?.data,
      });
      const translationError: TranslationError = {
        ...demand,
        provider: providerName,
        name: 'External service error',
        message: axiosError.message,
        data: axiosError?.response?.data,
        statusCode: axiosError?.response?.status,
      };

      throw translationError;
    }
  },
  supportedLanguages: async () => {
    if (supportedLanguagesCache) {
      return supportedLanguagesCache;
    }
    try {
      const responseSource: Promise<AxiosResponse> = axios({
        method: 'GET',
        url: `${env.deeplUrl()}${deeplLanguagesPath}?type=source`,
        headers: {
          Authorization: `DeepL-Auth-Key ${env.deeplKey()}`,
        },
      });
      const responseTarget: Promise<AxiosResponse> = axios({
        method: 'GET',
        url: `${env.deeplUrl()}${deeplLanguagesPath}?type=target`,
        headers: {
          Authorization: `DeepL-Auth-Key ${env.deeplKey()}`,
        },
      });

      const responses = await Promise.all([responseSource, responseTarget]);

      const sourceLanguages = responses[0]?.data as responseLanguagesDeepl;
      const targetLanguages = responses[1]?.data as responseLanguagesDeepl;

      const languagesResult: SupportedLanguages = {
        source: sourceLanguages.map(o => o.language),
        target: targetLanguages.map(o => o.language),
      };

      getLoggerInstance().logInfo({
        name: 'deepl-provider',
        message: 'Init supported languages cache',
        app_languages: languagesResult,
      });

      supportedLanguagesCache = languagesResult;

      return supportedLanguagesCache;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const { message } = axiosError;
      getLoggerInstance().logError({
        name: 'deepl-provider',
        message,
        app_response_data: axiosError?.response?.data,
      });

      const languageError: LanguageError = {
        provider: providerName,
        name: 'External service error',
        message: axiosError.message,
        data: axiosError?.response?.data,
        statusCode: axiosError?.response?.status,
      };

      throw languageError;
    }
  },
};
