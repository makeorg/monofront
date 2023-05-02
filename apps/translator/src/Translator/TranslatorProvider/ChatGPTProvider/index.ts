import { getLoggerInstance } from '@make.org/logger/';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { TranslationError, TranslatorProvider } from '../types';
import {
  SupportedLanguages,
  TranslationDemand,
  TranslationResult,
} from '../../../Types/types';
import { env } from '../../../env';

type chatGPTChoices = {
  index: number;
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
};

type responseTranslationChatGPT = {
  id: string;
  object: string;
  created: number;
  choices: chatGPTChoices[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

const providerName = 'chatGPT';
const chatGPTCompletionsPath = '/chat/completions';
const GPTModel = 'gpt-3.5-turbo';

const AvailableLanguages: string[] = [
  'az',
  'be',
  'bg',
  'bn',
  'bs',
  'cs',
  'da',
  'de',
  'el',
  'en',
  'es',
  'eo',
  'et',
  'fa',
  'fi',
  'fj',
  'fo',
  'fr',
  'he',
  'hi',
  'hr',
  'hu',
  'hy',
  'id',
  'is',
  'it',
  'ja',
  'jv',
  'ka',
  'kk',
  'km',
  'ko',
  'lo',
  'lt',
  'lv',
  'mg',
  'mk',
  'mn',
  'mo',
  'nl',
  'no',
  'pa',
  'pl',
  'pt',
  'ro',
  'ru',
  'sa',
  'sk',
  'sl',
  'so',
  'sr',
  'su',
  'sv',
  'sw',
  'sq',
  'ta',
  'tg',
  'th',
  'tk',
  'tr',
  'uk',
  'uz',
  'vi',
  'wo',
  'zh',
];

const GPTSupportedLanguages: SupportedLanguages = {
  source: AvailableLanguages,
  target: AvailableLanguages,
};

export const chatGPTProvider: TranslatorProvider = {
  providerName,
  translate: async (demand: TranslationDemand): Promise<TranslationResult> => {
    try {
      const response: AxiosResponse = await axios({
        method: 'POST',
        url: `${env.chatGPTUrl()}${chatGPTCompletionsPath}`,
        data: {
          model: GPTModel,
          messages: [
            {
              role: 'user',
              content: `Translate from language ISO 639-1 code: ${demand.sourceLanguage} to language ISO 639-1 code: ${demand.targetLanguage} the following text: ${demand.text}`,
            },
          ],
        },
        headers: {
          Authorization: `Bearer ${env.chatGPTKey()}`,
          'OpenAI-Organization': env.chatGPTOrgId(),
          'Content-Type': 'application/json',
        },
      });

      const chatGPTTranslations = response?.data as responseTranslationChatGPT;
      const { content } = chatGPTTranslations.choices[0].message;

      const translationResult: TranslationResult = {
        text: content,
        language: demand.targetLanguage,
        provider: providerName,
      };

      return translationResult;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const { message } = axiosError;

      getLoggerInstance().logError({
        name: 'chatgpt-provider',
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
  supportedLanguages: async () => GPTSupportedLanguages,
};
