import { UserApiService } from '@make.org/api/UserApiService';
import {
  SearchProposalsType,
  PasswordsType,
  UserAuthType,
  UserType,
  UserProfileType,
  OrganisationProfileType,
  ErrorObjectType,
  RegisterFormDataType,
  PersonalityProfileType,
} from '@make.org/types';
import { mapErrors } from '@make.org/utils/services/ApiErrors';
import {
  loginErrors,
  registerErrors,
  updateUserErrors,
  updatePasswordErrors,
  forgotPasswordErrors,
  emailNotExistError,
} from '@make.org/utils/errors/Messages/User';
import { getErrorMessages } from '@make.org/utils/helpers/form';
import { PROPOSALS_LISTING_LIMIT } from '@make.org/utils/constants/proposal';
import { USER } from '@make.org/types/enums';
import { apiClient } from '@make.org/api/ApiService/ApiService.client';
import { ApiServiceError } from '@make.org/api/ApiService/ApiServiceError';
import { storeTokens } from '@make.org/api/OauthRefresh';
import { defaultUnexpectedError } from './DefaultErrorHandler';
import { OrganisationService } from './Organisation';
import { PersonalityService } from './Personality';

const updatePassword = async (
  userId: string,
  passwords: PasswordsType,
  hasPassword: boolean,
  success: () => void,
  handleErrors: (errors: ErrorObjectType[]) => void
): Promise<void> => {
  const actualPassword =
    hasPassword && passwords.actualPassword ? passwords.actualPassword : '';
  const { newPassword } = passwords;

  try {
    await UserApiService.updatePassword(userId, actualPassword, newPassword);
    success();
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (
      apiServiceError.status === 400 &&
      apiServiceError.data &&
      handleErrors
    ) {
      handleErrors(
        getErrorMessages(
          updatePasswordErrors,
          apiServiceError.data as ErrorObjectType | ErrorObjectType[],
          apiServiceError.logId
        )
      );
      return;
    }
    defaultUnexpectedError(apiServiceError);
  }
};

const deleteAccount = async (
  userId: string,
  password: string,
  success: () => void,
  invalidPassword: () => void,
  invalidEmail: () => void
): Promise<void> => {
  const INVALID_PASSWORD_KEY_ERROR = 'invalid_password';
  const INVALID_EMAIL_KEY_ERROR = 'invalid_email';

  try {
    await UserApiService.deleteAccount(userId, password);
    apiClient.token = null; // @see ApiServiceClient
    success();
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    const data = apiServiceError.data as ErrorObjectType[];

    if (
      apiServiceError.status === 400 &&
      data &&
      data.shift()?.key === INVALID_PASSWORD_KEY_ERROR
    ) {
      invalidPassword();
      return;
    }
    if (
      apiServiceError.status === 400 &&
      data &&
      data.shift()?.key === INVALID_EMAIL_KEY_ERROR
    ) {
      invalidEmail();
      return;
    }
    defaultUnexpectedError(apiServiceError);
  }
};

const forgotPassword = async (
  email: string,
  success: () => void,
  errors: (errors: ErrorObjectType[]) => void
): Promise<void> => {
  try {
    await UserApiService.forgotPassword(email);
    success();
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 404) {
      errors(Array(emailNotExistError));
      return;
    }
    if (apiServiceError.status === 400) {
      errors(
        mapErrors(
          forgotPasswordErrors,
          apiServiceError.data as ErrorObjectType[],
          'noLogId'
        )
      );
      return;
    }
    defaultUnexpectedError(apiServiceError);
  }
};

const register = async (
  user: RegisterFormDataType,
  success: () => void,
  errors: (errors: ErrorObjectType[]) => void,
  unexpectedError: () => void
): Promise<void> => {
  try {
    await UserApiService.register(user);
    success();
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 400) {
      errors(
        getErrorMessages(
          registerErrors,
          apiServiceError.data as ErrorObjectType[] | ErrorObjectType,
          apiServiceError.logId
        )
      );
      return;
    }

    defaultUnexpectedError(apiServiceError);
    unexpectedError();
  }
};

