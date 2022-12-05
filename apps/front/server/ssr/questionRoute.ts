import { Request, Response } from 'express';
import { createInitialState } from '@make.org/store/initialState';
import { updateTrackingQuestionParam } from '@make.org/utils/helpers/question';
import { isInProgress } from '@make.org/utils/helpers/date';
import { getLoggerInstance } from '@make.org/utils/helpers/logger';
import { reactRender } from '../reactRender';
import { QuestionService } from '../service/QuestionService';

export const questionRoute = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { questionSlug, country, language } = req.params;
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

  initialState.currentQuestion = questionSlug;
  initialState.questions = {
    [questionSlug]: {
      question,
    },
  };
  updateTrackingQuestionParam(question);

  return reactRender(req, res, initialState);
};
