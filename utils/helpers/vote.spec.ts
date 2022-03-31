import { getVoteKey, updateAndGetVotes } from './vote';

const votes = [
  {
    voteKey: 'agree',
    count: 2,
    qualifications: [],
    hasVoted: false,
    score: 0.56,
  },
  {
    voteKey: 'disagree',
    count: 2,
    qualifications: [],
    hasVoted: false,
    score: 0.64,
  },
  {
    voteKey: 'neutral',
    count: 2,
    qualifications: [],
    hasVoted: false,
    score: 0.67,
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
        neutral: {
          voteKey: 'neutral',
          count: 2,
          qualifications: [],
          hasVoted: false,
          score: 0.67,
        },
        voteKey: 'agree',
        count: 3,
        qualifications: [],
        hasVoted: true,
        score: 0.56,
      })
    ).toEqual(votes);
  });

  it('updateAndGetVotes function with known vote key', () => {
    expect(
      updateAndGetVotes(votes, {
        agree: {
          voteKey: 'agree',
          count: 3,
          qualifications: [],
          hasVoted: true,
          score: 0.56,
        },
        disagree: {
          voteKey: 'disagree',
          count: 2,
          qualifications: [],
          hasVoted: false,
          score: 0.64,
        },
        neutral: {
          voteKey: 'neutral',
          count: 2,
          qualifications: [],
          hasVoted: false,
          score: 0.67,
        },
        voteKey: 'agree',
        count: 3,
        qualifications: [],
        hasVoted: true,
        score: 0.56,
      })
    ).toEqual([
      {
        voteKey: 'agree',
        count: 3,
        qualifications: [],
        hasVoted: true,
        score: 0.56,
      },
      {
        voteKey: 'disagree',
        count: 2,
        qualifications: [],
        hasVoted: false,
        score: 0.64,
      },
      {
        voteKey: 'neutral',
        count: 2,
        qualifications: [],
        hasVoted: false,
        score: 0.67,
      },
    ]);
  });
});
