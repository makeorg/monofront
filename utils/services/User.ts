import { UserApiService } from '@make.org/api/UserApiService';
import {
  SearchProposalsType,
  PasswordsType,
  UserAuthType,
  UserType,
  UserProfileType,
  OrganisationProfileType,
  ErrorObjectType,
  RegisterFormDataType
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
import { TYPE_ORGANISATION, TYPE_PERSONALITY } from '@make.org/utils/constants/user';
import { apiClient } from '@make.org/api/ApiService/ApiService.client';
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
  const actualPassword = hasPassword && passwords.actualPassword
    ? passwords.actualPassword
    : undefined;
  const { newPassword } = passwords;

  try {
    await UserApiService.updatePassword(userId, actualPassword, newPassword);
    success();
  } catch (apiServiceError) {
    if (apiServiceError.status === 400 && apiServiceError.data) {
      handleErrors(
        getErrorMessages(
          updatePasswordErrors,
          apiServiceError.data,
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
    success();
  } catch (apiServiceError) {
    if (
      apiServiceError.status === 400
      && apiServiceError.data
      && apiServiceError.data.shift().key === INVALID_PASSWORD_KEY_ERROR
    ) {
      invalidPassword();
      return;
    }
    if (
      apiServiceError.status === 400
      && apiServiceError.data
      && apiServiceError.data.shift().key === INVALID_EMAIL_KEY_ERROR
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
  } catch (apiServiceError) {
    if (apiServiceError.status === 404) {
      errors(Array(emailNotExistError));
      return;
    }
    if (apiServiceError.status === 400) {
      errors(mapErrors(forgotPasswordErrors, apiServiceError.data));
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
  } catch (apiServiceError) {
    if (apiServiceError.status === 400) {
      errors(
        getErrorMessages(
          registerErrors,
          apiServiceError.data,
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
  errors?: (errors: ErrorObjectType[]) => void,
  unexpectedError?: () => void
): Promise<void> => {
  try {
    await UserApiService.login(email, password, approvePrivacyPolicy);
    success();
  } catch (apiServiceError) {
    if ([400, 401, 403, 404].includes(apiServiceError.status)) {
      errors(loginErrors);
      return;
    }
    defaultUnexpectedError(apiServiceError);
    unexpectedError();
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
): Promise<string | null> => {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = await UserApiService.loginPrivacyPolicy(email, password);
    const lastVersion = new Date(privacyPolicyDate);
    let userAcceptance;

    if (data?.privacyPolicyApprovalDate != null) {
      userAcceptance = new Date(data.privacyPolicyApprovalDate);
    }

    if (!userAcceptance || userAcceptance < lastVersion) {
      action();
      return;
    }
    login(email, password, undefined, success, failure, unexpectedError);
  } catch (apiServiceError) {
    if ([400, 401, 403, 404].includes(apiServiceError.status)) {
      failure(loginErrors);
      return;
    }
    defaultUnexpectedError(apiServiceError);
    failure();
  }
};

const myProposals = async (
  userId: string,
  seed?: number,
  page = 0
): Promise<SearchProposalsType> => {
  const limit = PROPOSALS_LISTING_LIMIT;
  const skip = page * limit;
  try {
    const response = await UserApiService.myProposals(
      userId,
      seed,
      limit,
      skip
    );

    return response.data;
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const myFavourites = async (
  userId: string,
  page = 0
): Promise<SearchProposalsType> => {
  const limit = PROPOSALS_LISTING_LIMIT;
  const skip = page * limit;
  try {
    const response = await UserApiService.myFavourites(userId, limit, skip);

    return response.data;
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const logout = async (success?: () => void): Promise<void> => {
  try {
    apiClient.isLogged = false; // @see ApiServiceClient
    await UserApiService.logout();
    success();
  } catch (apiServiceError) {
    if (apiServiceError.status === 401) {
      success();
      return;
    }
    defaultUnexpectedError(apiServiceError);
  }
};

const loginSocial = async (
  provider: string,
  token: string,
  approvePrivacyPolicy?: boolean,
  success?: () => void,
  failure?: () => void,
  // unexpectedError?: () => void
): Promise<UserAuthType> => {
  try {
    const response = await UserApiService.loginSocial(
      provider,
      token,
      approvePrivacyPolicy
    );
    success();

    return response.data;
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);
    failure();

    return null;
  }
};

const checkSocialPrivacyPolicy = async (
  provider: string,
  token: string,
  privacyPolicyDate: string,
  action?: () => void,
  success?: () => void,
  failure?: () => void,
  unexpectedError?: () => void
): Promise<string | null> => {
  try {
    const { data } = await UserApiService.socialPrivacyPolicy(provider, token);

    const lastVersion = new Date(privacyPolicyDate);

    let userAcceptance;
    if (data?.privacyPolicyApprovalDate != null) {
      userAcceptance = new Date(data.privacyPolicyApprovalDate);
    }

    if (!userAcceptance || userAcceptance < lastVersion) {
      action();
      return;
    }

    loginSocial(provider, token, undefined, success, failure, unexpectedError);
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);
    failure();
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
    success();

    return;
  } catch (apiServiceError) {
    defaultUnexpectedError(apiServiceError);
    failure();
  }
};

const current = async (
  unauthorized?: () => void
): Promise<UserType | null> => {
  try {
    const response = await UserApiService.current();
    apiClient.isLogged = true; // @see ApiServiceClient

    return response.data;
  } catch (apiServiceError) {
    if (apiServiceError.status === 401) {
      apiClient.isLogged = false; // @see ApiServiceClient
      unauthorized();

      return null;
    }
    defaultUnexpectedError(apiServiceError);

    return null;
  }
};

const getProfile = async (userId: string): Promise<UserProfileType | null> => {
  try {
    const response = await UserApiService.getProfile(userId);

    return response.data;
  } catch (apiServiceError) {
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
): Promise<UserProfileType | OrganisationProfileType> => {
  if (userType === TYPE_ORGANISATION) {
    return OrganisationService.getProfile(userId);
  }
  if (userType === TYPE_PERSONALITY) {
    return PersonalityService.getProfile(userId);
  }

  return getProfile(userId);
};

const update = async (
  userId: string,
  profile: UserProfileType,
  success: () => void,
  handleErrors: (errors: ErrorObjectType[]) => void
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
  } catch (apiServiceError) {
    if (apiServiceError.status === 400) {
      handleErrors(
        getErrorMessages(
          updateUserErrors,
          apiServiceError.data,
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
