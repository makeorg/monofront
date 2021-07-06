import { getDateOfBirthFromAge } from '@make.org/utils/helpers/date';
import { ApiServiceHeadersType } from '@make.org/types';
import { setEmptyStringToNull } from '@make.org/utils/helpers/form';
import { PROPOSALS_LISTING_LIMIT } from '@make.org/utils/constants/proposal';
import { ApiService } from './ApiService';

export const PATH_USER_ME = '/user/me';
export const PATH_USER_CURRENT = '/user/current';
export const PATH_USER_PROFILE = '/user/:userId/profile';
export const PATH_USER_LOGIN = '/oauth/make_access_token';
export const PATH_USER_GET_TOKEN = '/oauth/access_token';
export const PATH_USER_LOGOUT = '/logout';
export const PATH_USER_LOGIN_SOCIAL = '/user/login/social';
export const PATH_USER = '/user';
export const PATH_USER_FORGOT_PASSWORD = '/user/reset-password/request-reset';
export const PATH_USER_VERIFICATION = '/user/:userId/validate/:verificationToken';
export const PATH_USER_RESET_TOKEN_CHECK = '/user/reset-password/check-validity/:userId/:resetToken';
export const PATH_USER_CHANGE_PASSWORD = '/user/reset-password/change-password/:userId';
export const PATH_USER_UPDATE_PASSWORD = '/user/:userId/change-password';
export const PATH_USER_DELETE_ACCOUNT = '/user/:userId/delete';
export const PATH_USER_PROPOSALS = '/user/:userId/proposals';
export const PATH_USER_FAVOURITES = '/user/:userId/votes';
export const PATH_USER_PRIVACY_POLICY = '/user/privacy-policy';
export const PATH_USER_SOCIAL_PRIVACY_POLICY = '/user/social/privacy-policy';

export const FACEBOOK_PROVIDER_ENUM = 'facebook';
export const GOOGLE_PROVIDER_ENUM = 'google_people';

export class UserApiService {
  /**
   * Get user
   * @return {Promise}
   */
  static current(): Promise<any> {
    return ApiService.callApi(PATH_USER_CURRENT, {
      method: 'GET',
    });
  }

  /**
   * Get profile
   * @param  {String}  userId
   *
   * @return {Promise}
   */
  static getProfile(userId: string): Promise<any> {
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
  static getUserToken(): Promise<any> {
    return ApiService.callApi(PATH_USER_GET_TOKEN, {
      method: 'GET',
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
  ): Promise<any> {
    const data = {
      username: email,
      password,
      grant_type: 'password',
      approvePrivacyPolicy,
    };

    return ApiService.callApi(PATH_USER_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&'),
    });
  }

  /**
   * Logout the user
   *
   * @return {Promise}
   */
  static logout(): Promise<any> {
    return ApiService.callApi(PATH_USER_LOGOUT, {
      method: 'POST',
    });
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
    approvePrivacyPolicy?: boolean
  ): Promise<any> {
    return ApiService.callApi(PATH_USER_LOGIN_SOCIAL, {
      method: 'POST',
      body: JSON.stringify({
        provider,
        token,
        country: ApiService.country,
        language: ApiService.language,
        approvePrivacyPolicy,
      }),
    });
  }

  /**
   * Register a user
   * @param  {Object}  user
   * @return {Promise}
   */
  static register(user: any): Promise<any> {
    const {
      age,
      firstname,
      postalcode,
      profession,
      legalMinorConsent,
      legalAdvisorApproval,
      approvePrivacyPolicy,
    } = user.profile;
    const { email, password } = user;

    const dateOfBirth = getDateOfBirthFromAge(age);
    return ApiService.callApi(PATH_USER, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        firstName: setEmptyStringToNull(firstname),
        dateOfBirth: setEmptyStringToNull(dateOfBirth),
        postalCode: setEmptyStringToNull(postalcode),
        profession,
        country: ApiService.country,
        language: ApiService.language,
        questionId: ApiService.questionId,
        legalMinorConsent,
        legalAdvisorApproval,
        approvePrivacyPolicy,
      }),
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
    legalMinorConsent: boolean,
    legalAdvisorApproval: boolean
  ): Promise<any> {
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
  ): Promise<any> {
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
  static forgotPassword(email: string): Promise<any> {
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
  ): Promise<any> {
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
  ): Promise<any> {
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
  ): Promise<any> {
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
  ): Promise<any> {
    return ApiService.callApi(
      PATH_USER_DELETE_ACCOUNT.replace(':userId', userId),
      {
        method: 'POST',
        body: JSON.stringify({ password }),
        headers,
      }
    );
  }

  /**
   * get user proposals
   * @param  {String}  userId
   */
  static myProposals(
    userId: string,
    seed?: number,
    limit: number = PROPOSALS_LISTING_LIMIT,
    skip = 0
  ): Promise<any> {
    return ApiService.callApi(PATH_USER_PROPOSALS.replace(':userId', userId), {
      method: 'GET',
      params: { sort: 'createdAt', order: 'desc', seed, limit, skip },
    });
  }

  /**
   * get favorites user proposals
   * @param  {String}  userId
   */
  static myFavourites(
    userId: string,
    limit: number = PROPOSALS_LISTING_LIMIT,
    skip = 0
  ): Promise<any> {
    return ApiService.callApi(PATH_USER_FAVOURITES.replace(':userId', userId), {
      method: 'GET',
      params: { qualifications: 'likeIt', limit, skip },
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
  ): Promise<any> {
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
  ): Promise<any> {
    return ApiService.callApi(PATH_USER_SOCIAL_PRIVACY_POLICY, {
      method: 'POST',
      headers,
      body: JSON.stringify({ provider, token }),
    });
  }
}
