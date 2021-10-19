import {
  ProposalType,
  Reducer,
  ReducerAction,
  StateFilterAndSort,
  TypeFilterAndSortValues,
} from '@make.org/types';
import {
  FILTER_AND_SORT_UPDATE_STATE,
  GET_ALL_PROPOSALS,
} from '../../actionTypes';

// state, actions and reducer
export const proposals_state: ProposalType[] = [];

export const proposals_reducer: Reducer = (
  state: ProposalType[],
  action: ReducerAction
): ProposalType[] => {
  const { type = '', payload = [] } = action;
  switch (type) {
    case GET_ALL_PROPOSALS:
      return payload;
    default:
      return state;
  }
};

// update filter and store state
export const filter_and_sort_state: TypeFilterAndSortValues = {
  keywords: undefined,
  sortAlgorithm: undefined,
  sort: 'RECENT',
  isNotVoted: false,
  userType: undefined,
};

export const filter_and_sort_reducer: Reducer = (
  state = filter_and_sort_state,
  action: ReducerAction
): StateFilterAndSort => {
  switch (action.type) {
    case FILTER_AND_SORT_UPDATE_STATE:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
