import {
  VOTE_AGREE_KEY,
  VOTE_DISAGREE_KEY,
  VOTE_NEUTRAL_KEY,
} from '../constants/vote';
import { BadArgumentError } from '../errors';
import * as VoteResultHelper from './voteResult';

describe('VoteResult Helper', () => {
  describe('test getTotalVotesCount', () => {
    it('throw a badArgumentError if params is empty', () => {
      expect(() => {
        VoteResultHelper.getTotalVotesCount([]);
      }).toThrow(BadArgumentError);
    });

    it('return the addition of count', () => {
      const votesCount = VoteResultHelper.getTotalVotesCount([
        { count: 1 },
        { count: 2 },
        { count: 3 },
      ]);
      expect(votesCount).toBe(6);
    });
  });

  describe('test getVotesPercent', () => {
    it('calculate percent per vote Type', () => {
      const votes = [
        {
          count: 3,
          voteKey: VOTE_AGREE_KEY,
        },
        {
          count: 3,
          voteKey: VOTE_DISAGREE_KEY,
        },
        {
          count: 4,
          voteKey: VOTE_NEUTRAL_KEY,
        },
      ];

      const votesPercent = VoteResultHelper.getVotesPercent(votes, 10);
      expect(votesPercent[VOTE_AGREE_KEY]).toBe(30);
      expect(votesPercent[VOTE_DISAGREE_KEY]).toBe(30);
      expect(votesPercent[VOTE_NEUTRAL_KEY]).toBe(40);
    });
  });

  describe('test getVotesRatio', () => {
    it('return the ratio with one decimal', () => {
      const percent = VoteResultHelper.getVotesRatio(155, 1000);
      expect(percent).toBe('15.5');
    });
  });
});
