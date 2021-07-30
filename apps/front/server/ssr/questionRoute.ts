import { Request, Response } from 'express';
import { getLanguageFromCountryCode } from '@make.org/utils/helpers/countries';
import { initialState } from '@make.org/store/initialState';
import { updateTrackingQuestionParam } from '@make.org/store/middleware/question';
import { isInProgress } from '@make.org/utils/helpers/date';
import { reactRender } from '../reactRender';
import { QuestionService } from '../service/QuestionService';
import { logError } from './helpers/ssr.helper';

export const questionRoute = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { questionSlug, country } = req.params;
  const language = getLanguageFromCountryCode(country);

  const notFound = () => {
    logError({
      message: `Question not found on sequenceRoute questionSlug='${questionSlug}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };
  const unexpectedError = () => {
    logError({
      message: `Unexpected Error on sequenceRoute questionSlug='${questionSlug}'`,
      name: 'server-side',
      url: req.url,
      query: req.query,
    });
  };

  const question = await QuestionService.getQuestion(
    questionSlug,
    country,
    language,
    notFound,
    unexpectedError
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
