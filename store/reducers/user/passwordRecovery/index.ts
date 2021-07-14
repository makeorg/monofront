import {
  Reducer,
  ReducerAction,
  StateUserPasswordRecovery,
} from '@make.org/types';
import * as actionTypes from '../../../actionTypes';

export const passwordRecovery_state: StateUserPasswordRecovery = {
  newPassword: undefined,
  resetToken: undefined,
  userId: undefined,
  errorMessage: undefined,
  error: false,
  updated: false,
};

export const passwordRecovery_reducer: Reducer = (
  state = passwordRecovery_state,
  action: ReducerAction
): StateUserPasswordRecovery => {
  switch (action.type) {
    case actionTypes.PASSWORD_RECOVERY_REQUEST:
      return {
        ...state,
        error: false,
        updated: false,
        newPassword: action.payload.newPassword,
        resetToken: action.payload.resetToken,
        userId: action.payload.userId,
      };
    case actionTypes.PASSWORD_RECOVERY_FAILURE:
      return {
        ...state,
        updated: false,
        errorMessage: action.payload.errorMessage,
        error: true,
      };
    case actionTypes.PASSWORD_RECOVERY_SUCCESS:
      return {
        ...state,
        ...passwordRecovery_state,
        updated: true,
      };
    default:
      return state;
  }
};
