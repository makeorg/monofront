import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { UserApiService } from '@make.org/api/services/UserApiService';
import { ServerLogger } from '@make.org/logger/serverLogger';
import { defaultUnexpectedError } from '@make.org/utils/services/DefaultErrorHandler';

const verifyUser = async (
  userId: string,
  verificationToken: string,
  country: string,
  language: string,
  success: () => void,
  failure: () => void,
  questionId?: string
): Promise<void> => {
  try {
    await UserApiService.verifyUser(userId, verificationToken, {
      'x-make-question-id': questionId || '',
      'x-make-country': country,
      'x-make-client-language': language,
    });

    success();
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if ([400, 404].includes(apiServiceError.status)) {
      failure();
      ServerLogger.getInstance().logWarning({
        message: `Error in verifyUser for userId ->${userId}, verificationToken -> ${verificationToken} : ${apiServiceError.message}`,
        name: 'services',
      });
      return;
    }
    failure();
    defaultUnexpectedError(apiServiceError);
  }
};

const resetPasswordTokenCheck = async (
  userId: string,
  resetToken: string,
  country: string,
  language: string,
  success: () => void,
  failure: () => void,
  questionId?: string
): Promise<void> => {
  try {
    await UserApiService.resetPasswordTokenCheck(userId, resetToken, {
      'x-make-question-id': questionId || '',
      'x-make-country': country,
      'x-make-client-language': language,
    });
    success();
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if ([400, 404].includes(apiServiceError.status)) {
      failure();
      ServerLogger.getInstance().logWarning({
        message: `Error in resetPasswordTokenCheck for userId -> ${userId} : status -> ${apiServiceError.message}`,
        name: 'services',
      });
      return;
    }
    failure();
    defaultUnexpectedError(apiServiceError);
  }
};

export const UserService = {
  verifyUser,
  resetPasswordTokenCheck,
};
