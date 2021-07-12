import { QuestionApiService } from '@make.org/api/QuestionApiService';
import { SequenceService } from './Sequence';

jest.mock('@make.org/api/QuestionApiService');

describe('Question Service', () => {
  afterEach(() => {
    QuestionApiService.startSequenceByKind.mockRestore();
  });

  const proposals = [
    { id: 'foo', votes: [{ hasVoted: false }] },
    { id: 'bar', votes: [{ hasVoted: false }] },
    { id: 'baz', votes: [{ hasVoted: false }] },
    { id: 'foo', votes: [{ hasVoted: false }] },
    { id: 'voted', votes: [{ hasVoted: true }] },
  ];

  describe('startSequenceByKind function with kind parameter', () => {
    it('Call sequence service with right kind params', async () => {
      const includedProposalIds = [];
      QuestionApiService.startSequenceByKind.mockResolvedValue({
        data: {
          proposals,
        },
      });

      jest.spyOn(QuestionApiService, 'startSequenceByKind');

      await SequenceService.startSequenceByKind(
        'foo',
        includedProposalIds,
        'controversy'
      );

      expect(QuestionApiService.startSequenceByKind).toHaveBeenNthCalledWith(
        1,
        'foo',
        includedProposalIds,
        'controversy'
      );
    });

    it('order only included proposal', async () => {
      const includedProposalIds = ['baz', 'foo'];
      QuestionApiService.startSequenceByKind.mockResolvedValue({
        data: {
          proposals,
        },
      });

      const result = await SequenceService.startSequenceByKind(
        'foo',
        includedProposalIds,
        'standard'
      );
      expect(result.proposals).toEqual([
        { id: 'baz', votes: [{ hasVoted: false }] },
        { id: 'foo', votes: [{ hasVoted: false }] },
        { id: 'bar', votes: [{ hasVoted: false }] },
      ]);
    });

    it('order when included proposal contain all proposal', async () => {
      const includedProposalIds = ['baz', 'bar', 'foo'];
      QuestionApiService.startSequenceByKind.mockResolvedValue({
        data: {
          proposals,
        },
      });

      const result = await SequenceService.startSequenceByKind(
        'foo',
        includedProposalIds,
        'consensus'
      );
      expect(result.proposals).toEqual([
        { id: 'baz', votes: [{ hasVoted: false }] },
        { id: 'bar', votes: [{ hasVoted: false }] },
        { id: 'foo', votes: [{ hasVoted: false }] },
      ]);
    });

    it('includes proposals when required even if they are already voted', async () => {
      const includedProposalIds = ['voted'];
      QuestionApiService.startSequenceByKind.mockResolvedValue({
        data: {
          proposals,
        },
      });

      const result = await SequenceService.startSequenceByKind(
        'foo',
        includedProposalIds,
        'consensus'
      );
      expect(result.proposals).toEqual([
        { id: 'voted', votes: [{ hasVoted: true }] },
        { id: 'baz', votes: [{ hasVoted: false }] },
        { id: 'bar', votes: [{ hasVoted: false }] },
        { id: 'foo', votes: [{ hasVoted: false }] },
      ]);
    });
  });

  describe('startSequenceByKeyword function with keyword param', () => {
    it('Call sequence service with right keyword param', async () => {
      const includedProposalIds = [];
      QuestionApiService.startSequenceByKeyword.mockResolvedValue({
        key: 'bar',
        proposals,
        label: 'bar_label',
      });

      jest.spyOn(QuestionApiService, 'startSequenceByKeyword');

      await SequenceService.startSequenceByKeyword(
        'foo',
        includedProposalIds,
        'bar'
      );

      expect(QuestionApiService.startSequenceByKeyword).toHaveBeenNthCalledWith(
        1,
        'foo',
        includedProposalIds,
        'bar'
      );
    });
  });
});
