import { Request, Response } from 'express';
import { createInitialState } from '@make.org/store/initialState';
import { updateTrackingQuestionParam } from '@make.org/utils/helpers/question';
import { isInProgress } from '@make.org/utils/helpers/date';
import { ServerLogger } from '@make.org/logger/serverLogger';
import { reactRender } from '../reactRender';
import { QuestionService } from '../service/QuestionService';

export const questionRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { questionSlug, country, language } = req.params;
  const initialState = createInitialState();
  const logger = ServerLogger.getInstance();

  const notFound = () => {
    logger.logError({
      message: `Question not found on questionRoute questionSlug='${questionSlug}'`,
      name: 'server-side',
      app_detected_country: country,
      app_language: language,
      app_url: req.url,
      app_query: req.query,
    });
  };
  const unexpectedError = () => {
    logger.logError({
      message: `Unexpected Error on questionRoute questionSlug='${questionSlug}'`,
      name: 'server-side',
      app_detected_country: country,
      app_language: language,
      app_url: req.url,
      app_query: req.query,
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

  updateTrackingQuestionParam(question);

  initialState.currentQuestion = questionSlug;
  initialState.questions = {
    [questionSlug]: {
      question,
    },
  };

  return reactRender(req, res, initialState);
};
