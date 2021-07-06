import {
  MODAL_LOGIN,
  MODAL_REGISTER,
  MODAL_FORGOT_PASSWORD,
  MODAL_DEPARTMENT,
  MODAL_PROPOSAL_SUCCESS,
  MODAL_COUNTRIES,
} from '@make.org/utils/constants/modal';
import { Reducer, ReducerAction, StateModal } from '@make.org/types';
import {
  MODAL_SHOW_LOGIN,
  MODAL_SHOW_REGISTER,
  MODAL_SHOW_FORGOT_PASSWORD,
  MODAL_CLOSE,
  MODAL_SHOW_SESSION_EXPIRATION,
  MODAL_CLOSE_SESSION_EXPIRATION,
  MODAL_SHOW_DEPARTMENT_FORM,
  MODAL_SHOW_PROPOSAL_SUCCESS,
  MODAL_SHOW_COUNTRIES,
  MODAL_CLOSE_COOKIES,
  MODAL_SHOW_COOKIES,
  MODAL_SHOW_DATAPOLICY_LOGIN,
  MODAL_SHOW_DATAPOLICY_SOCIAL,
  MODAL_CLOSE_DATAPOLICY,
} from '../../actionTypes';

export const modal_state: StateModal = {
  isOpen: false,
  contentType: '',
  showExpirationSession: false,
  showCookies: false,
  showDataPolicy: false,
  focusAfterClose: true,
  extraProps: {},
};

export const modal_reducer: Reducer = (state: StateModal, action: ReducerAction): StateModal => {
  switch (action.type) {
    case MODAL_CLOSE_COOKIES:
      return {
        ...state,
        showCookies: false,
      };
    case MODAL_SHOW_COOKIES:
      return {
        ...state,
        showCookies: true,
      };
    case MODAL_SHOW_LOGIN:
      return {
        ...state,
        isOpen: true,
        contentType: MODAL_LOGIN,
      };
    case MODAL_SHOW_REGISTER:
      return {
        ...state,
        isOpen: true,
        contentType: MODAL_REGISTER,
      };
    case MODAL_SHOW_FORGOT_PASSWORD:
      return {
        ...state,
        isOpen: true,
        contentType: MODAL_FORGOT_PASSWORD,
      };
    case MODAL_SHOW_DEPARTMENT_FORM:
      return {
        ...state,
        isOpen: true,
        contentType: MODAL_DEPARTMENT,
      };
    case MODAL_SHOW_COUNTRIES:
      return {
        ...state,
        isOpen: true,
        contentType: MODAL_COUNTRIES,
        focusAfterClose: action.payload.focusAfterClose,
      };
    case MODAL_SHOW_PROPOSAL_SUCCESS:
      return {
        ...state,
        isOpen: true,
        contentType: MODAL_PROPOSAL_SUCCESS,
      };
    case MODAL_CLOSE:
      return {
        ...state,
        isOpen: false,
        focusAfterClose: true,
      };
    case MODAL_SHOW_SESSION_EXPIRATION:
      return {
        ...state,
        isOpen: false,
        showExpirationSession: true,
      };
    case MODAL_CLOSE_SESSION_EXPIRATION:
      return {
        ...state,
        isOpen: false,
        showExpirationSession: false,
      };
    case MODAL_SHOW_DATAPOLICY_LOGIN: {
      return {
        ...state,
        isOpen: false,
        showDataPolicy: true,
        isLogin: true,
        extraProps: {
          email: action.payload.email,
          password: action.payload.password,
        },
      };
    }
    case MODAL_SHOW_DATAPOLICY_SOCIAL: {
      return {
        ...state,
        isOpen: false,
        showDataPolicy: true,
        isLogin: false,
        extraProps: {
          provider: action.payload.provider,
          token: action.payload.token,
        },
      };
    }

    case MODAL_CLOSE_DATAPOLICY:
      return {
        ...state,
        isOpen: false,
        showDataPolicy: false,
        extraProps: {},
      };
    default:
      return state;
  }
};
