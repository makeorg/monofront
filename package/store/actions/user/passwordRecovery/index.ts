import i18n from 'i18next';
import {
  Dispatch,
  ReducerAction,
  StateUserPasswordRecovery,
} from '@make.org/types';
import { UserService } from '@make.org/utils/services/User';
import {
  PASSWORD_RECOVERY_FAILURE,
  PASSWORD_RECOVERY_SUCCESS,
  PASSWORD_RECOVERY_REQUEST,
} from '../../../actionTypes';

const passwordRecoveryRequest = (
  newPassword: string,
  resetToken: string,
  userId: string
): ReducerAction => ({
  type: PASSWORD_RECOVERY_REQUEST,
  payload: { newPassword, resetToken, userId },
});

const passwordRecoveryFailure = (errorMessage: string): ReducerAction => ({
  type: PASSWORD_RECOVERY_FAILURE,
  payload: { errorMessage },
});

const passwordRecoverySuccess = (): ReducerAction => ({
  type: PASSWORD_RECOVERY_SUCCESS,
});

export const passwordRecovery = (
  newPassword: string,
  dispatch: Dispatch,
  passwordRecoveryState: StateUserPasswordRecovery
): void => {
  const { resetToken, userId } = passwordRecoveryState;
  dispatch(passwordRecoveryRequest(newPassword, resetToken, userId));
  if (newPassword.length < 8) {
    dispatch(
      passwordRecoveryFailure(
        i18n.t('common.form.invalid_password', {
          context: 'dynamic',
          label: `<label for="password">${i18n.t(
            'common.form.label.password'
          )}</label>`,
        })
      )
    );
  }

  UserService.changePassword(newPassword, resetToken, userId, () =>
    dispatch(passwordRecoverySuccess())
  );
};
