import { Request, Response } from 'express';
import {
  DEFAULT_LANGUAGE,
  DEFAULT_COUNTRY,
} from '@make.org/utils/constants/config';
import { ServerLogger } from '@make.org/logger/serverLogger';
import { QuestionService } from '../server/service/QuestionService';

export const redirectToCountryMiddleware = async (
  req: Request,
  res: Response
): Promise<void> => {
  const xDetectedCountry = req.headers['x-detected-country'] as string;
  const { questionSlug, language } = req.params;
  const oldUrl = req.originalUrl;
  const formattedQuestionSlug = (questionSlug && questionSlug.toString()) || '';
  const formattedCountry = xDetectedCountry || DEFAULT_COUNTRY;
  const formattedLanguage = language && language.toString();

  const questionNotFound = () => {
    ServerLogger.getInstance().logWarning({
      message: `Question not found on redirect middleware questionSlug='${formattedQuestionSlug}'`,
      name: 'server-side',
      app_detected_country: formattedCountry,
      app_language: formattedLanguage,
      app_url: req.url,
      app_query: req.query,
    });
  };
  const questionUnexpectedError = () => {
    ServerLogger.getInstance().logError({
      message: `Unexpected Error on redirect middleware questionSlug='${formattedQuestionSlug}'`,
      name: 'server-side',
      app_detected_country: formattedCountry,
      app_language: formattedLanguage,
      app_url: req.url,
      app_query: req.query,
    });
  };

  const question = await QuestionService.getQuestion(
    formattedQuestionSlug,
    formattedCountry,
    questionNotFound,
    questionUnexpectedError,
    formattedLanguage || DEFAULT_LANGUAGE
  );

  if (question && question.countries.includes(formattedCountry)) {
    return res.redirect(`/${formattedCountry}${oldUrl}`);
  }

  return res.redirect(`/${formattedCountry}`);
};
