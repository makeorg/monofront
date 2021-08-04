import { ReducerAction } from '@make.org/types';
import { PROPOSE_SUCCESS } from '../../actionTypes';

export const proposeSuccess = (): ReducerAction => ({
  type: PROPOSE_SUCCESS,
});
