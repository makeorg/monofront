import { i18n } from '@make.org/utils/i18n';
import { StateRoot, Dispatch, ReducerAction } from '@make.org/types';
import { UserService } from '@make.org/utils/services/User';
import * as actionTypes from '../../../actionTypes';

export const passwordRecoveryRequest = (
  newPassword: string,
  resetToken: string,
  userId: string
): ReducerAction => ({
  type: actionTypes.PASSWORD_RECOVERY_REQUEST,
  payload: { newPassword, resetToken, userId },
});
export const passwordRecoveryFailure = (errorMessage: string): ReducerAction => ({
  type: actionTypes.PASSWORD_RECOVERY_FAILURE,
  payload: { errorMessage },
});
export const passwordRecoverySuccess = (): ReducerAction => ({
  type: actionTypes.PASSWORD_RECOVERY_SUCCESS,
});

export const passwordRecovery = (newPassword: string) => (dispatch: Dispatch, getState: () => StateRoot): void => {
  const { resetToken, userId } = getState().user.passwordRecovery;
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
  const success = () => dispatch(passwordRecoverySuccess());
  const failure = () => dispatch(passwordRecoveryFailure('Fail to recover password'));
  UserService.changePassword(
    newPassword,
    resetToken,
    userId,
    success,
    failure
  );
};
