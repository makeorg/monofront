import { Reducer, ReducerAction, StateRoot } from '@make.org/types';
import * as actionTypes from '../../actionTypes';

export const authRedirectInfo_reducer: Reducer = (
  state: StateRoot,
  action: ReducerAction
): Partial<StateRoot> | null => {
  switch (action.type) {
    case actionTypes.RESET_AUTH_REDIRECT_INFO:
      return null;
    default:
      return state;
  }
};
