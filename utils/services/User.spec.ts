import { UserApiService } from '@make.org/api/UserApiService';
import { UserService } from '@make.org/utils/services/User';
import { Logger } from '@make.org/utils/services/Logger';
import {
  updateUserErrors,
  emailNotExistError,
  forgotPasswordErrors,
  registerErrors,
} from '@make.org/utils/errors/Messages/User';
import { defaultApiError } from '@make.org/utils/errors/Messages';
import { ErrorObjectType } from '@make.org/types';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';

jest.mock('@make.org/api/UserApiService');
jest.mock('@make.org/utils/services/Logger');
jest.mock('@make.org/utils/helpers/date', () => ({
  getDateOfBirthFromAge: () => 30,
}));
jest.setTimeout(30000);

const emptyFunc = () => undefined;

describe('User Service', () => {
  describe('update function', () => {
    const profile = {
      firstName: 'foo',
      lastName: null,
      dateOfBirth: '30',
      profession: 'bar',
      postalCode: '77000',
      description: 'baz description',
      optInNewsletter: false,
      avatarUrl: null,
      website: null,
      legalMinorConsent: false,
      legalAdvisorConsent: false,
    };
    it('Call UserApi service with right params', async () => {
      jest.spyOn(UserApiService, 'update');
      UserApiService.update.mockResolvedValue({ data: 'ok' });

      const success = () => {
        expect(UserApiService.update).toHaveBeenNthCalledWith(
          1,
          'userId',
          profile.firstName,
          null,
          profile.dateOfBirth,
          null,
          profile.profession,
          profile.description,
          profile.postalCode,
          profile.optInNewsletter,
          null,
          profile.legalMinorConsent,
          profile.legalAdvisorConsent
        );
      };
      UserService.update('userId', profile, success);
    });

    it('return a bad request content', async () => {
      jest.spyOn(UserApiService, 'update');
      UserApiService.update.mockRejectedValue({
        status: 400,
        data: updateUserErrors,
      });

      const handleErrors = (errors: ErrorObjectType[]) => {
        errors.forEach((error, index) => {
          expect(errors[index].message).toBe(updateUserErrors[index].message);
          expect(errors[index].key).toBe(updateUserErrors[index].key);
          expect(errors[index].field).toBe(updateUserErrors[index].field);
        });
      };

      UserService.update('userId', {}, emptyFunc, handleErrors);
    });
  });

  describe('deleteAccount function', () => {
    it('return a no content http status', async done => {
      jest.spyOn(UserApiService, 'deleteAccount');
      UserApiService.deleteAccount.mockResolvedValue({ data: 'ok' });

      const success = () => {
        expect(UserApiService.deleteAccount).toHaveBeenNthCalledWith(
          1,
          'barUserId',
          'fooPassword'
        );
        done();
      };

      UserService.deleteAccount('barUserId', 'fooPassword', success);
    });

    it('return a bad request content', async done => {
      Logger.logError.mockClear();
      jest.spyOn(Logger, 'logError');
      UserApiService.deleteAccount.mockRejectedValue(
        new ApiServiceError('not found', 404)
      );

      UserService.deleteAccount(
        'barUserId',
        'fooPassword',
        emptyFunc,
        emptyFunc,
        emptyFunc
      ).then(() => {
        expect(Logger.logError).toHaveBeenNthCalledWith(
          1,
          new ApiServiceError(
            'You should handle unexpected errors (default handler): not found',
            404
          )
        );

        done();
      });
    });
  });

  describe('forgotPassword function', () => {
    it('success', async done => {
      jest.spyOn(UserApiService, 'forgotPassword');
      UserApiService.forgotPassword.mockResolvedValue();

      const success = () => {
        expect(UserApiService.forgotPassword).toHaveBeenNthCalledWith(
          1,
          'foo@example.com'
        );
        done();
      };
      await UserService.forgotPassword('foo@example.com', success);
    });

    it('return a bad request content', async done => {
      jest.spyOn(UserApiService, 'forgotPassword');
      UserApiService.forgotPassword.mockRejectedValue({
        status: 400,
        data: forgotPasswordErrors,
      });

      const handleErrors = errors => {
        errors.forEach((error, index) => {
          expect(errors[index].message).toBe(
            forgotPasswordErrors[index].message
          );
          expect(errors[index].key).toBe(forgotPasswordErrors[index].key);
          expect(errors[index].field).toBe(forgotPasswordErrors[index].field);
          done();
        });
      };

      UserService.forgotPassword('foo2@example.com', emptyFunc, handleErrors);
    });

    it('return an unexpected error', async done => {
      jest.spyOn(UserApiService, 'forgotPassword');
      Logger.logError.mockClear();
      jest.spyOn(Logger, 'logError');

      UserApiService.forgotPassword.mockRejectedValue(
        new ApiServiceError('server error', 500, defaultApiError)
      );

      UserService.forgotPassword('foo2@example.com', emptyFunc, emptyFunc).then(
        () => {
          expect(Logger.logError).toHaveBeenNthCalledWith(
            1,
            new ApiServiceError(
              'You should handle unexpected errors (default handler): server error',
              500,
              defaultApiError
            )
          );
          done();
        }
      );
    });

    it('return a 404', async done => {
      jest.spyOn(UserApiService, 'forgotPassword');
      UserApiService.forgotPassword.mockRejectedValue({ status: 404 });
      const handleErrors = errors => {
        errors.forEach((error, index) => {
          expect(errors[index].message).toBe(emailNotExistError.message);
          expect(errors[index].key).toBe(emailNotExistError.key);
          expect(errors[index].field).toBe(emailNotExistError.field);
        });
        done();
      };

      UserService.forgotPassword('foo2@example.com', emptyFunc, handleErrors);
    });
  });

  describe('register function', () => {
    const johnData = {
      firstname: 'john',
      email: 'john@example.com',
    };
    it('success', async done => {
      jest.spyOn(UserApiService, 'register');
      UserApiService.register.mockResolvedValue();

      UserService.register(johnData).then(() => {
        expect(UserApiService.register).toHaveBeenNthCalledWith(1, johnData);
        done();
      });
    });

    it('return a bad request content', async done => {
      jest.spyOn(UserApiService, 'register');
      UserApiService.register.mockRejectedValue({
        status: 400,
        data: registerErrors,
      });

      const handleErrors = errors => {
        errors.forEach((error, index) => {
          expect(errors[index].message).toBe(registerErrors[index].message);
          expect(errors[index].key).toBe(registerErrors[index].key);
          expect(errors[index].field).toBe(registerErrors[index].field);
        });
        done();
      };

      UserService.register(johnData, emptyFunc, handleErrors);
    });

    it('return a global error if error message is not referenced', async done => {
      jest.spyOn(UserApiService, 'register');
      UserApiService.register.mockRejectedValue({
        status: 400,
        data: defaultApiError,
      });

      const handleErrors = errors => {
        errors.forEach((error, index) => {
          expect(errors[index].message).toBe(defaultApiError.message);
          expect(errors[index].key).toBe(defaultApiError.key);
          expect(errors[index].field).toBe(defaultApiError.field);
        });
        done();
      };

      await UserService.register(johnData, emptyFunc, handleErrors);
    });
  });

  describe('get current user', () => {
    it('success', async done => {
      jest.spyOn(UserApiService, 'current');
      const user = {
        userId: '12',
        displayName: 'john',
        email: 'john@example.com',
      };
      UserApiService.current.mockResolvedValue({ data: user });

      UserService.current().then(response => {
        expect(UserApiService.current).toHaveBeenCalled();
        expect(response).toBe(user);
        done();
      });
    });
  });

  it('unauthorized', async done => {
    jest.spyOn(UserApiService, 'current');
    jest.spyOn(Logger, 'logError');
    Logger.logError.mockClear();

    UserApiService.current.mockRejectedValue({ status: 401 });

    UserService.current().then(response => {
      expect(UserApiService.current).toHaveBeenCalled();
      expect(response).toEqual(null);
      expect(Logger.logError).not.toHaveBeenCalled();
      done();
    });
  });

  it('error', async done => {
    jest.spyOn(UserApiService, 'current');
    jest.spyOn(Logger, 'logError');
    Logger.logError.mockClear();

    UserApiService.current.mockRejectedValue(
      new ApiServiceError('server error', 500)
    );

    UserService.current().then(response => {
      expect(UserApiService.current).toHaveBeenCalled();
      expect(response).toEqual(null);
      expect(Logger.logError).toHaveBeenCalledWith(
        new ApiServiceError(
          'You should handle unexpected errors (default handler): server error',
          500
        )
      );
      done();
    });
  });

  describe('get privacy policy acceptance with login', () => {
    it('success', async done => {
      jest.spyOn(UserApiService, 'loginPrivacyPolicy');
      const data = {
        privacyPolicyApprovalDate: '2021-04-06T10:09:35.364Z',
      };
      UserApiService.loginPrivacyPolicy.mockResolvedValue({ data });

      UserService.checkLoginPrivacyPolicy('foo', 'bar').then(() => {
        expect(UserApiService.loginPrivacyPolicy).toHaveBeenCalledWith(
          'foo',
          'bar'
        );
        done();
      });
    });
  });

  describe('get privacy policy acceptance with social connect', () => {
    it('success', async done => {
      jest.spyOn(UserApiService, 'socialPrivacyPolicy');
      const data = {
        privacyPolicyApprovalDate: '2021-04-06T10:09:35.364Z',
      };
      UserApiService.socialPrivacyPolicy.mockResolvedValue({ data });

      UserService.checkSocialPrivacyPolicy('foo', 'bar').then(() => {
        expect(UserApiService.socialPrivacyPolicy).toHaveBeenCalledWith(
          'foo',
          'bar'
        );
        done();
      });
    });
  });
});
