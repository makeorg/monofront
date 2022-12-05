import { updateTrackingQuestionParam } from '@make.org/utils/helpers/question';
import { Request, Response } from 'express';
import { createInitialState } from '@make.org/store/initialState';
import { isInProgress } from '@make.org/utils/helpers/date';
import { getLoggerInstance } from '@make.org/utils/helpers/logger';
import { transformExtraSlidesConfigFromQuery } from './helpers/query.helper';
import { reactRender } from '../reactRender';
import { QuestionService } from '../service/QuestionService';

export const sequenceRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { questionSlug, country, language } = req.params;
  const { introCard } = req.query;
  const { pushProposal } = req.query;
  const noIntroCard = introCard === (false || 'false');
  const noPushProposal = pushProposal === (false || 'false');

  const initialState = createInitialState();
  const logger = getLoggerInstance();

  const notFound = () => {
    logger.logError({
      message: `Question not found on sequenceRoute questionSlug='${questionSlug}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };
  const unexpectedError = () => {
    logger.logError({
      message: `Unexpected Error on sequenceRoute questionSlug='${questionSlug}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };

  const question = await QuestionService.getQuestion(
    questionSlug,
    country,
    notFound,
    unexpectedError,
    language
  );

  if (!question) {
    return reactRender(req, res.status(404), initialState);
  }

  if (!isInProgress(question) && !question.displayResults) {
    return res.redirect(question.aboutUrl);
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

  initialState.currentQuestion = questionSlug;
  initialState.questions = {
    [questionSlug]: {
      question: questionModified,
    },
  };
  updateTrackingQuestionParam(questionModified);

  return reactRender(req, res, initialState);
};
