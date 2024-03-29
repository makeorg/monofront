import { ReducerAction } from '@make.org/types';
import {
  MODAL_CLOSE,
  MODAL_CLOSE_COOKIES,
  MODAL_SHOW_COOKIES,
  MODAL_SHOW_FORGOT_PASSWORD,
  MODAL_SHOW_SESSION_EXPIRATION,
  MODAL_CLOSE_SESSION_EXPIRATION,
  MODAL_SHOW_DATAPOLICY_LOGIN,
  MODAL_SHOW_DATAPOLICY_SOCIAL,
  MODAL_CLOSE_DATAPOLICY,
  MODAL_SHOW_SORT,
  MODAL_CLOSE_SORT,
  MODAL_SHOW_FILTERS,
  MODAL_CLOSE_FILTERS,
} from '../../actionTypes';

export const modalClose = (): ReducerAction => ({
  type: MODAL_CLOSE,
});

export const modalCloseCookies = (): ReducerAction => ({
  type: MODAL_CLOSE_COOKIES,
});

export const modalShowCookies = (): ReducerAction => ({
  type: MODAL_SHOW_COOKIES,
});

export const modalShowForgotPassword = (): ReducerAction => ({
  type: MODAL_SHOW_FORGOT_PASSWORD,
});

export const showSessionExpirationModal = (): ReducerAction => ({
  type: MODAL_SHOW_SESSION_EXPIRATION,
});
export const closeSessionExpirationModal = (): ReducerAction => ({
  type: MODAL_CLOSE_SESSION_EXPIRATION,
});

export const modalShowDataPolicyLogin = (
  email: string,
  password: string
): ReducerAction => ({
  type: MODAL_SHOW_DATAPOLICY_LOGIN,
  payload: { email, password },
});

export const modalShowDataPolicySocial = (
  provider: string,
  token: string
): ReducerAction => ({
  type: MODAL_SHOW_DATAPOLICY_SOCIAL,
  payload: { provider, token },
});

export const modalCloseDataPolicy = (): ReducerAction => ({
  type: MODAL_CLOSE_DATAPOLICY,
});

export const modalShowSort = (): ReducerAction => ({
  type: MODAL_SHOW_SORT,
});

export const modalCloseSort = (): ReducerAction => ({
  type: MODAL_CLOSE_SORT,
});

export const modalShowFilters = (): ReducerAction => ({
  type: MODAL_SHOW_FILTERS,
});

export const modalCloseFilters = (): ReducerAction => ({
  type: MODAL_CLOSE_FILTERS,
});
