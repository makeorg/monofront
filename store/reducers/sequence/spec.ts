import * as actionTypes from '../../actionTypes';
import { sequence } from './index';

describe('Sequence reducer', () => {
  it('Return the initial state', () => {
    const expectedState = {
      questionSlug: undefined,
      currentIndex: 0,
      votedProposalIds: {},
      proposals: [],
      cards: [],
    };

    expect(sequence(undefined, {})).toEqual(expectedState);
  });

  it('Load Sequence cards reducer', () => {
    const action = {
      type: actionTypes.SEQUENCE_LOAD_CARDS,
      payload: { cards: [{ type: 'card' }] },
    };
    const previousState = {
      cards: [],
    };
    const expectedState = {
      cards: [{ type: 'card' }],
    };

    expect(sequence(previousState, action)).toEqual(expectedState);
  });

  it('Vote into Sequence reducer', () => {
    const action = {
      type: actionTypes.SEQUENCE_PROPOSAL_VOTE,
      payload: { proposalId: 'fooId', questionSlug: 'fooSlug' },
    };
    const previousState = {
      votedProposalIds: {},
    };

    const expectedState = {
      votedProposalIds: { fooSlug: ['fooId'] },
    };

    expect(sequence(previousState, action)).toEqual(expectedState);
  });

  it('Unvote into Sequence reducer', () => {
    const action = {
      type: actionTypes.SEQUENCE_PROPOSAL_UNVOTE,
      payload: { proposalId: 'fooId', questionSlug: 'fooSlug' },
    };
    const previousState = {
      votedProposalIds: { fooSlug: ['barId', 'fooId', 'bazId'] },
    };

    const expectedState = {
      votedProposalIds: { fooSlug: ['barId', 'bazId'] },
    };

    expect(sequence(previousState, action)).toEqual(expectedState);
  });

  it('Persist Demographics Data reducer', () => {
    const action = {
      type: actionTypes.SEQUENCE_DEMOGRAPHICS_PERSIST,
      payload: { type: 'foo', value: 'bar', questionSlug: 'baz' },
    };
    const previousState = null;
    const expectedState = {
      demographics: {
        type: 'foo',
        value: 'bar',
        questions: ['baz'],
      },
    };

    expect(sequence(previousState, action)).toEqual(expectedState);
  });

  it('Add new Question for Demographics Data reducer', () => {
    const action = {
      type: actionTypes.SEQUENCE_DEMOGRAPHICS_ADD_QUESTION,
      payload: { questionSlug: 'qux' },
    };
    const previousState = {
      demographics: {
        type: 'foo',
        value: 'bar',
        questions: ['baz'],
      },
    };
    const expectedState = {
      demographics: {
        type: 'foo',
        value: 'bar',
        questions: ['baz', 'qux'],
      },
    };

    expect(sequence(previousState, action)).toEqual(expectedState);
  });
});
