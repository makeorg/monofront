import { createInitialState } from '@make.org/store/initialState';
import { Request, Response } from 'express';
import { NOTIF } from '@make.org/types/enums';
import { ServerLogger } from '@make.org/logger/serverLogger';
import { UserService } from '../service/UserService';
import { reactRender } from '../reactRender';
import { QuestionService } from '../service/QuestionService';

export const accountActivationRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const routeState = createInitialState();
  const { userId, verificationToken, country, language } = req.params;
  // empty question when register on home page
  const questionId = req.query.question?.toString() || '';
  const notificationError = {
    contentId: NOTIF.ACTIVATION_FAILURE_MESSAGE,
    level: NOTIF.NOTIFICATION_LEVEL_ERROR,
  };
  const notificationSuccess = {
    contentId: NOTIF.ACTIVATION_SUCCESS_MESSAGE,
    level: NOTIF.NOTIFICATION_LEVEL_SUCCESS,
  };

  const logger = ServerLogger.getInstance();

  if (questionId !== '') {
    const notFound = () => {
      logger.logError({
        message: `Question not found on activate account QuestionService.getQuestion with questionId='${questionId}'`,
        name: 'server-side',
        url: req.url,
        query: req.query,
      });
    };
    const unexpectedError = () => {
      logger.logError({
        message: `Unexpected error on activate account QuestionService.getQuestion with questionId='${questionId}'`,
        name: 'server-side',
        url: req.url,
        query: req.query,
      });
    };
    const question = await QuestionService.getQuestion(
      questionId,
      country,
      () => notFound(),
      () => unexpectedError(),
      language
    );

    if (!question) {
      routeState.notifications.banner = notificationError;

      return reactRender(req, res, routeState);
    }

    routeState.currentQuestion = question.slug;
    routeState.questions = {
      [question.slug]: {
        question,
      },
    };
  }

  const success = () => {
    routeState.notifications.banner = notificationSuccess;
  };
  const failure = () => {
    routeState.notifications.banner = notificationError;
  };
  await UserService.verifyUser(
    userId,
    verificationToken,
    country,
    language,
    () => success(),
    () => failure(),
    questionId
  );

  return reactRender(req, res, routeState);
};
