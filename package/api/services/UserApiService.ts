import {
  ApiServiceHeadersType,
  CreateUserType,
  UserAuthType,
} from '@make.org/types';
import { AxiosResponse } from 'axios';
import { ApiService } from '@make.org/api/ApiService';
import { ApiServiceError } from '../ApiService/ApiServiceError';

export const PATH_USER_LOGIN = '/oauth/make_access_token';
const PATH_USER_CURRENT = '/user/current';
const PATH_USER_PROFILE = '/user/:userId/profile';
const PATH_USER_CHECK_REGISTRATION = '/user/check-registration';
const PATH_USER_GET_TOKEN = '/oauth/access_token';
const PATH_USER_LOGOUT = '/logout';
const PATH_USER_LOGIN_SOCIAL = '/user/login/social';
const PATH_USER = '/user';
const PATH_USER_FORGOT_PASSWORD = '/user/reset-password/request-reset';
const PATH_USER_VERIFICATION = '/user/:userId/validate/:verificationToken';
const PATH_USER_RESET_TOKEN_CHECK =
  '/user/reset-password/check-validity/:userId/:resetToken';
const PATH_USER_CHANGE_PASSWORD =
  '/user/reset-password/change-password/:userId';
const PATH_USER_UPDATE_PASSWORD = '/user/:userId/change-password';
const PATH_USER_DELETE_ACCOUNT = '/user/:userId/delete';
const PATH_USER_PROPOSALS = '/user/:userId/proposals';
const PATH_USER_FAVOURITES = '/user/:userId/votes';
const PATH_USER_PRIVACY_POLICY = '/user/privacy-policy';
const PATH_USER_SOCIAL_PRIVACY_POLICY = '/user/social/privacy-policy';

export const FACEBOOK_PROVIDER_ENUM = 'facebook';
export const GOOGLE_PROVIDER_ENUM = 'google_people';

export class UserApiService {
  /**
   * Get user
   * @return {Promise}
   */
  static current(): Promise<void | AxiosResponse> {
    try {
      return ApiService.callApi(PATH_USER_CURRENT, {
        method: 'GET',
      });
    } catch (error: unknown) {
      const apiServiceError = error as ApiServiceError;
      if (apiServiceError.status === 401) {
        ApiService.removeToken();
      }

      throw error;
    }
  }

  /**
   * Get profile
   * @param  {String}  userId
   *
   * @return {Promise}
   */
  static getProfile(userId: string): Promise<void | AxiosResponse> {
    return ApiService.callApi(PATH_USER_PROFILE.replace(':userId', userId), {
      method: 'GET',
    });
  }

  /**
   * @toDo actualy not used
   *
   * Get user token
   * @return {Promise}
   */
  static getUserToken(): Promise<void | AxiosResponse> {
    return ApiService.callApi(PATH_USER_GET_TOKEN, {
      method: 'GET',
    });
  }

  /** Check Registration validity
   * @param  {String} email
   * @param  {String} password
   */
  static checkRegistration(
    email: string,
    password: string
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(PATH_USER_CHECK_REGISTRATION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  }

  /**
   * Login the user
   * @param  {String} email
   * @param  {String} password
   * @param  {Boolean} approvePrivacyPolicy
   * @return {Promise}
   */
  static login(
    email: string,
    password: string,
    approvePrivacyPolicy?: boolean
  ): Promise<void | AxiosResponse<UserAuthType>> {
    const data: Record<string, string | boolean> = {
      username: email,
      password,
      grant_type: 'password',
      approvePrivacyPolicy: approvePrivacyPolicy || false,
    };

    const result = ApiService.callApi(PATH_USER_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&'),
    });

    result.then(response => {
      if (response && response.data) {
        ApiService.setToken(response.data.access_token);
      }
    });

    return result;
  }

  /**
   * Logout the user
   *
   * @return {Promise}
   */
  static logout(): Promise<void | AxiosResponse> {
    const result = ApiService.callApi(PATH_USER_LOGOUT, {
      method: 'POST',
    });

    result.finally(() => ApiService.removeToken());

    return result;
  }

  /**
   * Login the user via social account
   * @param  {String} provider login social type (google, facebook..)
   * @param  {String} token
   * @param  {Boolean} approvePrivacyPolicy
   * @return {Promise}
   */
  static loginSocial(
    provider: string,
    token: string,
    approvePrivacyPolicy?: boolean,
    optIn?: boolean
  ): Promise<void | AxiosResponse<UserAuthType>> {
    const result = ApiService.callApi(PATH_USER_LOGIN_SOCIAL, {
      method: 'POST',
      body: JSON.stringify({
        provider,
        token,
        country: ApiService.country,
        language: ApiService.language,
        crmCountry: ApiService.country,
        crmLanguage: ApiService.language,
        approvePrivacyPolicy,
        optIn,
      }),
    });

    result.then(response => {
      if (response && response.data) {
        ApiService.setToken(response.data.access_token);
      }
    });

    return result;
  }

  /**
   * Register a user
   * @param  {Object}  user
   * @return {Promise}
   */
  static register(createUser: CreateUserType): Promise<void | AxiosResponse> {
    return ApiService.callApi(PATH_USER, {
      method: 'POST',
      body: JSON.stringify(createUser),
    });
  }

