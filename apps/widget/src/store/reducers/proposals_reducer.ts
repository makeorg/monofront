import { ProposalType } from '@make.org/types';
import { Reducer, ReducerAction } from './types';
import { proposals_actions } from '../actions/proposals_actions';

// state, actions and reducer
export const proposals_state: ProposalType[] = [];

export const proposals_reducer: Reducer = (
  state: ProposalType[],
  action: ReducerAction
): ProposalType[] => {
  const { type = '', data = [] } = action;
  switch (type) {
    case proposals_actions.GET_ALL_PROPOSALS:
      return data;
    default:
      return state;
  }
};
