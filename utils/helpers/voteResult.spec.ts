import { VoteType } from '@make.org/types';
import {
  VOTE_AGREE_KEY,
  VOTE_DISAGREE_KEY,
  VOTE_NEUTRAL_KEY,
} from '@make.org/utils/constants/vote';
import { BadArgumentError } from '@make.org/utils/errors';
import {
  getVotesPercent,
  getVotesPercentFromScore,
  getTotalVotesCount,
  getVotesRatioInteger,
} from './voteResult';

describe('VoteResult Helper', () => {
  describe('test getTotalVotesCount', () => {
    it('throw a badArgumentError if params is empty', () => {
      expect(() => {
        getTotalVotesCount([]);
      }).toThrow(BadArgumentError);
    });

    it('return the addition of count', () => {
      const votes: VoteType[] = [
        {
          count: 1,
          voteKey: VOTE_AGREE_KEY,
          qualifications: [
            {
              qualificationKey: 'foo',
              count: 0,
              hasQualified: false,
            },
          ],
          hasVoted: false,
          score: 0.97,
        },
        {
          count: 2,
          voteKey: VOTE_DISAGREE_KEY,
          qualifications: [
            {
              qualificationKey: 'foo',
              count: 0,
              hasQualified: false,
            },
          ],
          hasVoted: false,
          score: 0.25,
        },
        {
          count: 3,
          voteKey: VOTE_NEUTRAL_KEY,
          qualifications: [
            {
              qualificationKey: 'foo',
              count: 0,
              hasQualified: false,
            },
          ],
          hasVoted: false,
          score: 0.94,
        },
      ];
      const votesCount = getTotalVotesCount(votes);
      expect(votesCount).toBe(6);
    });
  });

  describe('test getVotesPercent', () => {
    it('calculate percent per vote Type', () => {
      const votes: VoteType[] = [
        {
          count: 3,
          voteKey: VOTE_AGREE_KEY,
          qualifications: [
            {
              qualificationKey: 'foo',
              count: 0,
              hasQualified: false,
            },
          ],
          hasVoted: false,
          score: 0.69,
        },
        {
          count: 3,
          voteKey: VOTE_DISAGREE_KEY,
          qualifications: [
            {
              qualificationKey: 'foo',
              count: 0,
              hasQualified: false,
            },
          ],
          hasVoted: false,
          score: 0.64,
        },
        {
          count: 4,
          voteKey: VOTE_NEUTRAL_KEY,
          qualifications: [
            {
              qualificationKey: 'foo',
              count: 0,
              hasQualified: false,
            },
          ],
          hasVoted: false,
          score: 0.11,
        },
      ];

      const votesPercent = getVotesPercent(votes, 10);
      expect(votesPercent[VOTE_AGREE_KEY]).toBe(30);
      expect(votesPercent[VOTE_DISAGREE_KEY]).toBe(30);
      expect(votesPercent[VOTE_NEUTRAL_KEY]).toBe(40);
    });
  });

  describe('test getVotesRatio', () => {
    it('return the ratio with integer number', () => {
      const percent = getVotesRatioInteger(155, 1000);
      expect(percent).toBe(16);
    });
  });
});

describe('test getVotesPercentFromScore', () => {
  it('calculate percent per vote Type', () => {
    const votes: VoteType[] = [
      {
        count: 3,
        voteKey: VOTE_AGREE_KEY,
        qualifications: [
          {
            qualificationKey: 'foo',
            count: 0,
            hasQualified: false,
          },
        ],
        hasVoted: false,
        score: 0.67,
      },
      {
        count: 3,
        voteKey: VOTE_DISAGREE_KEY,
        qualifications: [
          {
            qualificationKey: 'foo',
            count: 0,
            hasQualified: false,
          },
        ],
        hasVoted: false,
        score: 0.64,
      },
      {
        count: 4,
        voteKey: VOTE_NEUTRAL_KEY,
        qualifications: [
          {
            qualificationKey: 'foo',
            count: 0,
            hasQualified: false,
          },
        ],
        hasVoted: false,
        score: 0.97,
      },
    ];

    const votesPercent = getVotesPercentFromScore(votes);
    expect(votesPercent[VOTE_AGREE_KEY]).toBe(67);
    expect(votesPercent[VOTE_DISAGREE_KEY]).toBe(64);
    expect(votesPercent[VOTE_NEUTRAL_KEY]).toBe(97);
  });
});
