// @flow
import { ReducerAction, StateViews } from '@make.org/types';
import { LOAD_HOMEPAGE } from '../../actionTypes';

export const views_state: StateViews = {
  homepage: undefined,
  country: '',
};
export const views_reducer = (
  state: StateViews = views_state,
  action: ReducerAction
): StateViews => {
  switch (action.type) {
    case LOAD_HOMEPAGE:
      return {
        ...state,
        homepage: {
          ...action.payload.homepage,
          country: action.payload.country,
        },
      };
    default:
      return state;
  }
};
