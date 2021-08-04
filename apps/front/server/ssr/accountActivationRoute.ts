import { initialState } from '@make.org/store/initialState';
import { Request, Response } from 'express';
import { NOTIF } from '@make.org/types/enums';
import { UserService } from '../service/UserService';
import { reactRender } from '../reactRender';
import { QuestionService } from '../service/QuestionService';
import { logError } from './helpers/ssr.helper';

export const accountActivationRoute = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, verificationToken, country, language } = req.params;
  // empty question when register on home page
  const questionId = req.query.question || '';
  const notificationError = {
    contentId: NOTIF.ACTIVATION_FAILURE_MESSAGE,
    level: NOTIF.NOTIFICATION_LEVEL_ERROR,
  };
  const notificationSuccess = {
    contentId: NOTIF.ACTIVATION_SUCCESS_MESSAGE,
    level: NOTIF.NOTIFICATION_LEVEL_SUCCESS,
  };

  if (questionId !== '') {
    const notFound = () => {
      logError({
        message: `Question not found on activate account questionId='${questionId}'`,
        name: 'account-activation',
        url: req.url,
        query: req.query,
      });
    };
    const unexpectedError = () => {
      logError({
        message: `Unexpected error on activate account questionId='${questionId}'`,
        name: 'account-activation',
        url: req.url,
        query: req.query,
      });
    };
    const question = await QuestionService.getQuestion(
      JSON.stringify(questionId),
      country,
      language,
      notFound,
      unexpectedError
    );

    if (!question) {
      initialState.notifications.banner = notificationError;

      return reactRender(req, res, initialState);
    }

    initialState.currentQuestion = question.slug;
    initialState.questions = {
      [question.slug]: {
        question,
      },
    };
  }

  const success = () => {
    initialState.notifications.banner = notificationSuccess;
  };
  const failure = () => {
    initialState.notifications.banner = notificationError;
  };
  await UserService.verifyUser(
    userId,
    verificationToken,
    country,
    language,
    () => success(),
    () => failure(),
    JSON.stringify(questionId)
  );

  return reactRender(req, res, initialState);
};
