import { updateTrackingQuestionParam } from '@make.org/utils/helpers/question';
import { Request, Response } from 'express';
import { createInitialState } from '@make.org/store/initialState';
import { getLanguageFromCountryCode } from '@make.org/utils/helpers/countries';
import {
  DEFAULT_COUNTRY,
  DEFAULT_LANGUAGE,
} from '@make.org/utils/constants/config';
import { getLoggerInstance } from '@make.org/utils/helpers/logger';
import { transformExtraSlidesConfigFromQuery } from '../helpers/query.helper';
import { reactRender } from '../reactRender';
import { QuestionService } from '../service/QuestionService';

export const mainRoute = async (
  req: Request,
  res: Response & { unsecure?: boolean; maintenance?: boolean }
): Promise<void | string> => {
  const { questionSlug, country, language } = req.query;
  const noIntroCard = true;
  const noPushProposal = false;
  const queryArray = Object.keys(req.query);
  const logger = getLoggerInstance();

  if (!queryArray || queryArray.length === 0) {
    // When widget is called without any param, it redirects to /mainteance without any log
    return res.redirect('/maintenance');
  }

  if (!questionSlug || !country) {
    logger.logWarning({
      message: `Missing mandatory parameters questionSlug : "${
        questionSlug || undefined
      }" and/or country : "${country || undefined}" on source : "${
        req.query.source
      }"`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });

    return res.redirect('/maintenance');
  }

  let languageFromCountry = DEFAULT_LANGUAGE;
  const formattedQuestionSlug = (questionSlug && questionSlug.toString()) || '';
  const formattedCountry = (country && country.toString()) || DEFAULT_COUNTRY;
  if (!language) {
    languageFromCountry = getLanguageFromCountryCode(formattedCountry);
  }
  const formattedLanguage = language && language.toString();
  const initialState = createInitialState();

  const notFound = () => {
    logger.logError({
      message: `Question not found on mainRoute questionSlug='${questionSlug}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
    return res.redirect('/maintenance');
  };
  const unexpectedError = () => {
    logger.logError({
      message: `Unexpected Error on mainRoute questionSlug='${questionSlug}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
    return res.redirect('/maintenance');
  };

  const question = await QuestionService.getQuestion(
    formattedQuestionSlug,
    formattedCountry,
    formattedLanguage || languageFromCountry,
    notFound,
    unexpectedError
  );

  if (res.maintenance || !question) {
    logger.logWarning({
      message: `Maintenance for "${
        questionSlug || undefined
      }" slug on source : "${req.query.source}"`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });

    return res.redirect('/maintenance');
  }

  if (res.unsecure) {
    logger.logWarning({
      message: `Unsecure widget for "${questionSlug}" on source : "${req.query.source}"`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });

    initialState.appConfig.unsecure = true;
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
