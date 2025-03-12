import { ReducerAction } from '@make.org/types';
import * as actionTypes from '../../actionTypes';

export const resetAuthRedirectInfo = (): ReducerAction => ({
  type: actionTypes.RESET_AUTH_REDIRECT_INFO,
});
