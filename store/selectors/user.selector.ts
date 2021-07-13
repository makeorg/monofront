import { StateAuthentication, StateRoot, StateUserPasswordRecovery } from '@make.org/types';
/**
 * authentication selector
 * @param {*} state
 */
export const selectAuthentication = (state: StateRoot): StateAuthentication | undefined => {
  const { authentication } = state.user || {};
  return authentication;
};

/**
 * passwordRecovery selector
 * @param {*} state
 */
export const selectPasswordRecovery = (state: StateRoot): StateUserPasswordRecovery| undefined => {
  const { passwordRecovery } = state.user || {};
  return passwordRecovery;
};
