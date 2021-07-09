import * as actionCreators from '../../../actions/user/passwordRecovery';
import { passwordRecovery } from './index';

describe('PasswordRecovery reducer', () => {
  it('Return the initial state', () => {
    const expectedState = {
      newPassword: undefined,
      resetToken: undefined,
      userId: undefined,
      errorMessage: undefined,
      error: false,
      updated: false,
    };

    expect(passwordRecovery(undefined, {})).toEqual(expectedState);
  });

  describe('PasswordRecovery action reducers', () => {
    it('PasswordRecovery Request', () => {
      const action = actionCreators.passwordRecoveryRequest(
        'fooPassword',
        'barToken',
        'bazUserId'
      );
      const previousState = {
        newPassword: undefined,
        resetToken: undefined,
        userId: undefined,
        errorMessage: undefined,
        error: false,
        updated: false,
      };

      const expectedState = {
        newPassword: 'fooPassword',
        resetToken: 'barToken',
        userId: 'bazUserId',
        errorMessage: undefined,
        error: false,
        updated: false,
      };

      expect(passwordRecovery(previousState, action)).toEqual(expectedState);
    });

    it('PasswordRecovery Success', () => {
      const action = actionCreators.passwordRecoverySuccess();
      const previousState = {
        newPassword: undefined,
        resetToken: undefined,
        userId: undefined,
        errorMessage: undefined,
        error: false,
        updated: false,
      };

      const expectedState = {
        newPassword: undefined,
        resetToken: undefined,
        userId: undefined,
        errorMessage: undefined,
        error: false,
        updated: true,
      };

      expect(passwordRecovery(previousState, action)).toEqual(expectedState);
    });

    it('PasswordRecovery Failure', () => {
      const action = actionCreators.passwordRecoveryFailure('fooError');
      const previousState = {
        newPassword: undefined,
        resetToken: undefined,
        userId: undefined,
        errorMessage: undefined,
        error: false,
        updated: false,
      };

      const expectedState = {
        newPassword: undefined,
        resetToken: undefined,
        userId: undefined,
        errorMessage: 'fooError',
        error: true,
        updated: false,
      };

      expect(passwordRecovery(previousState, action)).toEqual(expectedState);
    });
  });
});
