import { VoteType } from '@make.org/types';
import {
  VOTE_AGREE_KEY,
  VOTE_DISAGREE_KEY,
  VOTE_NEUTRAL_KEY,
} from '@make.org/utils/constants/vote';
import { BadArgumentError } from '@make.org/utils/errors';
import {
  getVotesPercent,
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
