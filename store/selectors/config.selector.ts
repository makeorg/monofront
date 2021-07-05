import { StateRoot } from '@make.org/types';

/**
 * Config selector
 * @param {*} state
 */
export const selectConfig = (state: StateRoot) => state.appConfig;
