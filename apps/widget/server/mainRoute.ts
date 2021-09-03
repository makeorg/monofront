import { updateTrackingQuestionParam } from '@make.org/utils/helpers/question';
import { Request, Response } from 'express';
import { createInitialState } from '@make.org/store/initialState';
import { getLanguageFromCountryCode } from '@make.org/utils/helpers/countries';
import {
  DEFAULT_COUNTRY,
  DEFAULT_LANGUAGE,
} from '@make.org/utils/constants/config';
import { transformExtraSlidesConfigFromQuery } from './helpers/query.helper';
import { reactRender } from './reactRender';
import { QuestionService } from './service/QuestionService';
import { logError, logWarning } from './helpers/ssr.helper';

export const mainRoute = async (
  req: Request,
  res: Response & { unsecure?: boolean }
): Promise<void | string> => {
  const {
    questionSlug = '',
    country = DEFAULT_COUNTRY,
    language = DEFAULT_LANGUAGE,
  } = req.query;
  const noIntroCard = true;
  const noPushProposal = false;

  let languageFromCountry = DEFAULT_LANGUAGE;
  const formattedQuestionSlug = questionSlug.toString();
  const formattedCountry = country.toString();
  if (!language) {
    languageFromCountry = getLanguageFromCountryCode(formattedCountry);
  }
  const formattedLanguage = language.toString();
  const initialState = createInitialState();

  const notFound = () => {
    logError({
      message: `Question not found on mainRoute questionSlug='${questionSlug}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };
  const unexpectedError = () => {
    logError({
      message: `Unexpected Error on mainRoute questionSlug='${questionSlug}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };

  const question = await QuestionService.getQuestion(
    formattedQuestionSlug,
    formattedCountry,
    formattedLanguage || languageFromCountry,
    notFound,
    unexpectedError
  );

  if (!question) {
    initialState.appConfig.maintenance = true;
    return reactRender(req, res, initialState);
  }

  if (res.unsecure) {
    initialState.appConfig.unsecure = true;
    logWarning({
      message: `Unsecure widget for "${questionSlug}" on source : "${req.query.source}"`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  }

  const { sequenceConfig } = question;
  const questionModified = {
    ...question,
    sequenceConfig: transformExtraSlidesConfigFromQuery(
      sequenceConfig,
      noIntroCard,
      noPushProposal
    ),
  };

  initialState.currentQuestion = formattedQuestionSlug;
  initialState.questions = {
    [formattedQuestionSlug]: {
      question: questionModified,
    },
  };
  updateTrackingQuestionParam(questionModified);

  return reactRender(req, res, initialState);
};
