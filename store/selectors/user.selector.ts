import { StateAuthentication, StateRegistration, StateRoot, StateUserPasswordRecovery } from '@make.org/types';
/**
 * authentication selector
 * @param {*} state
 */
export const selectAuthentication = (state: StateRoot): StateAuthentication => state.user.authentication;

/**
 * registration selector
 * @param {*} state
 */
export const selectRegistration = (state: StateRoot): StateRegistration => state.user.registration;

/**
 * passwordRecovery selector
 * @param {*} state
 */
export const selectPasswordRecovery = (state: StateRoot): StateUserPasswordRecovery => state.user.passwordRecovery;
