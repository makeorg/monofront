import { Reducer, ReducerAction, StateAuthentication } from '@make.org/types';
import * as actionTypes from '../../../actionTypes';

export const authentication_state: StateAuthentication = {
  errors: [],
  isLoggedIn: false,
  user: undefined,
};

export const authentication_reducer: Reducer = (
  state = authentication_state,
  action: ReducerAction
): StateAuthentication => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        errors: [],
      };
    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        errors: [],
      };
    }
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        errors: [action.error, ...state.errors],
      };
    case actionTypes.GET_INFO: {
      return {
        ...state,
        isLoggedIn: true,
        user: action.user,
      };
    }
    case actionTypes.LOGIN_SOCIAL_REQUEST:
      return {
        ...state,
        errors: [],
      };
    case actionTypes.LOGIN_SOCIAL_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        errors: [],
      };
    }
    case actionTypes.LOGIN_SOCIAL_FAILURE:
      return {
        ...state,
        errors: [],
      };
    case actionTypes.LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
        errors: [],
      };
    }
    default:
      return state;
  }
};
