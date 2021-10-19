import {
  ProposalType,
  ReducerAction,
  TypeFilterAndSortValues,
} from '@make.org/types';
import {
  FILTER_AND_SORT_UPDATE_STATE,
  GET_ALL_PROPOSALS,
} from '../../actionTypes';

export const getAllProposals = (proposals: ProposalType[]): ReducerAction => ({
  type: GET_ALL_PROPOSALS,
  payload: proposals,
});

export const updateFilterAndSortState = (
  newFilterAndSortValues: TypeFilterAndSortValues
): ReducerAction => ({
  type: FILTER_AND_SORT_UPDATE_STATE,
  payload: newFilterAndSortValues,
});
