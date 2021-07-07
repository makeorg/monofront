/* @flow */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionTypes from 'Shared/store/actionTypes';
import * as actions from './index';

// mocks
jest.mock('Shared/api/ProposalApiService');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe('Proposal Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates PROPOSE_SUCCESS when calling action', () => {
    const expectedActions = [
      {
        type: actionTypes.PROPOSE_SUCCESS,
      },
    ];

    store.dispatch(actions.proposeSuccess());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