// checks email and password validity in panel register
const checkRegistration = async (
  email: string,
  password: string,
  success: () => void,
  errors: (errors: ErrorObjectType[]) => void,
  unexpectedError: () => void
): Promise<void> => {
  try {
    await UserApiService.checkRegistration(email, password);
    success();
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 400) {
      errors(
        getErrorMessages(
          registerErrors,
          apiServiceError.data as ErrorObjectType[] | ErrorObjectType,
          apiServiceError.logId
        )
      );
      return;
    }
    defaultUnexpectedError(apiServiceError);
    unexpectedError();
  }
};

const login = async (
  email: string,
  password: string,
  approvePrivacyPolicy?: boolean,
  success?: () => void,
  errors?: (serviceErrors?: ErrorObjectType[]) => void,
  unexpectedError?: () => void
): Promise<null | UserAuthType> => {
  try {
    const response = await UserApiService.login(
      email,
      password,
      approvePrivacyPolicy
    );

    if (response && response.data) {
      const userAuth = response.data;
      storeTokens(userAuth.access_token, userAuth.refresh_token);
      apiClient.token = userAuth.access_token;
    }

    if (success) {
      success();
    }
    return response?.data || null;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if ([400, 401, 403, 404].includes(apiServiceError.status)) {
      if (errors) {
        errors(loginErrors);
        return null;
      }
    }
    defaultUnexpectedError(apiServiceError);
    if (unexpectedError) {
      unexpectedError();
    }

    return null;
  }
};

const checkLoginPrivacyPolicy = async (
  email: string,
  password: string,
  privacyPolicyDate: string,
  action?: () => void,
  success?: () => void,
  failure?: (args?: ErrorObjectType[]) => void,
  unexpectedError?: () => void
): Promise<void> => {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const response = await UserApiService.loginPrivacyPolicy(email, password);
    if (!response) {
      return;
    }

    const { data } = response;
    const lastVersion = new Date(privacyPolicyDate);
    let userAcceptance;

    if (data && data.privacyPolicyApprovalDate != null) {
      userAcceptance = new Date(data.privacyPolicyApprovalDate);
    }

    if ((!userAcceptance || userAcceptance < lastVersion) && action) {
      action();
      return;
    }
    login(email, password, undefined, success, failure, unexpectedError);
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if ([400, 401, 403, 404].includes(apiServiceError.status) && failure) {
      failure(loginErrors);
      return;
    }
    if (failure) {
      failure();
    }
    defaultUnexpectedError(apiServiceError);
  }
};

const myProposals = async (
  userId: string,
  seed?: number,
  page = 0
): Promise<SearchProposalsType | void> => {
  const limit = PROPOSALS_LISTING_LIMIT;
  const skip = page * limit;
  try {
    const response = await UserApiService.myProposals(
      userId,
      seed,
      limit,
      skip
    );

    return response && response.data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if ([401].includes(apiServiceError.status)) {
      // eslint-disable-next-line consistent-return
      return;
    }
    return defaultUnexpectedError(apiServiceError);
  }
};

const myFavourites = async (
  userId: string,
  page = 0
): Promise<SearchProposalsType | void> => {
  const limit = PROPOSALS_LISTING_LIMIT;
  const skip = page * limit;
  try {
    const response = await UserApiService.myFavourites(userId, limit, skip);

    return response && response.data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if ([401].includes(apiServiceError.status)) {
      // eslint-disable-next-line consistent-return
      return;
    }
    return defaultUnexpectedError(apiServiceError);
  }
};

const logout = async (success?: () => void): Promise<void> => {
  try {
    await UserApiService.logout();
    apiClient.token = null; // @see ApiServiceClient
    if (success) {
      success();
    }
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 401) {
      apiClient.token = null; // @see ApiServiceClient
      if (success) {
        success();
      }
      return;
    }
    defaultUnexpectedError(apiServiceError);
  }
};

