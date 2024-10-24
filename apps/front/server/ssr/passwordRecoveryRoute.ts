import { createInitialState } from '@make.org/store/initialState';
import { Request, Response } from 'express';
import { NOTIF } from '@make.org/types/enums';
import { ServerLogger } from '@make.org/logger/serverLogger';
import { UserService } from '../service/UserService';
import { reactRender } from '../reactRender';
import { QuestionService } from '../service/QuestionService';

export const passwordRecoveryRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { resetToken, userId, country, language } = req.params;
  const initialState = createInitialState();
  const logger = ServerLogger.getInstance();

  initialState.user = {
    ...initialState.user,
    passwordRecovery: {
      validToken: false,
      resetToken,
      userId,
    },
  };

  const questionId = req.query.question || '';
  if (questionId !== '') {
    const notFound = () => {
      logger.logError({
        message: `Question not found on activate account questionId='${questionId}'`,
        name: 'server-side',
        url: req.url,
        query: req.query,
      });
    };
    const unexpectedError = () => {
      logger.logError({
        message: `Unexpected Error on activate account questionId='${questionId}'`,
        name: 'server-side',
        url: req.url,
        query: req.query,
      });
    };
    const question = await QuestionService.getQuestion(
      questionId.toString(),
      country,
      notFound,
      unexpectedError,
      language
    );

    if (question) {
      initialState.currentQuestion = question.slug;
      initialState.questions = {
        [question.slug]: {
          question,
        },
      };
    }
  }

  const success = () => {
    initialState.user.passwordRecovery.validToken = true;
    initialState.user.passwordRecovery.resetToken = resetToken;
  };
  const failure = () => {
    initialState.notifications.banner = {
      contentId: NOTIF.PASSWORD_RECOVERY_FAILURE_MESSAGE,
      level: NOTIF.NOTIFICATION_LEVEL_ERROR,
    };
  };
  await UserService.resetPasswordTokenCheck(
    userId,
    resetToken,
    country,
    language,
    () => success(),
    () => failure(),
    questionId.toString()
  );

  return reactRender(req, res, initialState);
};
