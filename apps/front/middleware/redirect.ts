import { Request, Response } from 'express';
import {
  DEFAULT_LANGUAGE,
  DEFAULT_COUNTRY,
} from '@make.org/utils/constants/config';
import { getLoggerInstance } from '@make.org/utils/helpers/logger';
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
    getLoggerInstance().logError({
      message: `Question not found on redirect middleware questionSlug='${questionSlug}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };
  const questionUnexpectedError = () => {
    getLoggerInstance().logError({
      message: `Unexpected Error on redirect middleware questionSlug='${questionSlug}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };

  const question = await QuestionService.getQuestion(
    formattedQuestionSlug,
    formattedCountry,
    formattedLanguage || DEFAULT_LANGUAGE,
    questionNotFound,
    questionUnexpectedError
  );

  if (question && question.countries.includes(formattedCountry)) {
    return res.redirect(`/${formattedCountry}${oldUrl}`);
  }

  return res.redirect(`/${formattedCountry}`);
};