const loginSocial = async (
  provider: string,
  token: string,
  approvePrivacyPolicy?: boolean,
  success?: (createdAt: string) => void,
  failure?: () => void,
  unexpectedError?: () => void
): Promise<UserAuthType | void> => {
  try {
    const response = await UserApiService.loginSocial(
      provider,
      token,
      approvePrivacyPolicy
    );

    if (response && response.data) {
      const userAuth = response.data;
      storeTokens(userAuth.access_token, userAuth.refresh_token);
      apiClient.token = userAuth.access_token;

      if (success) {
        success(response.data.created_at);
      }
    }

    return response && response.data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (failure) {
      failure();
    }
    if (unexpectedError) {
      unexpectedError();
    } else {
      defaultUnexpectedError(apiServiceError);
    }

    return Promise.resolve();
  }
};

const checkSocialPrivacyPolicy = async (
  provider: string,
  token: string,
  privacyPolicyDate: string,
  action?: () => void,
  success?: (createdAt: string) => void,
  failure?: () => void,
  unexpectedError?: () => void
): Promise<void | null> => {
  try {
    const response = await UserApiService.socialPrivacyPolicy(provider, token);

    if (!response) {
      return null;
    }

    const { data } = response;
    const lastVersion = new Date(privacyPolicyDate);

    let userAcceptance;
    if (data?.privacyPolicyApprovalDate != null) {
      userAcceptance = new Date(data.privacyPolicyApprovalDate);
    }

    if ((!userAcceptance || userAcceptance < lastVersion) && action) {
      action();
      return null;
    }

    loginSocial(provider, token, undefined, success, failure, unexpectedError);

    return null;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (failure) {
      failure();
    }
    defaultUnexpectedError(apiServiceError);
    return null;
  }
};

const changePassword = async (
  newPassword: string,
  resetToken: string,
  userId: string,
  success?: () => void,
  failure?: () => void
): Promise<void> => {
  try {
    await UserApiService.changePassword(newPassword, resetToken, userId);
    if (success) {
      success();
    }

    return;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    defaultUnexpectedError(apiServiceError);
    if (failure) {
      failure();
    }
  }
};

const current = async (unauthorized?: () => void): Promise<UserType | null> => {
  try {
    const response = await UserApiService.current();

    return response && response.data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 401) {
      apiClient.token = null; // @see ApiServiceClient
      if (unauthorized) {
        unauthorized();
      }

      return null;
    }
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getProfile = async (userId: string): Promise<UserProfileType | null> => {
  try {
    const response = await UserApiService.getProfile(userId);

    return response && response.data;
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 401) {
      return null;
    }
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getProfileByUserType = async (
  userId: string,
  userType: string
): Promise<
  UserProfileType | OrganisationProfileType | PersonalityProfileType | null
> => {
  if (userType === USER.TYPE_ORGANISATION) {
    return OrganisationService.getProfile(userId);
  }
  if (userType === USER.TYPE_PERSONALITY) {
    return PersonalityService.getProfile(userId);
  }

  return getProfile(userId);
};

const update = async (
  userId: string,
  profile: UserProfileType,
  success: () => void,
  handleErrors?: (errors: ErrorObjectType[]) => void
): Promise<void> => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    postalCode,
    profession,
    description,
    optInNewsletter,
    website,
    avatarUrl,
    legalMinorConsent,
    legalAdvisorApproval,
  } = profile;

  try {
    await UserApiService.update(
      userId,
      firstName,
      lastName,
      dateOfBirth,
      avatarUrl,
      profession,
      description,
      postalCode,
      optInNewsletter,
      website,
      legalMinorConsent,
      legalAdvisorApproval
    );

    success();
  } catch (error: unknown) {
    const apiServiceError = error as ApiServiceError;
    if (apiServiceError.status === 400 && handleErrors) {
      handleErrors(
        getErrorMessages(
          updateUserErrors,
          apiServiceError.data as ErrorObjectType[] | ErrorObjectType,
          apiServiceError.logId
        )
      );
      return;
    }

    defaultUnexpectedError(apiServiceError);
  }
};

export const UserService = {
  update,
  updatePassword,
  deleteAccount,
  forgotPassword,
  register,
  checkRegistration,
  login,
  myProposals,
  myFavourites,
  logout,
  loginSocial,
  changePassword,
  current,
  getProfileByUserType,
  checkLoginPrivacyPolicy,
  checkSocialPrivacyPolicy,
};
