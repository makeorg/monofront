import { type StateRoot } from '../types';
/**
 * authentication selector
 * @param {*} state
 */
export const selectAuthentication = (state: StateRoot) =>
  state.user.authentication;

/**
 * registration selector
 * @param {*} state
 */
export const selectRegistration = (state: StateRoot) => state.user.registration;

/**
 * passwordRecovery selector
 * @param {*} state
 */
export const selectPasswordRecovery = (state: StateRoot) =>
  state.user.passwordRecovery;
