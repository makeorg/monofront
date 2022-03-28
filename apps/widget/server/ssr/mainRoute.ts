import { updateTrackingQuestionParam } from '@make.org/utils/helpers/question';
import { Request, Response } from 'express';
import { createInitialState } from '@make.org/store/initialState';
import { getLanguageFromCountryCode } from '@make.org/utils/helpers/countries';
import {
  DEFAULT_COUNTRY,
  DEFAULT_LANGUAGE,
} from '@make.org/utils/constants/config';
import { getLoggerInstance } from '@make.org/utils/helpers/logger';
import { buildCards, getSequenceSize } from '@make.org/utils/helpers/sequence';
import { transformExtraSlidesConfigFromQuery } from '../helpers/query.helper';
import { reactRender } from '../reactRender';
import { QuestionService } from '../service/QuestionService';
import { FirstProposalService } from '../service/FirstProposalService';

export const mainRoute = async (
  req: Request,
  res: Response & { unsecure?: boolean; maintenance?: boolean }
): Promise<void | string> => {
  const { questionSlug, country, language, sequenceKind } = req.query;
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
  const formattedSequenceKind = sequenceKind && sequenceKind.toString();
  const initialState = createInitialState();

  const questionNotFound = () => {
    logger.logError({
      message: `Question not found on mainRoute questionSlug='${questionSlug}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };
  const questionUnexpectedError = () => {
    logger.logError({
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
    questionNotFound,
    questionUnexpectedError
  );

  const firstNotFound = () => {
    logger.logError({
      message: `FirstProposal not found on mainRoute questionSlug='${questionSlug}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };
  const firstProposalUnexpectecError = () => {
    logger.logError({
      message: `Unexpected Error on mainRoute for first proposal fetch with question='${
        question && question.questionId
      }' `,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };

  if (res.maintenance) {
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

  if (!question) {
    return res.redirect('/maintenance');
  }

  const { questionId } = question;
  const formattedQuestionId = (questionId && questionId.toString()) || '';

  const firstProposal = await FirstProposalService.getFirstProposal(
    formattedQuestionId,
    formattedCountry,
    formattedLanguage || languageFromCountry,
    firstNotFound,
    firstProposalUnexpectecError,
    formattedSequenceKind
  );

  if (!firstProposal) {
    return res.redirect('/maintenance');
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

  const cards = buildCards(
    [firstProposal.data.proposal],
    questionModified.sequenceConfig,
    questionModified.canPropose,
    true,
    false,
    false,
    undefined
  );
  const sequenceSize = getSequenceSize(
    firstProposal.data.sequenceSize,
    questionModified.sequenceConfig,
    questionModified.canPropose,
    questionModified.hasDemographics,
    false
  );

  initialState.currentQuestion = formattedQuestionSlug;
  initialState.questions = {
    [formattedQuestionSlug]: {
      question: questionModified,
    },
  };
  initialState.sequence = {
    ...initialState.sequence,
    isLoading: false,
    cards,
    proposals: [firstProposal.data.proposal],
    loadFirstProposal: true,
    sequenceSize,
    sequenceKind: formattedSequenceKind,
  };
  initialState.session = {
    ...initialState.session,
    sessionId: firstProposal.sessionId,
  };

  updateTrackingQuestionParam(questionModified);

  return reactRender(req, res, initialState);
};
