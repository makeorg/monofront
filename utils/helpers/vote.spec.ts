import { getVoteKey, updateAndGetVotes } from './vote';

const votes = [
  { voteKey: 'vote1', count: 2, qualifications: [], hasVoted: false },
  { voteKey: 'vote2', count: 2, qualifications: [], hasVoted: false },
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
      })
    ).toEqual([
      { voteKey: 'vote1', count: 3, qualifications: [], hasVoted: true },
      { voteKey: 'vote2', count: 2, qualifications: [], hasVoted: false },
    ]);
  });
});
