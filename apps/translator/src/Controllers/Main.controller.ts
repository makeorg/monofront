import { Request, Response } from 'express';
import { getLoggerInstance } from '@make.org/logger/';
import { translate, supportedLanguages } from '../Translator';
import { TranslationError } from '../Translator/TranslatorProvider/types';
import {
  SupportedLanguagesByProvider,
  TranslationDemand,
  TranslationResult,
} from '../Types/types';

export const postTranslate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const translationDemand: TranslationDemand = req.body;

  try {
    const translation: TranslationResult = await translate(translationDemand);

    getLoggerInstance().logInfo({
      name: 'translation-success',
      message: 'Translation success',
      app_provider: translation.provider,
      app_content_words: translationDemand.text.split(' ').length,
      app_content_char: translationDemand.text.length,
      app_user_email: res.locals.user.email,
    });

    return res.json(translation).status(200).send();
  } catch (errors) {
    const translationErrors = errors as TranslationError[];
    const lastError = translationErrors.at(-1);

    return res.status(lastError?.statusCode || 500).json({
      errors: translationErrors,
    });
  }
};

export const getSupportedLanguages = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const supportedLanguagesByProvider: SupportedLanguagesByProvider[] =
    await supportedLanguages();

  return res.json(supportedLanguagesByProvider).status(200).send();
};
