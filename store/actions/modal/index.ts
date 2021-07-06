import {
  trackDisplaySigninForm,
  trackDisplaySignupForm,
  trackDisplayForgotPasswordForm,
} from '@make.org/utils/services/Tracking';
import { ReducerAction } from '../../../types';
import * as actionTypes from '../../actionTypes';

export const modalClose = () => (dispatch: any): void => {
  dispatch({ type: actionTypes.MODAL_CLOSE });
};

export const modalCloseCookies = () => (dispatch: any): void => {
  dispatch({ type: actionTypes.MODAL_CLOSE_COOKIES });
};

export const modalShowCookies = () => (dispatch: any): void => {
  dispatch({ type: actionTypes.MODAL_SHOW_COOKIES });
};

export const modalShowLogin = () => (dispatch: any): void => {
  dispatch({ type: actionTypes.MODAL_SHOW_LOGIN });
  trackDisplaySigninForm();
};

export const modalShowRegister = () => (dispatch: any): void => {
  dispatch({ type: actionTypes.MODAL_SHOW_REGISTER });
  trackDisplaySignupForm();
};

export const modalShowForgotPassword = () => (dispatch: any): void => {
  dispatch({ type: actionTypes.MODAL_SHOW_FORGOT_PASSWORD });
  trackDisplayForgotPasswordForm();
};

export const modalShowDepartmentForm = (): ReducerAction => ({
  type: actionTypes.MODAL_SHOW_DEPARTMENT_FORM,
});

export const showSessionExpirationModal = () => (dispatch: any): void => {
  dispatch({ type: actionTypes.MODAL_SHOW_SESSION_EXPIRATION });
};
export const closeSessionExpirationModal = () => (dispatch: any): void => {
  dispatch({ type: actionTypes.MODAL_CLOSE_SESSION_EXPIRATION });
};

export const modalShowProposalSuccess = () => (dispatch: any): void => {
  dispatch({ type: actionTypes.MODAL_SHOW_PROPOSAL_SUCCESS });
};

export const modalShowCountries = (focusAfterClose: boolean): ReducerAction => ({
  type: actionTypes.MODAL_SHOW_COUNTRIES,
  payload: { focusAfterClose },
});

export const modalShowDataPolicyLogin = (email: string, password: string): ReducerAction => ({
  type: actionTypes.MODAL_SHOW_DATAPOLICY_LOGIN,
  payload: { email, password },
});

export const modalShowDataPolicySocial = (provider: string, token: string): ReducerAction => ({
  type: actionTypes.MODAL_SHOW_DATAPOLICY_SOCIAL,
  payload: { provider, token },
});

export const modalCloseDataPolicy = (): ReducerAction => ({
  type: actionTypes.MODAL_CLOSE_DATAPOLICY,
});
