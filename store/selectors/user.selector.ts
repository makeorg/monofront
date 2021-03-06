import {
  StateAuthentication,
  StateRoot,
  StateUserPasswordRecovery,
} from '@make.org/types';
/**
 * authentication selector
 * @param {*} state
 */
export const selectAuthentication = (state: StateRoot): StateAuthentication => {
  const { authentication } = state.user || { user: {} };
  return authentication;
};

/**
 * passwordRecovery selector
 * @param {*} state
 */
export const selectPasswordRecovery = (
  state: StateRoot
): StateUserPasswordRecovery => {
  const { passwordRecovery } = state.user;
  return passwordRecovery;
};
