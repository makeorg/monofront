import { Request, Response } from 'express';
import { createInitialState } from '@make.org/store/initialState';
import { updateTrackingQuestionParam } from '@make.org/utils/helpers/question';
import { isInProgress } from '@make.org/utils/helpers/date';
import { ServerLogger } from '@make.org/logger/serverLogger';
import { QuestionResultsType } from '@make.org/types';
import { reactRender } from '../reactRender';
import { QuestionService } from '../service/QuestionService';
import { getFromJsonFile } from '../api/question';

export const resultsRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { questionSlug, country, language } = req.params;
  const initialState = createInitialState();
  const logger = ServerLogger.getInstance();
  const logError = (message: string) => {
    logger.logError({
      message,
      name: 'server-side',
      app_detected_country: country,
      app_language: language,
      app_url: req.url,
      app_query: req.query,
    });
  };

  const notFound = (name: string) => {
    logError(
      `${name} not found on resultsRoute questionSlug='${questionSlug}'`
    );
  };
  const unexpectedError = (name: string) => {
    logError(
      `Unexpected Error when fetching '${name}' on resultsRoute questionSlug='${questionSlug}'`
    );
  };

  const questionOrOidcConf = await QuestionService.getQuestion(
    questionSlug,
    country,
    () => notFound('Question'),
    () => unexpectedError('Question'),
    language
  );

  if (!questionOrOidcConf || 'authorizationEndpoint' in questionOrOidcConf) {
    return reactRender(req, res.status(404), initialState);
  }

  const question = questionOrOidcConf;

  if (!isInProgress(question) && !question.displayResults) {
    return res.redirect(question.aboutUrl);
  }

  const results: QuestionResultsType | string | undefined =
    (await QuestionService.getQuestionResult(
      question.questionId,
      () => notFound('Results'),
      () => unexpectedError('Results')
    )) || (await getFromJsonFile(question.questionId));

  const formatResults = (data?: QuestionResultsType | string) => {
    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch (error) {
        const typedError = error as { message: string };

        logger.logError({
          message: `Error parsing JSON results for questionId='${question.questionId}': ${typedError.message}`,
          name: 'server-side',
          app_detected_country: country,
          app_language: language,
          app_url: req.url,
          app_query: req.query,
        });
        return undefined;
      }
    }

    return data;
  };

  const questionResults = formatResults(results);

  if (!questionResults) {
    return reactRender(req, res.status(404), initialState);
  }

  updateTrackingQuestionParam(question);

  initialState.currentQuestion = questionSlug;
  initialState.questions = {
    [questionSlug]: {
      question,
      questionResults,
    },
  };

  return reactRender(req, res, initialState);
};
