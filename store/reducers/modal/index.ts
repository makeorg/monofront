import { Reducer, ReducerAction, StateModal } from '@make.org/types';
import { MODAL_TYPES } from '@make.org/types/enums';
import {
  MODAL_SHOW_LOGIN,
  MODAL_SHOW_FORGOT_PASSWORD,
  MODAL_CLOSE,
  MODAL_SHOW_SESSION_EXPIRATION,
  MODAL_CLOSE_SESSION_EXPIRATION,
  MODAL_SHOW_DEPARTMENT_FORM,
  MODAL_SHOW_COUNTRIES,
  MODAL_CLOSE_COOKIES,
  MODAL_SHOW_COOKIES,
  MODAL_SHOW_DATAPOLICY_LOGIN,
  MODAL_SHOW_DATAPOLICY_SOCIAL,
  MODAL_CLOSE_DATAPOLICY,
  MODAL_SHOW_SORT,
  MODAL_CLOSE_SORT,
  MODAL_SHOW_FILTERS,
  MODAL_CLOSE_FILTERS,
} from '../../actionTypes';

export const modal_state: StateModal = {
  isOpen: false,
  contentType: undefined,
  showExpirationSession: false,
  showCookies: false,
  showSort: false,
  showFilters: false,
  showDataPolicy: false,
  focusAfterClose: true,
  extraProps: {},
};

export const modal_reducer: Reducer = (
  state: StateModal,
  action: ReducerAction
): StateModal => {
  switch (action.type) {
    case MODAL_SHOW_SORT:
      return {
        ...state,
        showSort: true,
      };
    case MODAL_SHOW_FILTERS:
      return {
        ...state,
        showFilters: true,
      };
    case MODAL_CLOSE_SORT:
      return {
        ...state,
        showSort: false,
      };
    case MODAL_CLOSE_FILTERS:
      return {
        ...state,
        showFilters: false,
      };
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
        contentType: MODAL_TYPES.MODAL_LOGIN,
      };
    case MODAL_SHOW_FORGOT_PASSWORD:
      return {
        ...state,
        isOpen: true,
        contentType: MODAL_TYPES.MODAL_FORGOT_PASSWORD,
      };
    case MODAL_SHOW_DEPARTMENT_FORM:
      return {
        ...state,
        isOpen: true,
        contentType: MODAL_TYPES.MODAL_DEPARTMENT,
      };
    case MODAL_SHOW_COUNTRIES:
      return {
        ...state,
        isOpen: true,
        contentType: MODAL_TYPES.MODAL_COUNTRIES,
        focusAfterClose: action.payload.focusAfterClose,
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
