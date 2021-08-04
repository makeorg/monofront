import { initialState } from '@make.org/store/initialState';
import { Request, Response } from 'express';
import { NOTIF } from '@make.org/types/enums';
import { UserService } from '../service/UserService';
import { reactRender } from '../reactRender';
import { QuestionService } from '../service/QuestionService';
import { logError } from './helpers/ssr.helper';

export const passwordRecoveryRoute = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { resetToken, userId, country, language } = req.params;
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
      logError({
        message: `Question not found on activate account questionId='${questionId}'`,
        name: 'password-recovery',
        url: req.url,
        query: req.query,
      });
    };
    const unexpectedError = () => {
      logError({
        message: `Unexpected Error on activate account questionId='${questionId}'`,
        name: 'password-recovery',
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
    JSON.stringify(questionId)
  );

  return reactRender(req, res, initialState);
};
