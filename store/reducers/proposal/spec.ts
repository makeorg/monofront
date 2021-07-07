/* @flow */

import * as actionCreators from 'Shared/store/actions/proposal';
import { proposal } from './index';

describe('Proposal reducer', () => {
  let previousState;
  let expectedState;
  beforeEach(() => {
    previousState = {
      hasProposed: false,
      error: undefined,
      data: undefined,
      popularProposals: [],
    };

    expectedState = {
      hasProposed: true,
      error: undefined,
      data: undefined,
      popularProposals: [],
    };
  });

  it('Return the initial state', () => {
    expect(proposal(undefined, {})).toEqual(previousState);
  });

  describe('Proposal submit success action reducers', () => {
    it('Propose success', () => {
      const action = actionCreators.proposeSuccess('foo-proposal-id');
      expect(proposal(previousState, action)).toEqual(expectedState);
    });
  });
});
