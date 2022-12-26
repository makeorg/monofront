import { HomeViewType, ReducerAction } from '@make.org/types';
import { LOAD_HOMEPAGE } from '../../actionTypes';

export const loadHomepage = (
  homepage: HomeViewType,
  country: string,
  language: string
): ReducerAction => ({
  type: LOAD_HOMEPAGE,
  payload: { homepage, country, language },
});
