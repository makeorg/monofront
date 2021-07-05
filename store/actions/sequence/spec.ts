/* @flow */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionTypes from 'Shared/store/actionTypes';
import { TrackingService } from 'Shared/services/TrackingService';
import * as Tracking from 'Shared/services/Tracking';
import * as actions from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store = mockStore();

describe('Sequence Actions', () => {
  beforeEach(() => {
    jest.spyOn(TrackingService, 'track');
    jest.spyOn(Tracking, 'trackVote');
    jest.spyOn(Tracking, 'trackFirstVote');

    store.clearActions();
  });

  afterEach(() => {
    TrackingService.track.mockRestore();
    Tracking.trackVote.mockRestore();
    Tracking.trackFirstVote.mockRestore();
  });

  it('Creates SEQUENCE_PROPOSAL_VOTE when calling action', () => {
    const proposalId = 'foo';
    const questionSlug = 'question-slug';
    store = mockStore({
      sequence: {
        cards: [{ index: 0, state: { votes: [] } }],
        currentIndex: 0,
      },
    });
    const expectedActions = [
      {
        type: actionTypes.SEQUENCE_PROPOSAL_VOTE,
        payload: { proposalId, questionSlug },
      },
      {
        payload: {
          index: 0,
          newCardState: {
            votes: [],
          },
        },
        type: 'SEQUENCE_UPDATE_CARD_STATE',
      },
    ];

    store.dispatch(
      actions.vote(
        { id: proposalId, question: { slug: questionSlug } },
        [],
        'sequence-proposal-card'
      )
    );
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Creates SEQUENCE_PROPOSAL_UNVOTE when calling action', () => {
    const proposalId = 'foo';
    const questionSlug = 'question-slug';
    const expectedActions = [
      {
        type: actionTypes.SEQUENCE_PROPOSAL_UNVOTE,
        payload: { proposalId, questionSlug },
      },
      {
        payload: {
          index: 0,
          newCardState: {
            votes: [],
          },
        },
        type: 'SEQUENCE_UPDATE_CARD_STATE',
      },
    ];
    store = mockStore({
      sequence: {
        cards: [{ index: 0, state: { votes: [] } }],
        currentIndex: 0,
      },
    });

    store.dispatch(
      actions.unvote(
        { id: proposalId, question: { slug: questionSlug } },
        [],
        'sequence-proposal-card'
      )
    );
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Track sequence vote when second vote', () => {
    const proposalId = 'foo';
    const questionId = 'baz';
    const questionSlug = 'baz-slug';
    const newStore = mockStore({
      sequence: {
        votedProposalIds: { [questionSlug]: ['fooId'] },
        questionId,
        cards: [{ index: 0, state: { votes: [] } }],
        currentIndex: 0,
      },
    });

    const expectedActions = [
      {
        type: actionTypes.SEQUENCE_PROPOSAL_VOTE,
        payload: { proposalId, questionSlug },
      },
      {
        payload: {
          index: 0,
          newCardState: {
            votes: [],
          },
        },
        type: 'SEQUENCE_UPDATE_CARD_STATE',
      },
    ];

    newStore.dispatch(
      actions.vote(
        { id: proposalId, question: { slug: questionSlug } },
        [],
        'sequence-proposal-card'
      )
    );

    expect(Tracking.trackFirstVote).not.toHaveBeenCalled();
    expect(newStore.getActions()).toEqual(expectedActions);
  });
});