  static update(
    userId: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    avatarUrl: string,
    profession: string,
    description: string,
    postalCode: string,
    optInNewsletter: boolean,
    website: string,
    crmCountry: string,
    crmLanguage: string,
    legalMinorConsent?: boolean,
    legalAdvisorApproval?: boolean
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(PATH_USER_PROFILE.replace(':userId', userId), {
      method: 'PUT',
      body: JSON.stringify({
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
        legalAdvisorApproval,
        crmCountry,
        crmLanguage,
      }),
    });
  }

  /**
   * Update the password
   * @param  {String}  userId
   * @param  {String}  actualPassword
   * @param  {String}  newPassword
   * @return {Promise}
   */
  static updatePassword(
    userId: string,
    actualPassword: string,
    newPassword: string
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(
      PATH_USER_UPDATE_PASSWORD.replace(':userId', userId),
      {
        method: 'POST',
        body: JSON.stringify({ actualPassword, newPassword }),
      }
    );
  }

  /**
   * Request a forgot password link
   * @param  {String}  email
   * @return {Promise}
   */
  static forgotPassword(email: string): Promise<void | AxiosResponse> {
    return ApiService.callApi(PATH_USER_FORGOT_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  /**
   * Request a verification user
   * @param  {String}  userId
   * @param  {String}  verificationToken
   * @param  {ApiServiceHeadersType} headers
   * @return {Promise}
   */
  static verifyUser(
    userId: string,
    verificationToken: string,
    headers: ApiServiceHeadersType = {}
  ): Promise<void | AxiosResponse> {
    const newPath = PATH_USER_VERIFICATION.replace(':userId', userId).replace(
      ':verificationToken',
      verificationToken
    );

    return ApiService.callApi(newPath, {
      method: 'POST',
      headers,
    });
  }

  /**
   * Check forgot password token validity
   * @param  {String}            userId
   * @param  {String}            resetToken
   * @param  {ApiServiceHeadersType} headers
   * @return {Promise}
   */
  static resetPasswordTokenCheck(
    userId: string,
    resetToken: string,
    headers?: ApiServiceHeadersType
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(
      PATH_USER_RESET_TOKEN_CHECK.replace(':userId', userId).replace(
        ':resetToken',
        resetToken
      ),
      {
        method: 'POST',
        headers,
      }
    );
  }

  /**
   * change password
   * @param  {String}  newPassword
   * @param  {String}  resetToken
   * @param  {String}  userId
   * @param  {ApiServiceHeadersType} headers
   * @return {Promise}
   */
  static changePassword(
    newPassword: string,
    resetToken: string,
    userId: string,
    headers?: ApiServiceHeadersType
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(
      PATH_USER_CHANGE_PASSWORD.replace(':userId', userId),
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ password: newPassword, resetToken }),
      }
    );
  }

  /**
   * delete account
   * @param  {String}  userId
   * @param  {String}  password
   * @param  {ApiServiceHeadersType} headers
   * @return {Promise}
   */
  static deleteAccount(
    userId: string,
    password?: string,
    headers?: ApiServiceHeadersType
  ): Promise<void | AxiosResponse> {
    const result = ApiService.callApi(
      PATH_USER_DELETE_ACCOUNT.replace(':userId', userId),
      {
        method: 'POST',
        body: JSON.stringify({ password }),
        headers,
      }
    );

    result.finally(() => {
      ApiService.removeToken();
    });

    return result;
  }

  /**
   * get user proposals
   * @param  {String}  userId
   */
  static myProposals(
    userId: string,
    preferredLanguage: string,
    limit: number,
    skip = 0
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(PATH_USER_PROPOSALS.replace(':userId', userId), {
      method: 'GET',
      params: {
        sort: 'createdAt',
        order: 'desc',
        limit,
        skip,
        preferredLanguage,
      },
    });
  }

  /**
   * get favorites user proposals
   * @param  {String}  userId
   */
  static myFavourites(
    userId: string,
    preferredLanguage?: string,
    limit?: number,
    skip?: number
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(PATH_USER_FAVOURITES.replace(':userId', userId), {
      method: 'GET',
      params: { qualifications: 'likeIt', limit, skip, preferredLanguage },
    });
  }

  /**
   * get user privacy policy acceptance date for login
   * @param  {String}  email
   * @param  {String}  password
   * @param  {ApiServiceHeadersType} headers
   */
  static loginPrivacyPolicy(
    email: string,
    password: string,
    headers?: ApiServiceHeadersType
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(PATH_USER_PRIVACY_POLICY, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, password }),
    });
  }

  /**
   * get user privacy policy acceptance date for social connect
   * @param  {String}  provider
   * @param  {String}  token
   * @param  {ApiServiceHeadersType} headers
   */
  static socialPrivacyPolicy(
    provider: string,
    token: string,
    headers?: ApiServiceHeadersType
  ): Promise<void | AxiosResponse> {
    return ApiService.callApi(PATH_USER_SOCIAL_PRIVACY_POLICY, {
      method: 'POST',
      headers,
      body: JSON.stringify({ provider, token }),
    });
  }
}
