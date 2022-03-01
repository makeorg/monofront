import { getVoteKey, updateAndGetVotes } from './vote';

const votes = [
  {
    voteKey: 'vote1',
    count: 2,
    qualifications: [],
    hasVoted: false,
    score: 0.56,
  },
  {
    voteKey: 'vote2',
    count: 2,
    qualifications: [],
    hasVoted: false,
    score: 0.64,
  },
];

describe('vote', () => {
  it('get vote key', () => {
    const voteKey = getVoteKey('voteKey', 'proposalId');

    expect(voteKey).toBe('voteKey_proposalId');
  });

  it('updateAndGetVotes function with unknown vote key', () => {
    expect(
      updateAndGetVotes(votes, {
        voteKey: 'vote3',
        count: 2,
        qualifications: [],
        hasVoted: false,
        score: 0.67,
      })
    ).toEqual(votes);
  });

  it('updateAndGetVotes function with known vote key', () => {
    expect(
      updateAndGetVotes(votes, {
        voteKey: 'vote1',
        count: 3,
        qualifications: [],
        hasVoted: true,
        score: 0.56,
      })
    ).toEqual([
      {
        voteKey: 'vote1',
        count: 3,
        qualifications: [],
        hasVoted: true,
        score: 0.56,
      },
      {
        voteKey: 'vote2',
        count: 2,
        qualifications: [],
        hasVoted: false,
        score: 0.64,
      },
    ]);
  });
});
